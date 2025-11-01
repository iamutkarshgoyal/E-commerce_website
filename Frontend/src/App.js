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
import Signup from './MyComponents/SignUp';
import Login from './MyComponents/Login';
import Item from './MyComponents/Item';


function App() {
  return (
    <CartProvider>
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/MyCart" element={<MyCart/>} />
        <Route path="/Menwear" element={<Shop gender = 'Men' />} />
        <Route path="/Womenwear" element={<Shop gender= 'Women'  />} />
        <Route path="/Kidswear" element={<Shop gender= 'Kids'  />} />
        <Route path="/Unisexwear" element={<Shop gender= 'Unisex'  />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/MyAddresses" element={<MyAddresses />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/MyPayments" element={<MyPayments />} />
        <Route path="/Wishlist" element={<WishlistProvider />} />
        <Route path="/ProductCard" element={<ProductCard />} />
        <Route path="/Shop/:categoryName" element={<Shopcontext />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Item />} >
          <Route path=':id' element={<Item/>}/>
        </Route>

      </Routes>

      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
