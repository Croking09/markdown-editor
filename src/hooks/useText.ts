import { useContext } from 'react'

import { TextContext } from '../context/textContext'

export const useText = () => {
  const context = useContext(TextContext)
  if (!context) {
    throw new Error('useText must be used within a TextProvider')
  }
  return context
}
