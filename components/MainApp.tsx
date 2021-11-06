import React from 'react'
import { useNFT } from '../hooks/useNFT'
import { NFTStatus } from '../types'
import { Loading } from './Loading'
import { Header } from './MainApp/Header'
import { Minted } from './MainApp/Minted'
import { NotMinted } from './MainApp/NotMinted'

type Props = {
  wallet: string
  disconnect: () => void
}

export function MainApp(props: Props) {
  const { nftId, status, mint } = useNFT(props.wallet)

  function renderContent() {
    switch (status) {
      case NFTStatus.LOADING:
        return <Loading size="64" />
      case NFTStatus.MINTED:
        return <Minted status={status} mintNFT={mint} nftId={nftId} />
      default:
        return <NotMinted status={status} mintNFT={mint} />
    }
  }

  return (
    <div className="w-full max-w-screen-xl flex flex-col h-full">
      <Header wallet={props.wallet} disconnect={props.disconnect} />
      <div className="flex-grow flex justify-center items-center">
        {renderContent()}
      </div>
    </div>
  )
}
