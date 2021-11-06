import Lottie from 'react-lottie'
import animationData from '../animations/humans.json'
import Image from 'next/image'
import { WalletStatus } from '../types'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

type Props = {
  walletStatus: WalletStatus
  connectWallet: () => void
}

const ConnectWallet = (props: Props) => {
  return (
    <>
      <Lottie options={defaultOptions} height={300} width={300} />
      <span className="text-4xl font-bold">GameOn Avatars</span>
      <button
        type="button"
        className="font-semibold inline-flex items-center px-6 py-3 border border-transparent shadow-md rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={props.walletStatus === WalletStatus.NOT_INSTALLED}
        onClick={props.connectWallet}
      >
        <Image
          src={
            props.walletStatus === WalletStatus.CONNECTING
              ? '/assets/loading.svg'
              : '/assets/fox.svg'
          }
          width="32"
          height="32"
          alt="metamask logo"
        />
        <span className="ml-4">Connect your wallet</span>
      </button>
      {props.walletStatus === WalletStatus.NOT_INSTALLED ? (
        <span className="text-center">
          It looks like you have not metamask installed. Please install the app
          or web extension before using GameOn Avatars
        </span>
      ) : null}
    </>
  )
}

export default ConnectWallet
