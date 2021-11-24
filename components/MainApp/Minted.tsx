import Image from 'next/image'
import React from 'react'
import { Avatar, NFTStatus } from '../../types'
import { PencilAltIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { Loading } from '../Loading'
import QRCode from 'qrcode'

type Props = {
  nftId: number
  status: NFTStatus
  openEditor: () => void
  contractAddress: string
  avatar?: Avatar
  wallet: string
}

export function Minted(props: Props) {
  const [qrCode, setQrCode] = React.useState<string | undefined>(undefined)
  if (!props.avatar) {
    return <Loading size="64" />
  }

  async function fetchQRCode() {
    const result = await fetch(`/api/qr/${props.wallet}`)
    const response = await result.text()
    console.log(response)
    const qr = await QRCode.toDataURL(JSON.stringify(response))
    setQrCode(qr)
  }

  React.useEffect(() => {
    fetchQRCode()
  }, [props.wallet])

  return (
    <div className="flex flex-col items-center space-y-5 w-full py-20">
      <div className="flex flex-1 flex-col w-full max-w-2xl items-center space-y-4 lg:items-start lg:space-x-4 lg:flex-row lg:space-y-0">
        <div className="flex flex-col justify-between">
          <Image
            src={props.avatar?.image || '/assets/loading.svg'}
            width={300}
            height={300}
          />
          <div className="mt-4">
            <Image
              src={qrCode || '/assets/loading.svg'}
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-3/4">
          <div className="flex flex-col justify-center py-2 w-full bg-blue-500 bg-opacity-25 rounded-lg border-2 border-blue-600">
            <dt className="font-bold text-gray-300 text-center">Name</dt>
            <dd className="text-sm text-white text-center">
              {props.avatar.name}
            </dd>
          </div>
          <div className="flex flex-col justify-center py-2 w-full bg-blue-500 bg-opacity-25 rounded-lg border-2 border-blue-600">
            <dt className="font-bold text-gray-300 text-center">Role</dt>
            <dd className="text-sm text-white text-center">
              {props.avatar.description}
            </dd>
          </div>
          {props.avatar.attributes.map((attr: any) => {
            return (
              <div
                key={attr.trait_type}
                className="flex flex-col justify-center py-2 w-full bg-blue-500 bg-opacity-25 rounded-lg border-2 border-blue-600"
              >
                <dt className="font-bold text-gray-300 text-center">
                  {attr.trait_type}
                </dt>
                <dd className="text-sm text-white text-center">{attr.value}</dd>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center w-full px-4 justify-center">
        <button
          type="button"
          className="font-semibold inline-flex items-center px-6 py-3 border border-transparent shadow-md rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full max-w-xs"
          onClick={props.openEditor}
        >
          <PencilAltIcon className="h-6 w-6" />
          <span className="ml-4">Update your NFT</span>
        </button>
        <a
          href={`https://opensea.io/assets/matic/${props.contractAddress}/${props.nftId}`}
          className="font-semibold inline-flex items-center px-6 py-3 border border-transparent shadow-md rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full max-w-xs"
          target="_blank"
        >
          <ExternalLinkIcon className="h-6 w-6" />
          <span className="ml-4">View on OpenSea</span>
        </a>
      </div>
    </div>
  )
}
