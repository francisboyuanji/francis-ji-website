import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { I18nProvider } from './contexts/I18nContext';
import { TRPCProvider } from '@/providers/trpc';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <TRPCProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </TRPCProvider>
    </HashRouter>
  </React.StrictMode>,
);
