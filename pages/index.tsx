import ConnectWallet from '../components/ConnectWallet'
import { Loading } from '../components/Loading'
import { MainApp } from '../components/MainApp'
import { NotInNetwork } from '../components/NotInNetwork'
import { useWallet } from '../hooks/useWallet'
import { WalletStatus } from '../types'

const IndexPage = () => {
  const { wallet, status, connect, switchNetwork, disconnect } = useWallet()

  function renderContent() {
    switch (status) {
      case WalletStatus.CONNECTED:
        return <MainApp wallet={wallet} disconnect={disconnect} />
      case WalletStatus.VALIDATING:
        return <Loading size="64" />
      case WalletStatus.NOT_IN_NETWORK:
      case WalletStatus.SWITCHING_NETWORK:
        return (
          <NotInNetwork
            walletStatus={status}
            switchNetwork={switchNetwork}
            wallet={wallet}
            disconnect={disconnect}
          />
        )
      default:
        return <ConnectWallet walletStatus={status} connectWallet={connect} />
    }
  }

  return (
    <main className="bg-gray-800 h-screen flex flex-col text-white justify-center items-center space-y-5">
      {renderContent()}
    </main>
  )
}

export default IndexPage
