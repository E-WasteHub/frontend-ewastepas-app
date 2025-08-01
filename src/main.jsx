// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DarkModeProvider from './context/DarkMode';
import './styles/index.css';
import RouteScrollManager from './utils/RouteScrollManager';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <RouteScrollManager />
        <App />
      </BrowserRouter>
    </DarkModeProvider>
  </React.StrictMode>
);
