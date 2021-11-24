import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'
import GameOnAvatars from '../../../contracts/GameOnAvatars.json'
import jwt from 'njwt'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const walletAddress = _req.query.id as string
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
    const alchemyURL = process.env.ALCHEMY_URL || ''
    const jwtSecret = process.env.JWT_SECRET || ''

    const provider = new ethers.providers.JsonRpcProvider(alchemyURL)
    const signer = provider.getSigner(walletAddress)

    const gameContract = new ethers.Contract(
      contractAddress,
      GameOnAvatars.abi,
      signer
    )

    if (gameContract) {
      const txn = await gameContract.nftHolders(walletAddress)
      const id = txn.toNumber()
      if (id > 0) {
        const token = jwt.create({ walletAddress, id }, jwtSecret)
        // 2 weeks expiration
        token.setExpiration(new Date().getTime() + 60 * 60 * 24 * 14 * 1000)
        res.status(200).send(token.compact())
      } else {
        res.status(404).json({
          statusCode: 404,
          message: 'Cannot find a valid avatar for this user',
        })
      }
    }
  } catch (err: any) {
    console.log(err)

    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
