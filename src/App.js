import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CartProvider} from './context/CartContext';
import Header from './MyComponents/Headers';
import Footer from './MyComponents/Footer';
import Home from './MyComponents/Home';
import About from './MyComponents/About';
import MyCart from "./MyComponents/MyCart";
import MyProfile from './MyComponents/MyProfile';
import MyAddresses from './MyComponents/MyAddresses';
import MyOrders from './MyComponents/MyOrders';
import MyPayments from './MyComponents/MyPayments';
import { WishlistProvider } from "./MyComponents/Wishlist";
import ProductCard from './MyComponents/Product Card';
import Shop from './MyComponents/Shop';
import Shopcontext from './context/Shopcontext';
import CreateAccount from './MyComponents/CreateAccount';


function App() {
  return (
    <CartProvider>
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/MyCart" element={<MyCart/>} />
        <Route path="/Menwear" element={<Shop category = 'Men' />} />
        <Route path="/Womenwear" element={<Shop category= 'Woman'  />} />
        <Route path="/Kidswear" element={<Shop category= 'Kids'  />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/MyAddresses" element={<MyAddresses />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/MyPayments" element={<MyPayments />} />
        <Route path="/Wishlist" element={<WishlistProvider />} />
        <Route path="/ProductCard" element={<ProductCard />} />
        <Route path="/Shop/:categoryName" element={<Shopcontext />} />
        <Route path="/createaccount" element={<CreateAccount />} />

      </Routes>

      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
