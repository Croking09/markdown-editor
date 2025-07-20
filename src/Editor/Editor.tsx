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

  return (
    <div className={'flex w-full' + ` ${className}`}>
      <div className="w-1/2 px-2 pt-2 border-r">
        <textarea
          className="w-full h-full resize-none font-roboto-mono focus:outline-none overflow-auto 
                    text-black dark:text-zinc-100 
                    placeholder-zinc-400
                    bg-white dark:bg-zinc-900 
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
          className={"w-full h-full prose dark:prose-invert max-w-none select-none overflow-auto whitespace-pre"}
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
