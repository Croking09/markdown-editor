import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App/App.tsx'
import { TextProvider } from './context/TextProvider.tsx'

import './app.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TextProvider>
      <App />
    </TextProvider>
  </StrictMode>,
)
