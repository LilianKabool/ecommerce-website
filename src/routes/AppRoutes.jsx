import { Routes , Route } from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import Auth from "../pages/Auth";
import ProductsDetails from "../context/ProductsDetails";
import Landing from "../pages/Landing";
function AppRoutes(){
   return(
    
     <Routes>
      <Route path="/" element={<Landing />} />
                <Route path="home" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/products/:id" element={<ProductsDetails />} />
              </Routes>
   )
}
export default AppRoutes ;