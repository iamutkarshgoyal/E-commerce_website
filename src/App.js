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
import MenTopwear from './MyComponents/MenTopwear';
import MenBottomwear from './MyComponents/MenBottomwear';
import MenGymwear from './MyComponents/MenGymwear';
import MenAccessories from './MyComponents/MenAccessories';
import WomenTopwear from './MyComponents/WomenTopwear';
import WomenBottomwear from './MyComponents/WomenBottomwear';
import WomenGymwear from './MyComponents/WomenGymwear';
import WomenAccessories from './MyComponents/WomenAccessories';
import MyProfile from './MyComponents/MyProfile';
import MyAddresses from './MyComponents/MyAddresses';
import MyOrders from './MyComponents/MyOrders';
import MyPayments from './MyComponents/MyPayments';
import {Wishlist} from './MyComponents/Wishlist';
import Signout from './MyComponents/Signout';
import Help from './MyComponents/Help';
import Tshirt from './MyComponents/Tshirt';

function App() {
  return (
    <CartProvider>
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/MyCart" element={<MyCart/>} />
        <Route path="/MenTopwear" element={<MenTopwear />} />
        <Route path="/MenBottomwear" element={<MenBottomwear />} />
        <Route path="/MenGymwear" element={<MenGymwear />} />
        <Route path="/MenAccessories" element={<MenAccessories />} />
        <Route path="/WomenAccessories" element={<WomenAccessories />} />
        <Route path="/WomenBottomwear" element={<WomenBottomwear />} />
        <Route path="/WomenGymwear" element={<WomenGymwear />} />
        <Route path="/WomenTopwear" element={<WomenTopwear />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/MyAddresses" element={<MyAddresses />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/MyPayments" element={<MyPayments />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Signout" element={<Signout />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/tshirt/:id" element={<Tshirt />} />

      </Routes>

      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;
