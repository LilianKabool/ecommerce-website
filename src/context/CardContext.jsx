import { createContext, useContext, useState ,useEffect  } from "react";
import { getProductById } from "../data/Products";


const CardContext = createContext();

export default function CardProvider({ children }) {

   const [cardItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    return JSON.parse(savedCart);
  }

  return [];
});
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cardItems));
}, [cardItems]);

    function addToCard(productId) {
        const existing = cardItems.find((item) => item.id === productId);
        console.log(...cardItems);
        if (existing) {

            const currentQuantity = existing.quantity;
            const updatedCardItems = cardItems.map((item) => item.id === productId ?
                { ...item, quantity: currentQuantity + 1 } : item);
            setCartItems(updatedCardItems);
        }
        else {

            setCartItems([...cardItems, { id: productId, quantity: 1 }]);
        }
    }

    function getCartItemsWithProducts() {
        return cardItems.map(
            item => ({ 
                ...item, product: getProductById(item.id)
             })).filter(item => item.product);
    }
function removeFromCart(productId) {
setCartItems(cardItems.filter(item=>(item.id  !== productId)));

}

function updateQuantity(productId, quantity) {
if(quantity <= 0){
    removeFromCart(productId);
    return ;
}
setCartItems(
    cardItems.map((item)=>(
        item.id === productId ?
         {...item, quantity} : item)));
}
    return (
        <CardContext.Provider value={{ cardItems, addToCard  , getCartItemsWithProducts , removeFromCart , updateQuantity}}>
            {children}
        </CardContext.Provider >
    );
}

export function UseCard() {
    const context = useContext(CardContext);
    return context;
}