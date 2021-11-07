import Image from 'next/image'
import React from 'react'
import { Avatar, NFTStatus } from '../../types'
import { PencilAltIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { Loading } from '../Loading'

type Props = {
  nftId: number
  status: NFTStatus
  openEditor: () => void
  contractAddress: string
  avatar?: Avatar
}

export function Minted(props: Props) {
  if (!props.avatar) {
    return <Loading size="64" />
  }

  return (
    <div className="flex flex-col items-center space-y-5 w-full">
      <div className="flex flex-1 flex-col w-full max-w-2xl items-center space-y-4 lg:items-start lg:space-x-4 lg:flex-row lg:space-y-0">
        <Image
          src={props.avatar?.image || '/assets/loading.svg'}
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL="/assets/loading.svg"
        />
        <div className="flex flex-1 justify-center flex-wrap flex-col space-y-2 w-full max-w-sm">
          <div className="flex flex-col justify-center py-2 mx-2 flex-1 bg-blue-500 bg-opacity-25 rounded-lg border-2 border-blue-600">
            <dt className="font-bold text-gray-300 text-center">Name</dt>
            <dd className="text-sm text-white text-center">
              {props.avatar.name}
            </dd>
          </div>
          <div className="flex flex-col justify-center py-2 mx-2 flex-1 bg-blue-500 bg-opacity-25 rounded-lg border-2 border-blue-600">
            <dt className="font-bold text-gray-300 text-center">Role</dt>
            <dd className="text-sm text-white text-center">
              {props.avatar.description}
            </dd>
          </div>
          {props.avatar.attributes.map((attr: any) => {
            return (
              <div
                key={attr.trait_type}
                className="flex flex-col justify-center py-2 mx-2 flex-1 bg-blue-500 bg-opacity-25 rounded-lg border-2 border-blue-600"
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
          href={`https://opensea.io/assets/${props.contractAddress}/${props.nftId}`}
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