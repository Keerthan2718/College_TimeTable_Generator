import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        w-12
        h-12
        rounded-full
        bg-gray-200
        dark:bg-gray-700
        hover:bg-gray-300
        dark:hover:bg-gray-600
        flex
        items-center
        justify-center
        text-xl
        transition
      "
      aria-label="Toggle dark mode"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;