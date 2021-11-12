import React from 'react'
import useSWR from 'swr'
import { useEditor } from '../hooks/useEditor'
import { useNFT } from '../hooks/useNFT'
import { EditorStatus, NFTStatus } from '../types'
import { Loading } from './Loading'
import { EditorModal } from './MainApp/EditorModal'
import { Header } from './MainApp/Header'
import { Minted } from './MainApp/Minted'
import { NotMinted } from './MainApp/NotMinted'

type Props = {
  wallet: string
  disconnect: () => void
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function MainApp(props: Props) {
  const { nftId, status, contractAddress, fetchNFTId, mint } = useNFT(
    props.wallet
  )
  const { data, mutate } = useSWR(
    nftId > 0 ? `/api/avatar/${nftId}` : null,
    fetcher
  )
  const { wipAvatar, setWipAvatar, closeEditor, openEditor, editorStatus } =
    useEditor()

  React.useEffect(() => {
    if (data) {
      setWipAvatar(data)
    }
  }, [data])

  function renderContent() {
    switch (status) {
      case NFTStatus.LOADING:
        return <Loading size="64" />
      case NFTStatus.MINTED:
        return (
          <Minted
            status={status}
            openEditor={openEditor}
            nftId={nftId}
            contractAddress={contractAddress}
            avatar={wipAvatar}
          />
        )
      default:
        return <NotMinted status={status} openEditor={openEditor} />
    }
  }

  function onModalResult(result: boolean) {
    if (result) {
      closeEditor()
      fetchNFTId()
      mutate()
    } else {
      closeEditor()
    }
  }

  return (
    <div className="w-full max-w-screen-xl flex flex-col min-h-screen">
      <Header
        wallet={props.wallet}
        disconnect={props.disconnect}
        contractAddress={contractAddress}
      />
      <div className="flex-grow flex justify-center items-center">
        {renderContent()}
        <EditorModal
          open={editorStatus === EditorStatus.EDITOR_OPEN}
          onResult={onModalResult}
          nftId={nftId}
          status={status}
          avatar={wipAvatar}
          setWipAvatar={setWipAvatar}
          mintAvatar={mint}
        />
      </div>
    </div>
  )
}
