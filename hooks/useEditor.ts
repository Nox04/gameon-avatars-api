import React from 'react'
import { Avatar, EditorStatus } from '../types'

export function useEditor(avatar?: Avatar) {
  const [wipAvatar, setWipAvatar] = React.useState<Avatar>({
    id: '0',
    name: '',
    image: '',
    description: '',
    attributes: [
      { trait_type: 'Country', value: 'Canada' },
      { trait_type: 'Team', value: 'Experiences' },
      { trait_type: 'Top', value: 'straight02' },
      { trait_type: 'Hat Color', value: 'black' },
      { trait_type: 'Hair Color', value: 'platinum' },
      { trait_type: 'Clothes', value: 'hoodie' },
      { trait_type: 'Clothes Color', value: 'black' },
      { trait_type: 'Eyes', value: 'close' },
      { trait_type: 'Skin', value: 'yellow' },
      { trait_type: 'Mouth', value: 'twinkle' },
      { trait_type: 'Eyebrow', value: 'default' },
    ],
  })

  const [editorStatus, setEditorStatus] = React.useState<EditorStatus>(
    EditorStatus.EDITOR_CLOSED
  )

  React.useEffect(() => {
    if (avatar) {
      setWipAvatar(avatar)
    }
  }, [avatar])

  function openEditor() {
    setEditorStatus(EditorStatus.EDITOR_OPEN)
  }

  function closeEditor() {
    setEditorStatus(EditorStatus.EDITOR_CLOSED)
  }

  return { wipAvatar, setWipAvatar, openEditor, closeEditor, editorStatus }
}
