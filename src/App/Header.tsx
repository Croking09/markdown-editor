import { useCallback, useEffect, useState } from 'react'
import darkModeIcon from '../assets/dark-mode.svg'
import lightModeIcon from '../assets/light-mode.svg'

function Header() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggleDarkMode = useCallback(() => {
    document.documentElement.classList.toggle('dark')
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  return (
    <div>
      <div className="p-2 flex items-center justify-between">
        <p>Markdown Editor</p>
        <img
          className="h-8 w-8 cursor-pointer"
          src={isDark ? lightModeIcon : darkModeIcon}
          alt="Dark mode toggle"
          onClick={toggleDarkMode}
        />
      </div>
      <hr />
    </div>
  )
}

export default Header;
