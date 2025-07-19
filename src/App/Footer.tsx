import useDarkMode from '../hooks/useDarkMode'

import { github } from '../data'

function Footer() {
  const { isDark } = useDarkMode()

  return (
    <div>
      <hr />

      <div className="flex items-center justify-between p-2">
        <a href={github.url} target="_blank" rel="noopener noreferrer">
          <img
            className={`w-8 h-8 ${github.name === 'GitHub' && isDark ? 'bg-white rounded-full' : ''}`}
            src={github.logo}
            alt={github.name}
          />
        </a>
        <p>© 2025 Javier Hernández Martínez.</p>
      </div>
    </div>
  )
}

export default Footer;
