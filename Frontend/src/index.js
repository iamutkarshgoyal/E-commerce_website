import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from "./context/CartContext";
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './context/Shopcontext';
import WishlistProvider from './context/WishlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ShopContextProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
        </CartProvider> 
      </WishlistProvider>
    </ShopContextProvider>
);
reportWebVitals();
