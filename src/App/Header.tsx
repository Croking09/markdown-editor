import { useText } from '../hooks/useText.ts'
import useDarkMode from '../hooks/useDarkMode.ts'

import darkModeIcon from '../assets/dark-mode.svg'
import lightModeIcon from '../assets/light-mode.svg'

function Header() {
  const { isDark, toggleDarkMode } = useDarkMode()
  const { text } = useText()

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'your-file.md'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="p-2 flex items-center justify-between">
        <div className="flex">
          <p className="mr-4">Markdown Editor</p>
          <button
            className="text-gray-500 cursor-pointer"
            onClick={handleDownload}
          >
            Save file
          </button>
        </div>

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
