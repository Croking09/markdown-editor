import useDarkMode from "../hooks/useDarkMode";

import { github } from "../data";

function Footer() {
  const { isDark } = useDarkMode();

  return (
    <footer>
      <hr />

      <div className="flex items-center justify-between p-2">
        <a href={github.url} target="_blank" rel="noopener noreferrer">
          <img
            className={`w-8 h-8 ${isDark ? "bg-white rounded-full" : ""}`}
            src={github.logo}
            alt={github.name}
          />
        </a>
        <p>© 2025 Javier Hernández Martínez.</p>
      </div>
    </footer>
  );
}

export default Footer;
