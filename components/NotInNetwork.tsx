import Image from 'next/image'
import { WalletStatus } from '../types'
import { SwitchHorizontalIcon } from '@heroicons/react/solid'
import { Loading } from './Loading'
import { Header } from '../components/MainApp/Header'
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

type Props = {
  walletStatus: WalletStatus
  switchNetwork: () => void
  wallet: string
  disconnect: () => void
}

export function NotInNetwork(props: Props) {
  return (
    <div className="w-full max-w-screen-xl flex flex-col h-full min-h-screen">
      <Header
        wallet={props.wallet}
        disconnect={props.disconnect}
        contractAddress={contractAddress}
      />
      <div className="flex flex-col justify-center items-center space-y-5 flex-grow">
        <Image
          src="/assets/polygon.svg"
          width="128"
          height="128"
          alt="polygon"
        />
        <span className="text-center">
          It looks like you're not connected to the polygon network.
        </span>
        <button
          type="button"
          className="font-semibold inline-flex items-center px-6 py-3 border border-transparent shadow-md rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={props.walletStatus === WalletStatus.NOT_INSTALLED}
          onClick={props.switchNetwork}
        >
          {props.walletStatus === WalletStatus.SWITCHING_NETWORK ? (
            <Loading size="24" />
          ) : (
            <SwitchHorizontalIcon className="w-6 h-6" />
          )}
          <span className="ml-4">Switch Network</span>
        </button>
      </div>
    </div>
  )
}
