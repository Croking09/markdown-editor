import Markdown from "react-markdown";

type PreviewPanelProps = {
  text: string;
  isPreviewMode: boolean;
  isMobileView?: boolean;
  editorWidth: number;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  previewRef: React.RefObject<HTMLDivElement | null>;
  syncScroll: (
    originRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>,
    targetRef: React.RefObject<HTMLTextAreaElement | HTMLDivElement | null>
  ) => void;
};

function PreviewPanel({
  text,
  isPreviewMode,
  isMobileView,
  editorWidth,
  textareaRef,
  previewRef,
  syncScroll,
}: PreviewPanelProps) {
  return (
    <div
      className={`px-2 py-2  ${isPreviewMode ? "block" : "hidden"} sm:block`}
      style={{ width: isMobileView ? "100%" : `${100 - editorWidth}%` }}
    >
      <div
        className="w-full h-full prose dark:prose-invert max-w-none select-none overflow-auto"
        ref={previewRef}
        onScroll={() => syncScroll(previewRef, textareaRef)}
      >
        <Markdown
          components={{
            a: ({ ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer">
                {props.children}
              </a>
            ),
          }}
        >
          {text}
        </Markdown>
      </div>
    </div>
  );
}

export default PreviewPanel;
