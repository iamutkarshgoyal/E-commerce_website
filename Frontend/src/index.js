import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './context/Shopcontext';
import WishlistProvider from './context/WishlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ShopContextProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </ShopContextProvider>
);
reportWebVitals();
