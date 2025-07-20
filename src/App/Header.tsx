import { useText } from '../hooks/useText.ts'
import useDarkMode from '../hooks/useDarkMode.ts'

import darkModeIcon from '../assets/dark-mode.svg'
import lightModeIcon from '../assets/light-mode.svg'

function Header() {
  const { isDark, toggleDarkMode } = useDarkMode()
  const { text, setText } = useText()

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'your-file.md'
    link.click()

    URL.revokeObjectURL(url)
  }

  const handleReadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'text/markdown'

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result
        if (typeof text === 'string') {
          setText(text)
        }
      }
      reader.readAsText(file)
    }

    input.click()
  }

  return (
    <div>
      <div className="p-2 flex items-center justify-between">
        <div className="flex">
          <p className="mr-4">Markdown Editor</p>
          <div className="flex gap-4">
            <button
              className="text-gray-500 cursor-pointer"
              onClick={handleReadFile}
            >
              Open file
            </button>
            <button
              className="text-gray-500 cursor-pointer"
              onClick={handleDownload}
            >
              Save file
            </button>
          </div>
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
