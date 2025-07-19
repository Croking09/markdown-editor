import { useState, type ReactNode } from 'react'
import { TextContext } from './textContext'

export const TextProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState('')

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  )
}
