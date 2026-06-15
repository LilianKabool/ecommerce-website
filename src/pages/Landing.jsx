import { Link } from "react-router-dom";
import landingImage from "../assets/landing.png";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--background)]">
      
     
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 relative">
    

        <img
          src={landingImage}
          alt="Lilyra Boutique"
          className="relative w-[80%] max-w-[520px] rounded-[20px]"
        />
      </div>

      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-20 gap-6">
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--primary)] leading-tight tracking-wide">
          FIND YOUR <br />
          STYLE HERE
        </h1>

        <p className="text-yellow-800 text-base md:text-lg max-w-md">
          With Lilyra Boutique you can see the best products in the market and
          buy them with the best prices.
        </p>

        <Link
          to="/home"
          className="bg-yellow-900 text-rose-100 px-8 py-3 rounded-full shadow-md hover:bg-yellow-800 transition"
        >
          Shop Now
        </Link>
      </div>

    </div>
  );
}