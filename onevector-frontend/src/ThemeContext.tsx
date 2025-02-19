import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the context type
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the context with an initial value of undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Type for the ThemeProvider props
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Retrieve the saved theme from localStorage or default to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev: boolean) => {
      const newTheme = !prev;
      localStorage.setItem('isDarkMode', JSON.stringify(newTheme)); // Save to localStorage
      return newTheme;
    });
  };

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
