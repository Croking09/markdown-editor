import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Editor from '../Editor/Editor.tsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <Header />
      <Editor className="flex-grow" />
      <Footer />
    </div>
  )
}

export default App
