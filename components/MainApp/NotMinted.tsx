import Image from 'next/image'
import React from 'react'
import Lottie from 'react-lottie'
import { NFTStatus } from '../../types'
import animationData from '../../animations/mint.json'

type Props = {
  status: NFTStatus
  openEditor: () => void
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export function NotMinted(props: Props) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Lottie options={defaultOptions} height={300} width={300} />
      <span>You have not minted your NFT yet!</span>
      <button
        type="button"
        className="font-semibold inline-flex items-center px-6 py-3 border border-transparent shadow-md rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={props.openEditor}
      >
        <Image
          src={
            props.status === NFTStatus.MINTING
              ? '/assets/loading.svg'
              : '/assets/pick.svg'
          }
          width="32"
          height="32"
          alt="mint nft"
        />
        <span className="ml-4">Design your NFT</span>
      </button>
    </div>
  )
}
