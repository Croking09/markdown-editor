import { useState, useEffect } from "react";

import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Editor from "../Editor/Editor.tsx";

function App() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640); // tailwind's sm breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };

    setAppHeight();
    window.addEventListener("resize", setAppHeight);

    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  return (
    <div className="flex flex-col h-[var(--app-height)] safe-container font-inter colors">
      <Header
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        isMobileView={isMobileView}
      />
      <Editor
        className="flex-grow h-[1px]"
        isPreviewMode={isPreviewMode}
        isMobileView={isMobileView}
      />
      <Footer />
    </div>
  );
}

export default App;
