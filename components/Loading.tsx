import Image from 'next/image'

type Props = {
  size: string
}
export function Loading(props: Props) {
  return (
    <Image
      src="/assets/loading.svg"
      width={props.size}
      height={props.size}
      alt="loading"
    />
  )
}
