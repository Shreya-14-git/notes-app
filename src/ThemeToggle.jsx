import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {dark ? "Light" : "Dark"} Mode
    </button>
  );
}