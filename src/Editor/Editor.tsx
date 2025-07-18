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
      <textarea
        className="w-1/2 p-2 border-r resize-none font-roboto-mono focus:outline-none overflow-x-scroll"
        ref={textareaRef}
        id="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onScroll={syncScroll}
        placeholder={PLACEHOLDER_MSG}
        wrap='off'
      />

      <div 
        className={"w-1/2 p-2 resize-none" + " prose max-w-none select-none overflow-x-scroll whitespace-pre"}
        ref={previewRef}
      >
        <Markdown>{text}</Markdown>
      </div>
    </div>
  )
}

export default Editor;
