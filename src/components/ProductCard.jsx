import { Link } from "react-router-dom";
import { UseCard } from "../context/CardContext";
import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ product }) {
  const { cardItems, addToCard } = UseCard();
const { user } = UseAuth();
  const navigate = useNavigate();
  const productInCard = cardItems.find(
    (item) => item.id === product?.id
  );

  const productQuantityLable = productInCard
    ? ` (${productInCard.quantity})`
    : "";

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#5c4033] mb-2">
          {product.name}
        </h3>

        <p className="text-2xl font-bold text-[var(--primary)] mb-5">
          ${product.price}
        </p>

        <div className="flex gap-3">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 text-center py-2 rounded-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
          >
            Details
          </Link>

          <button
            onClick={()=>{ if (!user) {
    navigate("/Login");
    return;
  } else {
    addToCard(product.id);
  }}
            
        }
            className="flex-1 py-2 rounded-full bg-[var(--primary)] text-white hover:bg-[#b67d57] transition-all duration-300"
          >
            Add {productQuantityLable}
          </button>
        </div>
      </div>
    </div>
  );
}