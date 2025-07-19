import { useState, useEffect, useCallback } from 'react'

type DarkModeReturnType = {
  isDark: boolean
  toggleDarkMode: () => void
}

export default function useDarkMode(): DarkModeReturnType {
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggleDarkMode = useCallback(() => {
    document.documentElement.classList.toggle('dark')
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  return { isDark, toggleDarkMode }
}
