import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'
import GameOnAvatars from '../../../contracts/GameOnAvatars.json'
import jwt from 'njwt'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
    const alchemyURL = process.env.ALCHEMY_URL || ''
    const jwtSecret = process.env.JWT_SECRET || ''
    const token = _req.query.token as string
    const verifiedJwt = jwt.verify(token, jwtSecret)
    const walletAddress = verifiedJwt?.body?.toJSON()?.walletAddress as string
    const nftId = verifiedJwt?.body?.toJSON()?.id as number

    if (walletAddress) {
      const provider = new ethers.providers.JsonRpcProvider(alchemyURL)
      const signer = provider.getSigner(walletAddress)

      const gameContract = new ethers.Contract(
        contractAddress,
        GameOnAvatars.abi,
        signer
      )

      const txn = await gameContract.nftHolders(walletAddress)
      const id = txn.toNumber()
      if (id > 0) {
        if (nftId === id) {
          res.status(200).json({ statusCode: 200, message: 'Success' })
        } else {
          res
            .status(500)
            .json({
              statusCode: 500,
              message: 'Wallet is not owner of the token anymore',
            })
        }
      } else {
        res
          .status(500)
          .json({ statusCode: 500, message: 'Wallet have not a valid token' })
      }
    } else {
      res.status(500).json({ statusCode: 500, message: 'Invalid Token' })
    }
  } catch (err: any) {
    console.log(err)

    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
