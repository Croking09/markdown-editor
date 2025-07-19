import { createContext } from 'react'

type TextContextType = {
  text: string
  setText: (text: string) => void
}

export const TextContext = createContext<TextContextType | undefined>(undefined)
