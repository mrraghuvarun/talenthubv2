import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider } from './ThemeContext'; // Ensure the path to ThemeContext is correct
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create the root for rendering
const root = ReactDOM.createRoot(rootElement);

// Render the app wrapped in ThemeProvider
root.render(
  <React.StrictMode>
  <Theme>
    <ThemeProvider> {/* Wrap the entire app */}
      <App />
    </ThemeProvider>
  </Theme>
  </React.StrictMode>
);

// For measuring performance (optional)
reportWebVitals();
