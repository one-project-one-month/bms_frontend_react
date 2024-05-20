import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import QueryWrapper from './components/layouts/QueryWrapper.tsx';
import StoreProvider from './store/StoreProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryWrapper>
      <StoreProvider>
        <App />
      </StoreProvider>
    </QueryWrapper>
  </React.StrictMode>,
);
