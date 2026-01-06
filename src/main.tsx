import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';

/**
 * Application entry point - mounts the React app to the DOM
 * Uses React 18's createRoot API for concurrent features and StrictMode for development warnings
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
