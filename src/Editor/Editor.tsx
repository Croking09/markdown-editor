
import { useState, useRef, useCallback } from 'react'
import Markdown from 'react-markdown'

import ConfirmModal from '../App/ConfirmModal'

import { useText } from '../hooks/useText'
import { useResizablePanel } from '../hooks/useResizablePanel'
import { PLACEHOLDER_MSG } from '../constants'

type EditorProps = {
  className?: string
  isPreviewMode: boolean
  isMobileView?: boolean
}

function Editor({ className, isPreviewMode, isMobileView }: EditorProps) {
  const {text, setText} = useText()

  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingContent, setPendingContent] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const isSyncing = useRef(false)

  const {panelWidth: editorWidth, startDragging} = useResizablePanel('editor-container')

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
    if (!file) return

    if (!file.name.endsWith('.md')) {
      alert('Only .md files are supported.')
      return
    }

    const content = await file.text()

    if (text !== '') {
      setPendingContent(content)
      setShowConfirm(true)
    } else {
      setText(content)
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div
      id="editor-container"
      className={'flex w-full ' + (className || '')}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div
        className={`px-2 pt-2 sm:border-r relative ${isPreviewMode ? 'hidden' : 'block'} sm:block`}
        style={{ width: isMobileView ? '100%' : `${editorWidth}%` }}
      >
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

        <div
          className="hidden sm:block absolute top-0 right-0 w-3 h-full cursor-col-resize z-10 translate-x-1/2"
          onMouseDown={startDragging}
        />
      </div>

      <div
        className={`px-2 pt-2 ${isPreviewMode ? 'block' : 'hidden'} sm:block`}
        style={{ width: isMobileView ? '100%' : `${100 - editorWidth}%` }}
      >
        <div 
          className="w-full h-full prose dark:prose-invert max-w-none select-none overflow-auto"
          ref={previewRef}
          onScroll={() => syncScroll(previewRef, textareaRef)}
        >
          <Markdown
            components={{
              a: ({...props}) => (
                <a {...props} target="_blank" rel="noopener noreferrer">
                  {props.children}
                </a>
              )
            }}
          >
            {text}
          </Markdown>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        message="Do you want to replace the current content with the new file?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setText(pendingContent)
          setPendingContent('')
          setShowConfirm(false)
        }}
      />
    </div>
  )
}

export default Editor;
