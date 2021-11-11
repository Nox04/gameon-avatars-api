import { Avatar } from '../types'

export async function upsertAvatar(avatar: Avatar): Promise<Avatar> {
  const response = await fetch(`/api/avatar`, {
    method: 'POST',
    body: JSON.stringify(avatar),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  } else {
    return await response.json()
  }
}
