import React from 'react'
import { Contract, ethers } from 'ethers'
import GameOnAvatars from '../contracts/GameOnAvatars.json'
import { Avatar, NFTStatus } from '../types'
import { upsertAvatar } from '../services/api.service'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export function useNFT(wallet: string) {
  const [nftId, setNFTId] = React.useState<number>(0)
  const [status, setStatus] = React.useState<NFTStatus>(NFTStatus.LOADING)
  const [avatarContract, setAvatarContract] = React.useState<Contract | null>(
    null
  )
  const [tempAvatar, setTempAvatar] = React.useState<Avatar | null>(null)
  const [callback, setCallback] = React.useState<() => void>(() => {})

  async function fetchNFTId() {
    try {
      if (avatarContract) {
        const txn = await avatarContract.checkIfUserHasNFT()
        const id = txn.toNumber()
        if (id > 0) {
          setNFTId(txn)
          setStatus(NFTStatus.MINTED)
        } else {
          setStatus(NFTStatus.NOT_MINTED)
        }
      }
    } catch (error) {
      console.log(error)
      setStatus(NFTStatus.ERROR)
    }
  }

  React.useEffect(() => {
    const onAvatarMint = async (sender: string, tokenId: any) => {
      if (sender.toLowerCase() === wallet.toLowerCase()) {
        if (avatarContract && tempAvatar) {
          await upsertAvatar({ ...tempAvatar, id: String(tokenId.toNumber()) })
          callback()
          await fetchNFTId()
        }
      }
    }

    if (avatarContract) {
      avatarContract.on('AvatarNFTMinted', onAvatarMint)
    }

    return () => {
      if (avatarContract) {
        avatarContract.off('AvatarNFTMinted', onAvatarMint)
      }
    }
  }, [avatarContract, tempAvatar, callback])

  React.useEffect(() => {
    if (wallet) {
      fetchNFTId()
    }
  }, [wallet, avatarContract])

  React.useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const gameContract = new ethers.Contract(
      contractAddress,
      GameOnAvatars.abi,
      signer
    )
    setAvatarContract(gameContract)
  }, [])

  async function mint(avatar: Avatar, callback: () => void) {
    try {
      if (avatarContract) {
        setTempAvatar(avatar)
        setCallback(() => callback)
        console.log('Minting character in progress...')
        const mintTxn = await avatarContract.mintAvatar()
        await mintTxn.wait()
        console.log('mintTxn:', mintTxn)
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error)
    }
  }

  return { nftId, status, mint, contractAddress, fetchNFTId }
}
