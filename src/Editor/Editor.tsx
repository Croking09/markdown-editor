import { useState, useRef } from 'react'
import Markdown from 'react-markdown'

import { PLACEHOLDER_MSG } from '../constants'

type EditorProps = {
  className?: string
}

function Editor({ className }: EditorProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const syncScroll = () => {
    if (textareaRef.current && previewRef.current) {
      previewRef.current.scrollTop = textareaRef.current.scrollTop
      previewRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <div className={'flex w-full' + ` ${className}`}>
      <div className="w-1/2 px-2 pt-2 border-r">
        <textarea
          className="w-full h-full resize-none font-roboto-mono focus:outline-none overflow-auto"
          ref={textareaRef}
          id="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={syncScroll}
          placeholder={PLACEHOLDER_MSG}
          wrap='off'
        />
      </div>

      <div className="w-1/2 px-2 pt-2">
        <div 
          className={"w-full h-full" + " prose max-w-none select-none overflow-auto whitespace-pre"}
          ref={previewRef}
        >
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default Editor;
