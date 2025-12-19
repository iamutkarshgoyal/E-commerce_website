import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CartProvider} from './context/CartContext';
import Header from './MyComponents/pageDesign/Headers';
import Footer from './MyComponents/pageDesign/Footer';
import Home from './MyComponents/productPages/Home';
import About from './MyComponents/pageDesign/About';
import MyCart from "./MyComponents/userPage/MyCart";
import MyProfile from './MyComponents//userPage/MyProfile';
import MyAddresses from './MyComponents/userPage/MyAddresses';
import MyOrders from './MyComponents/userPage/MyOrders';
import MyPayments from './MyComponents/userPage/MyPayments';
import { WishlistProvider } from "./MyComponents/userPage/Wishlist";
import ProductCard from './MyComponents/productPages/Product Card';
import Shop from './MyComponents/productPages/Shop';
import Shopcontext from './context/Shopcontext';
import Signup from './MyComponents/loginPage/SignUp';
import Login from './MyComponents/loginPage/Login';
import ProductDisplay from './MyComponents/productPages/product';
import ProductAdd from './MyComponents/dataProduct/productAdd';
import ProductDelete from './MyComponents/dataProduct/productDelete';
import ProductUpdate from './MyComponents/dataProduct/updateProduct';

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
        <Route path="/products" element={<ProductDisplay />} >
        <Route path=':id' element={<ProductDisplay/>}/> </Route>
        <Route path="/add_product" element={<ProductAdd />} />
        <Route path="/delete_product" element={<ProductDelete />} />
        <Route path="/update_product" element={<ProductUpdate />} />

      </Routes>

      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
