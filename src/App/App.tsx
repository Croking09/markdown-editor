import { useState, useEffect } from 'react'

import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Editor from '../Editor/Editor.tsx'

function App() {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640) // tailwind's sm breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-inter bg-light-bg text-dark-text dark:bg-dark-bg dark:text-light-text transition-colors duration-300">
      <Header isPreviewMode={isPreviewMode} setIsPreviewMode={setIsPreviewMode} isMobileView={isMobileView} />
      <Editor className="flex-grow h-[1px]" isPreviewMode={isPreviewMode} isMobileView={isMobileView} />
      <Footer />
    </div>
  )
}

export default App
