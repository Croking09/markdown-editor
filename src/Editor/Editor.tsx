import { useState, useRef, useCallback } from "react";

import WritingPanel from "./components/WritingPanel";
import PreviewPanel from "./components/PreviewPanel";
import ConfirmModal from "../App/ConfirmModal";

import { useText } from "../hooks/useText";
import { useResizablePanel } from "../hooks/useResizablePanel";

type EditorProps = {
  className?: string;
  isPreviewMode: boolean;
  isMobileView?: boolean;
};

function Editor({ className, isPreviewMode, isMobileView }: EditorProps) {
  const { text, setText } = useText();

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingContent, setPendingContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  const { panelWidth: editorWidth, startDragging } =
    useResizablePanel("editor-container");

  const syncScroll = useCallback(
    (
      originRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>,
      targetRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>
    ) => {
      if (isSyncing.current) return;
      if (originRef.current && targetRef.current) {
        isSyncing.current = true;
        const origin = originRef.current;
        const target = targetRef.current;

        const scrollTopPercent =
          origin.scrollTop / (origin.scrollHeight - origin.clientHeight || 1);

        target.scrollTop =
          scrollTopPercent * (target.scrollHeight - target.clientHeight);
        setTimeout(() => {
          isSyncing.current = false;
        }, 0);
      }
    },
    []
  );

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.name.endsWith(".md")) {
      alert("Only .md files are supported.");
      return;
    }

    const content = await file.text();

    if (text !== "") {
      setPendingContent(content);
      setShowConfirm(true);
    } else {
      setText(content);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <main
      id="editor-container"
      className={"flex w-full " + (className || "")}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <WritingPanel
        isPreviewMode={isPreviewMode}
        isMobileView={isMobileView}
        editorWidth={editorWidth}
        textareaRef={textareaRef}
        previewRef={previewRef}
        text={text}
        setText={setText}
        syncScroll={syncScroll}
        startDragging={startDragging}
      />

      <PreviewPanel
        text={text}
        isPreviewMode={isPreviewMode}
        isMobileView={isMobileView}
        editorWidth={editorWidth}
        textareaRef={textareaRef}
        previewRef={previewRef}
        syncScroll={syncScroll}
      />

      <ConfirmModal
        isOpen={showConfirm}
        message="Do you want to replace the current content with the new file?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setText(pendingContent);
          setPendingContent("");
          setShowConfirm(false);
        }}
      />
    </main>
  );
}

export default Editor;
