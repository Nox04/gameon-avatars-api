import React from 'react'
import { ethers } from 'ethers'
import GameOnAvatars from '../contracts/GameOnAvatars.json'
import { NFTStatus } from '../types'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export function useNFT(wallet: string) {
  const [nftId, setNFTId] = React.useState<number>(0)
  const [status, setStatus] = React.useState<NFTStatus>(NFTStatus.LOADING)

  React.useEffect(() => {
    const fetchNFTId = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const gameContract = new ethers.Contract(
          contractAddress,
          GameOnAvatars.abi,
          signer
        )
        const txn = await gameContract.checkIfUserHasNFT()
        const id = txn.toNumber()
        if (id > 0) {
          setNFTId(txn)
          setStatus(NFTStatus.MINTED)
        } else {
          setStatus(NFTStatus.NOT_MINTED)
        }
      } catch (error) {
        console.log(error)
        setStatus(NFTStatus.ERROR)
      }
    }
    if (wallet) {
      fetchNFTId()
    }
  }, [wallet])

  async function mint() {}

  return { nftId, status, mint }
}
