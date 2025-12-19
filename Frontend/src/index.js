import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import { CartProvider } from "./context/CartContext";
=======
>>>>>>> cleanup-pycache
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './context/Shopcontext';
import WishlistProvider from './context/WishlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ShopContextProvider>
      <WishlistProvider>
<<<<<<< HEAD
        <CartProvider>
          <App />
        </CartProvider> 
=======
        <App />
>>>>>>> cleanup-pycache
      </WishlistProvider>
    </ShopContextProvider>
);
reportWebVitals();
