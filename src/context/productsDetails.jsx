import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/Products";
import { UseCard } from "./CardContext";
import { BiCart } from "react-icons/bi";
import { UseAuth } from "./AuthContext";

export default function ProductsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = UseAuth();
  const { cardItems, addToCard } = UseCard();

  const [product, setProduct] = useState(null);

  const productInCard = cardItems.find(
    (item) => item.id === product?.id
  );

  const productQuantityLable = productInCard
    ? `: ${productInCard.quantity}`
    : "";

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      navigate("/");
      return;
    }

    setProduct(foundProduct);
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-[var(--primary)] text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6 py-10">
      <div className="max-w-5xl w-full">
        
        
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] transition"
        >
          ← Back to Home
        </button>

        <div className="grid md:grid-cols-2 gap-12  p-12 rounded-[35px] shadow-2xl">

  
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-[85%] max-h-[450px] object-contain rounded-[30px] shadow-xl hover:scale-105 transition duration-500"
            />
          </div>

          <div className="flex flex-col justify-center">
            
            <p className="uppercase tracking-[4px] text-[var(--primary)] text-sm mb-2">
              Lilyra Collection
            </p>

            <h1 className="text-4xl font-bold text-[var(--primary)] mb-3">
              {product.name}
            </h1>

           
            <p className="text-3xl font-bold text-[var(--primary)] mb-4">
              ${product.price}
            </p>

            <hr className="border-[#e8d5c9] mb-6" />

            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {product.description}
            </p>

            {/* Features */}
            <div className="text-gray-500 text-sm mb-8 space-y-2">
              <p>✓ Free Shipping</p>
              <p>✓ Secure Payment</p>
              <p>✓ 30-Day Return Policy</p>
            </div>

            {/* Add to Cart */}
            <button
              className="bg-[var(--primary)] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[var(--primary-dark)] hover:scale-105 transition duration-300 w-fit flex items-center gap-2"
             onClick={() => {
  if (!user) {
    navigate("/Login");
    return;
  } else {
    addToCard(product.id);
  }
}}
            >
              <BiCart size={22} />
              Add to Cart {productQuantityLable}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}