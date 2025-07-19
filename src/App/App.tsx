import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Editor from '../Editor/Editor.tsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-white text-black dark:bg-zinc-900 dark:text-zinc-100">
      <Header />
      <Editor className="flex-grow h-[1px]" />
      <Footer />
    </div>
  )
}

export default App
