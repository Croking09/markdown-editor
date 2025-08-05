import { PLACEHOLDER_MSG } from "../../constants";

type WritingPanelProps = {
  isPreviewMode: boolean;
  isMobileView?: boolean;
  editorWidth: number;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  previewRef: React.RefObject<HTMLDivElement | null>;
  text: string;
  setText: (text: string) => void;
  syncScroll: (
    originRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>,
    targetRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>
  ) => void;
  startDragging: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function WritingPanel({
  isPreviewMode,
  isMobileView,
  editorWidth,
  textareaRef,
  previewRef,
  text,
  setText,
  syncScroll,
  startDragging,
}: WritingPanelProps) {
  return (
    <div
      className={`flex-grow px-2 py-2 sm:border-r relative ${
        isPreviewMode ? "hidden" : "block"
      } sm:block`}
      style={{ width: isMobileView ? "100%" : `${editorWidth}%` }}
    >
      <textarea
        className="w-full h-full resize-none font-roboto-mono focus:outline-none overflow-auto whitespace-normal break-words colors"
        ref={textareaRef}
        id="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onScroll={() => syncScroll(textareaRef, previewRef)}
        placeholder={PLACEHOLDER_MSG}
      />

      <div
        className="hidden sm:block absolute top-0 right-0 w-3 h-full cursor-col-resize z-10 translate-x-1/2"
        onMouseDown={startDragging}
      />
    </div>
  );
}

export default WritingPanel;
