import { UseCard } from "../context/CardContext";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
  const {
    getCartItemsWithProducts,
    updateQuantity,
    removeFromCart,
  } = UseCard();

  const CartItems = getCartItemsWithProducts();
const navigate = useNavigate();
  const total = CartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[var(--background)] py-10 px-4">
  <button
          onClick={() => navigate("/home")}
          className="mb-6 text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] transition"
        >
          ← Back to Home
        </button>

      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[var(--primary)] text-center mb-10">
          Your Shopping Bag 
        </h1>

        <div className="bg-[var(--card)] p-8 md:p-10 rounded-[35px] shadow-2xl">

          {/* Empty Cart */}
          {CartItems.length === 0 ? (
            <div className="text-center py-16">

              <h2 className="text-3xl text-[var(--primary)] mb-4">
                Your bag is empty 
              </h2>

              <p className="text-gray-500">
                Discover our collection and find your style.
              </p>

            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-8">
                Order Summary
              </h2>

              {CartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 py-6 border-b border-[#eee]"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full sm:w-[120px] h-[220px] sm:h-[120px] object-cover rounded-[20px] shadow-md"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-main)] mb-2">
                      {item.product.name}
                    </h3>

                    <p className="text-[var(--primary)] font-bold text-lg">
                      ${item.product.price}
                    </p>
                  </div>

                  {/* Quantity + Price */}
                  <div className="flex flex-col items-start sm:items-end gap-3">

                    <div className="flex items-center gap-3">

                      <button
                        className="w-9 h-9 rounded-full bg-[#f7eee7] text-[var(--primary)] font-bold hover:bg-[#e7d6c8] transition"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span className="min-w-[30px] text-center font-semibold text-[var(--text-main)]">
                        {item.quantity}
                      </span>

                      <button
                        className="w-9 h-9 rounded-full bg-[#f7eee7] text-[var(--primary)] font-bold hover:bg-[#e7d6c8] transition"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>

                    </div>

                    <p className="font-bold text-[var(--primary)] text-xl">
                      $
                      {(
                        item.product.price * item.quantity
                      ).toFixed(2)}
                    </p>

                    <button
                      className="text-red-400 hover:text-red-600 font-medium transition"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="border-t mt-8 pt-6">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-bold text-[var(--text-main)]">
                    Total
                  </h2>

                  <span className="text-3xl font-bold text-[var(--primary)]">
                    ${total.toFixed(2)}
                  </span>

                </div>

             

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}