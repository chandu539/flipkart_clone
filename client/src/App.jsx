import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';  // Importing Toaster
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Mobiles from "./Pages/Electronics/Mobiles";
import Laptops from "./Pages/Electronics/Laptops";
import TVs from "./Pages/Electronics/TVs";
import Watches from "./Pages/Electronics/Watches";
import Headphones from "./Pages/Electronics/Headphones";
import Beds from "./Pages/HomeandFurniture/Beds";
import Chairs from "./Pages/HomeandFurniture/Chairs";
import Sofas from "./Pages/HomeandFurniture/Sofas";
import Wardrobes from "./Pages/HomeandFurniture/Wardrobes";
import FootWear from "./Pages/Fashion/FootWear";
import KidsWear from "./Pages/Fashion/KidsWear";
import WomensWear from "./Pages/Fashion/WomensWear";
import MensWear from "./Pages/Fashion/MensWear";
import Makeup from "./Pages/BeautyandPersonalCare/Makeup";
import Skincare from "./Pages/BeautyandPersonalCare/Skincare";
import Haircare from "./Pages/BeautyandPersonalCare/Haircare";
import Fragrances from "./Pages/BeautyandPersonalCare/Fragrances";
import Grooming from "./Pages/BeautyandPersonalCare/Grooming";
import WishList from "./Pages/wishlist";
import Sports from "./Pages/SportsandFitness/Sports";
import Signup from "./Pages/Signup";
import MyProfile from "./Pages/MyProfile";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      {/* Toaster component included here */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mobiles" element={<Mobiles />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/tvs" element={<TVs />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/headphones" element={<Headphones />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/chairs" element={<Chairs />} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/wardrobes" element={<Wardrobes />} />
        <Route path="/footwear" element={<FootWear />} />
        <Route path="/kidswear" element={<KidsWear />} />
        <Route path="/womenswear" element={<WomensWear />} />
        <Route path="/menswear" element={<MensWear />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/menswear" element={<MensWear />} />
        <Route path="/skincare" element={<Skincare />} />
        <Route path="/haircare" element={<Haircare />} />
        <Route path="/fragrances" element={<Fragrances />} />
        <Route path="/Grooming" element={<Grooming />} />
        <Route path="/sports" element={<Sports/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/wishlist" element={<ProtectedRoute><WishList /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        {/* Catch-All Route for Debugging */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
