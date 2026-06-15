import { Routes , Route } from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import ProductsDetails from "../context/ProductsDetails";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
function AppRoutes(){
   return(
    
     <Routes>
      <Route path="/" element={<Landing />} />
                <Route path="home" element={<Home />} />
                
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/products/:id" element={<ProductsDetails />} />
                 <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
              </Routes>
   )
}
export default AppRoutes ;