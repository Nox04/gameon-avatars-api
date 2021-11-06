import React from 'react'
import { Avatar, EditorStatus } from '../types'

export function useEditor(avatar?: Avatar) {
  const [wipAvatar, setWipAvatar] = React.useState<Avatar>({
    id: '0',
    name: '',
    image: '',
    description: '',
    attributes: [],
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
