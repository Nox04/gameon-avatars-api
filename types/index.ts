type Attribute = {
  trait_type: string
  value: string | number
}

export type Avatar = {
  id: string
  name: string
  image: string
  description: string
  attributes: Array<Attribute>
}

declare global {
  interface Window {
    ethereum: any
  }
}

export enum WalletStatus {
  NOT_IN_NETWORK,
  SWITCHING_NETWORK,
  VALIDATING,
  NOT_INSTALLED,
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
  ERROR,
}

export enum NFTStatus {
  LOADING,
  MINTED,
  NOT_MINTED,
  ERROR,
  MINTING,
  UPDATING_METADATA,
}

export type LocalData = {
  disconnected: boolean
}

export enum EditorStatus {
  EDITOR_OPEN,
  EDITOR_CLOSED,
}
