import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, memo } from "react";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { createOrder } from "../store/orderSlice";

// 🛒 Cart Item (memoized)
const CartItem = memo(({ item, onUpdate, onRemove, theme }) => (
  <div
    className={`flex justify-between items-center border p-4 rounded-lg shadow-sm transition ${
      theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#AED6CF] text-black"
    }`}
  >
    <div>
      <p className="font-semibold">{item.name}</p>
      <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
        ₹{item.price} x {item.quantity}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => onUpdate(item._id, parseInt(e.target.value))}
        className="w-16 text-center border rounded p-1"
      />
      <button
        onClick={() => onRemove(item._id)}
        className="text-red-500 hover:text-red-700 transition"
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
  const popSound = new Audio("/public/pop-39222.mp3"); 

  const handleUpdateQuantity = useCallback(
    (_id, quantity) => {
      if (quantity > 0) dispatch(updateQuantity({ _id, quantity }));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (_id) => {
      dispatch(removeFromCart(_id));
    },
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

    // Play pop sound
    popSound.play().catch((err) => console.log(err));

    dispatch(createOrder(orderData));
    dispatch(clearCart());
    alert("Order placed successfully!");
  }, [items, address, paymentMethod, dispatch, popSound]);

  return (
    <div
      className={`p-6 max-w-3xl mx-auto transition-colors ${
        theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#AED6CF] text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {items.length === 0 ? (
        <p className={theme === "dark" ? "text-gray-300 text-center" : "text-gray-700 text-center"}>
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-4">
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
            className={`mt-6 p-4 rounded-lg shadow-md transition ${
              theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#AED6CF] text-black"
            }`}
          >
            <input
              type="text"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full border p-2 rounded mb-3 ${
                theme === "dark" ? "bg-[#0D1164] text-white border-gray-700" : "bg-[#AED6CF] text-black border-gray-300"
              }`}
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={`w-full border p-2 rounded mb-4 ${
                theme === "dark" ? "bg-[#0D1164] text-white border-gray-700" : "bg-[#AED6CF] text-black border-gray-300"
              }`}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>

            <button
              onClick={handlePlaceOrder}
              className={`w-full py-3 rounded-lg font-semibold shadow-lg transition ${
                theme === "dark" ? "bg-[#AED6CF] text-black hover:opacity-90" : "bg-[#0D1164] text-white hover:opacity-90"
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
