import { Link } from "react-router-dom";
import { UseCard } from "../context/CardContext";
export default function ProductCard({ product }) {

    const { cardItems ,addToCard } = UseCard();
    const productInCard = cardItems.find((item) => item.id === product?.id);
    const productQuantityLable =productInCard ? `(${productInCard.quantity})` : ""; 
    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <img src={product.image} className="w-full h-[250px] object-cover" alt={product.name} />
            <div className="p-6">
                <h3 className="text-xl mb-2 text-[#333]">{product.name}</h3>
                <p className="text-2xl font-bold text-[#007bff] mb-4">{product.price}</p>
                <div className="flex gap-2">
                    <Link className="btn bg-[#6c757d] text-white hover:bg-[#545b62]" to={`/products/${product.id}`}>
                        View Details
                    </Link>
                    <button className="btn bg-[#007bff] text-white hover:bg-[#0056b3]"  onClick={()=>{addToCard(product?.id)}}>Add to Cart{productQuantityLable}</button>
                </div>
            </div>
        </div>
    )
}