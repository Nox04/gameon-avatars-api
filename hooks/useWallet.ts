import React from 'react'
import { toast } from 'react-toastify'
import { LocalData, WalletStatus } from '../types'
import useLocalStorage from './useLocalStorage'

export function useWallet() {
  const [wallet, setWallet] = React.useState<string>('')
  const [status, setStatus] = React.useState<WalletStatus>(
    WalletStatus.VALIDATING
  )
  const [localData, setLocalData] = useLocalStorage<LocalData>('local-data', {
    disconnected: false,
  })

  React.useEffect(() => {
    if (!window.ethereum) {
      setStatus(WalletStatus.NOT_INSTALLED)
    }
  })

  React.useEffect(() => {
    if (window.ethereum) {
      if (!localData.disconnected) {
        checkIfWalletIsConnected()
      } else {
        setStatus(WalletStatus.DISCONNECTED)
      }
    }
  }, [localData])

  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', checkIfWalletIsConnected)
      window.ethereum.on('chainChanged', () => window.location.reload())
    }
    return function cleanupListener() {
      if (window.ethereum) {
        window.ethereum.removeListener(
          'accountsChanged',
          checkIfWalletIsConnected
        )
        window.ethereum.removeListener('chainChanged', () =>
          window.location.reload()
        )
      }
    }
  }, [])

  async function checkIfWalletIsConnected() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        setWallet(account)
        setStatus(WalletStatus.CONNECTED)
        checkNetwork()
      } else {
        setStatus(WalletStatus.DISCONNECTED)
      }
    } catch (error) {
      setStatus(WalletStatus.DISCONNECTED)
    }
  }

  function checkNetwork() {
    if (window.ethereum.networkVersion !== '1337') {
      setStatus(WalletStatus.NOT_IN_NETWORK)
    }
  }

  async function switchNetwork() {
    setStatus(WalletStatus.SWITCHING_NETWORK)
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }],
      })
    } catch (switchError: any) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89',
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
              blockExplorerUrls: ['https://polygonscan.com/'],
            },
          ],
        })
      } catch (addError) {
        toast.error(switchError.message)
        checkIfWalletIsConnected()
      }
    }
  }

  async function connect() {
    try {
      setStatus(WalletStatus.CONNECTING)
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      setWallet(accounts[0])
      setStatus(WalletStatus.CONNECTED)
      setLocalData({ disconnected: false })
      checkNetwork()
      toast.success('Wallet connected!')
    } catch (error: any) {
      setStatus(WalletStatus.ERROR)
      toast.error(error.message)
    }
  }

  async function disconnect() {
    try {
      setWallet('')
      setLocalData({ disconnected: true })
      setStatus(WalletStatus.DISCONNECTED)
      toast.success('Wallet Disconnected!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return { wallet, status, connect, switchNetwork, disconnect }
}
