import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }, [theme]);
  return { theme, setTheme };
}