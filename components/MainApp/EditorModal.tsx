import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { XIcon } from '@heroicons/react/solid'
import { Avatar, NFTStatus } from '../../types'
import Image from 'next/image'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-avataaars-sprites'
import {
  topOptions,
  clotherColorOptions,
  clothesOptions,
  eyebrowOptions,
  eyesOptions,
  hairColorOptions,
  hatColorOptions,
  mouthOptions,
  skinOptions,
} from '../../utils/avatarOptions'

type Props = {
  open: boolean
  onResult: (result: boolean) => void
  nftId: number
  status: NFTStatus
  avatar: Avatar
  setWipAvatar: (avatar: Avatar) => void
}

export function EditorModal(props: Props) {
  const { open, onResult, nftId, avatar } = props
  const canvas = React.useRef<HTMLImageElement>(null)
  const action = nftId > 0 ? 'Update' : 'Mint'
  const processing = [NFTStatus.MINTING, NFTStatus.UPDATING_METADATA].includes(
    props.status
  )
  const [options, setOptions] = React.useState({
    top: ['straight02'],
    topChance: 100,
    hatColor: ['black'],
    hairColor: ['platinum'],
    accessories: [],
    accessoriesChance: 100,
    facialHair: [],
    facialHairChance: 100,
    facialHairColor: [],
    clothes: ['hoodie'],
    clothesColor: ['black'],
    eyes: ['close'],
    eyebrow: ['default'],
    mouth: ['twinkle'],
    skin: ['yellow'],
  })

  //@ts-ignore
  const svg = createAvatar(style, {
    seed: '',
    style: 'transparent',
    mode: 'include',
    base64: true,
    ...options,
  })

  function updateProperty(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const property = e.currentTarget.id
    const avatar = props.avatar
    if (property === 'name') {
      props.setWipAvatar({ ...avatar, name: e.target.value })
    } else if (property === 'role') {
      props.setWipAvatar({ ...avatar, description: e.target.value })
    } else {
      let attributes = avatar.attributes

      const oldIndex = attributes.findIndex(
        (attr) => attr.trait_type === property
      )

      if (oldIndex === -1) {
        attributes.push({ trait_type: property, value: e.target.value })
      } else {
        attributes[oldIndex] = { trait_type: property, value: e.target.value }
      }
      props.setWipAvatar({
        ...avatar,
        attributes,
      })
    }
  }

  React.useEffect(() => {
    const formatedAttributes = props.avatar.attributes
      .filter((p) => !['Country', 'Team'].includes(p.trait_type))
      .map((p) => ({
        ...p,
        trait_type: `${p.trait_type.charAt(0).toLocaleLowerCase()}${p.trait_type
          .substring(1)
          .replace(' ', '')}`,
      }))
    const userOptions = {}

    formatedAttributes.forEach((attr) => {
      //@ts-ignore
      userOptions[attr.trait_type] = [attr.value]
    })

    setOptions((opt) => ({ ...opt, ...userOptions }))
  }, [props.avatar])

  function saveData() {
    if (canvas.current) {
      const link = document.createElement('a')
      link.download = 'my-image.png'
      link.href = svg
      link.click()
    }
    props.onResult(true)
  }

  const team =
    avatar?.attributes.find((attr) => attr.trait_type === 'Team')?.value || ''
  const country =
    avatar?.attributes.find((attr) => attr.trait_type === 'Country')?.value ||
    ''
  const hairColor =
    avatar?.attributes.find((attr) => attr.trait_type === 'Hair Color')
      ?.value || ''
  const top =
    avatar?.attributes.find((attr) => attr.trait_type === 'Top')?.value || ''
  const hatColor =
    avatar?.attributes.find((attr) => attr.trait_type === 'Hat Color')?.value ||
    ''
  const clothes =
    avatar?.attributes.find((attr) => attr.trait_type === 'Clothes')?.value ||
    ''
  const clothesColor =
    avatar?.attributes.find((attr) => attr.trait_type === 'Clothes Color')
      ?.value || ''
  const eyes =
    avatar?.attributes.find((attr) => attr.trait_type === 'Eyes')?.value || ''
  const eyebrow =
    avatar?.attributes.find((attr) => attr.trait_type === 'Eyebrow')?.value ||
    ''
  const mouth =
    avatar?.attributes.find((attr) => attr.trait_type === 'Mouth')?.value || ''
  const skin =
    avatar?.attributes.find((attr) => attr.trait_type === 'Skin')?.value || ''

  const viewAdButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={viewAdButtonRef}
        open={open}
        onClose={() => onResult(false)}
      >
        <div className="flex justify-center min-h-screen p-4 text-center sm:px-4 sm:py-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="flex flex-col align-bottom w-full bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 lg:my-20 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
              <div className="block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-gray-900 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onResult(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-2 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-white"
                  >
                    {action} your NFT
                  </Dialog.Title>
                  <div className="my-2 md:my-4 flex justify-center items-center w-full">
                    <img ref={canvas} src={svg} height={240} width={240} />
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <form className="space-y-8 divide-y divide-gray-200">
                  <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-white">
                          NFT Metadata
                        </h3>
                      </div>
                      <div className="space-y-6 sm:space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Name
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <input
                              type="text"
                              id="name"
                              autoComplete="name"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={avatar?.name}
                              onChange={updateProperty}
                              placeholder="Your name"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Role
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <input
                              type="text"
                              id="role"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={avatar?.description}
                              onChange={updateProperty}
                              placeholder="Your role"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="team"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Team
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Team"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={team}
                              onChange={updateProperty}
                            >
                              <option>Product</option>
                              <option>Partnerships</option>
                              <option>Platform</option>
                              <option>Experiences</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Country
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Country"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={country}
                              onChange={updateProperty}
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                              <option>Colombia</option>
                              <option>Peru</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Top
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Top"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={top}
                              onChange={updateProperty}
                            >
                              {topOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Hat Color
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Hat Color"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={hatColor}
                              onChange={updateProperty}
                            >
                              {hatColorOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Hair Color
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Hair Color"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={hairColor}
                              onChange={updateProperty}
                            >
                              {hairColorOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Clothes
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Clothes"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={clothes}
                              onChange={updateProperty}
                            >
                              {clothesOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Clothes Color
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Clothes Color"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={clothesColor}
                              onChange={updateProperty}
                            >
                              {clotherColorOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Eyes
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Eyes"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={eyes}
                              onChange={updateProperty}
                            >
                              {eyesOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Eyebrow
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Eyebrow"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={eyebrow}
                              onChange={updateProperty}
                            >
                              {eyebrowOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Mouth
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Mouth"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={mouth}
                              onChange={updateProperty}
                            >
                              {mouthOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 sm:space-x-5">
                          <label
                            htmlFor="hair-color"
                            className="block text-sm font-medium text-gray-300 w-20"
                          >
                            Skin
                          </label>
                          <div className="mt-1 sm:mt-0 w-full">
                            <select
                              id="Skin"
                              className="px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-10"
                              value={skin}
                              onChange={updateProperty}
                            >
                              {skinOptions.map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  className="font-semibold inline-flex items-center px-6 py-3 border border-transparent shadow-md rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  onClick={saveData}
                  disabled={processing}
                >
                  <Image
                    src={
                      processing ? '/assets/loading.svg' : '/assets/pick.svg'
                    }
                    width="32"
                    height="32"
                    alt="mint nft"
                  />
                  <span className="ml-4">{action} NFT</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
