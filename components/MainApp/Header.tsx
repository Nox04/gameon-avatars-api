import Image from 'next/image'
import React from 'react'
import { LogoutModal } from './LogoutModal'

type Props = {
  wallet: string
  disconnect: () => void
}

export function Header(props: Props) {
  const [showModal, setShowModal] = React.useState(false)

  function displayLogoutModal() {
    setShowModal(true)
  }

  function onModalResult(result: boolean) {
    if (result) {
      props.disconnect()
    }
    setShowModal(false)
  }

  const readableAddress = `${props.wallet.substr(0, 5)}...${props.wallet.substr(
    props.wallet.length - 4,
    props.wallet.length - 1
  )}`

  return (
    <header className="flex w-full justify-between pt-4 px-2">
      <div>
        <Image src="/assets/gameon.svg" width="170" height="40" alt="gameon" />
      </div>
      <div
        className="inline-flex items-center p-2 bg-indigo-700 rounded-xl cursor-pointer"
        onClick={displayLogoutModal}
      >
        <Image src="/assets/wallet.svg" width="28" height="28" alt="wallet" />
        <span className="pt-1 ml-2">{readableAddress}</span>
      </div>
      <LogoutModal
        open={showModal}
        onResult={onModalResult}
        wallet={props.wallet}
      />
    </header>
  )
}
