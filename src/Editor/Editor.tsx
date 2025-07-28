import { useRef, useCallback } from 'react'
import Markdown from 'react-markdown'

import { useText } from '../hooks/useText'
import { PLACEHOLDER_MSG } from '../constants'

type EditorProps = {
  className?: string
}

function Editor({ className }: EditorProps) {
  const {text, setText} = useText()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const isSyncing = useRef(false)

  const syncScroll = useCallback((
    originRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>,
    targetRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>
  ) => {
    if (isSyncing.current) return
    if (originRef.current && targetRef.current) {
      isSyncing.current = true
      const origin = originRef.current
      const target = targetRef.current

      const scrollTopPercent = origin.scrollTop / (origin.scrollHeight - origin.clientHeight || 1)
      const scrollLeftPercent = origin.scrollLeft / (origin.scrollWidth - origin.clientWidth || 1)

      target.scrollTop = scrollTopPercent * (target.scrollHeight - target.clientHeight)
      target.scrollLeft = scrollLeftPercent * (target.scrollWidth - target.clientWidth)
      setTimeout(() => { isSyncing.current = false }, 0)
    }
  }, [])

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.md')) {
      const content = await file.text()
      setText(content)
    } else {
      alert('Only .md files are supported.')
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div
      className={'flex w-full ' + (className || '')}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="w-1/2 px-2 pt-2 border-r">
        <textarea
          className="w-full h-full resize-none font-roboto-mono focus:outline-none overflow-auto whitespace-normal break-words 
                    text-dark-text dark:text-light-text 
                    placeholder-placeholder
                    bg-light-bg dark:bg-dark-bg 
                    transition-colors duration-300"
          ref={textareaRef}
          id="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={() => syncScroll(textareaRef, previewRef)}
          placeholder={PLACEHOLDER_MSG}
          wrap="off"
        />
      </div>

      <div className="w-1/2 px-2 pt-2">
        <div 
          className="w-full h-full prose dark:prose-invert max-w-none select-none overflow-auto"
          ref={previewRef}
          onScroll={() => syncScroll(previewRef, textareaRef)}
        >
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default Editor;
