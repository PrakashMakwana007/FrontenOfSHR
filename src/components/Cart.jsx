import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, memo } from "react";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { createOrder } from "../store/orderSlice";

// 🛒 Cart Item (memoized)
const CartItem = memo(({ item, onUpdate, onRemove, theme }) => (
  <div
    className={`flex justify-between items-center p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 ${
      theme === "dark" ? "bg-[#1B1464] text-white" : "bg-[#D6F5E1] text-black"
    }`}
  >
    <div>
      <p className="font-semibold text-lg">{item.name}</p>
      <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
        ₹{item.price} x {item.quantity}
      </p>
    </div>
    <div className="flex items-center gap-3">
      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => onUpdate(item._id, parseInt(e.target.value))}
        className="w-16 text-center border rounded p-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={() => onRemove(item._id)}
        className="text-red-500 hover:text-red-700 font-semibold transition"
      >
        Remove
      </button>
    </div>
  </div>
));

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { theme } = useSelector((state) => state.theme);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Load pop sound
  const popSound = new Audio("/pop-39222.mp3"); 

  const handleUpdateQuantity = useCallback(
    (_id, quantity) => {
      if (quantity > 0) dispatch(updateQuantity({ _id, quantity }));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (_id) => dispatch(removeFromCart(_id)),
    [dispatch]
  );

  const handlePlaceOrder = useCallback(() => {
    if (!address) return alert("Please enter delivery address!");
    if (!paymentMethod) return alert("Please select payment method!");

    const orderData = {
      items: items.map((i) => ({ menuItem: i._id, quantity: i.quantity })),
      totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      paymentMethod,
      address,
    };

    popSound.play().catch(() => {});
    dispatch(createOrder(orderData));
    dispatch(clearCart());
    alert("Order placed successfully!");
  }, [items, address, paymentMethod, dispatch, popSound]);

  return (
    <div
      className={`p-6 max-w-3xl mx-auto transition-colors ${
        theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#E8F8F5] text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center tracking-wide">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className={`text-center text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdate={handleUpdateQuantity}
              onRemove={handleRemoveItem}
              theme={theme}
            />
          ))}

          {/* Address & Payment */}
          <div
            className={`p-6 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] ${
              theme === "dark" ? "bg-[#1B1464] text-white" : "bg-[#D6F5E1] text-black"
            }`}
          >
            <input
              type="text"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-[#1B1464] text-white border-gray-600 focus:ring-purple-500"
                  : "bg-[#D6F5E1] text-black border-gray-300 focus:ring-green-400"
              }`}
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={`w-full border p-3 rounded mb-6 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-[#1B1464] text-white border-gray-600 focus:ring-purple-500"
                  : "bg-[#D6F5E1] text-black border-gray-300 focus:ring-green-400"
              }`}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>

            <button
              onClick={handlePlaceOrder}
              className={`w-full py-3 rounded-xl font-bold text-lg shadow-xl transition-transform transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Cart);
