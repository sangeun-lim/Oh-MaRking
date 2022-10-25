import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './style/Reset.scss';
import './style/font.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
