import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Editor from '../Editor/Editor.tsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-light-bg text-dark-text dark:bg-dark-bg dark:text-light-text transition-colors duration-300">
      <Header />
      <Editor className="flex-grow h-[1px]" />
      <Footer />
    </div>
  )
}

export default App
