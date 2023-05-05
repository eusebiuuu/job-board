import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export default function ThemeProvider(props) {
  const [lightTheme, setLightTheme] = useState(true);
  
  function handleThemeToggle() {
    setLightTheme(prev => {
      return !prev;
    });
  }

  const value = {
    theme: lightTheme,
    onThemeToggle: handleThemeToggle,
  }

  return <ThemeContext.Provider value={value}>
    {props.children}
  </ThemeContext.Provider>
}

export const useThemeContext = () => {
  return useContext(ThemeContext);
}