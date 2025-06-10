
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../Context/ThemeProvider";

const ThemeNav = () => {
  const { isDark, toggleTheme, isInitialized } = useTheme();

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow px-6 py-4 flex items-center justify-between">
      <button
        onClick={toggleTheme}
        className="text-4xl text-gray-800 dark:text-white"
        aria-label="Toggle theme"
        disabled={!isInitialized}
      >
        {isInitialized ? (
          isDark ? <MdDarkMode /> : <MdLightMode />
        ) : (
          <span style={{ width: "1.5em", height: "1.5em", display: "inline-block" }} />
        )}
      </button>
    </nav>
  );
};

export default ThemeNav;