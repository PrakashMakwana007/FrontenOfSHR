import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { fetchMenu } from "../store/menuSlice";
import { addToCart } from "../store/cartSlice";
import { FiShoppingCart } from "react-icons/fi";

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector((state) => state.menu);
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const { items: cartItems } = useSelector((state) => state.cart);

  const [quantities, setQuantities] = useState({});
  const [addedItemId, setAddedItemId] = useState(null);

  const cartSound = new Audio("/sounds/cart-sound.mp3");

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleQuantityChange = (id, value) => {
    if (value < 1) value = 1;
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddToCart = (item) => {
    if (!user) return alert("Please login to add items to the cart!");
    const quantity = quantities[item._id] || 1;
    dispatch(addToCart({ ...item, quantity }));

    setAddedItemId(item._id);
    setTimeout(() => setAddedItemId(null), 500);

    cartSound.play();
    if (navigator.vibrate) navigator.vibrate(100);
  };

  const containerClass =
    theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#F0FFF4] text-black";

  const cardClass =
    theme === "dark" ? "bg-[#1B1464] text-white shadow-2xl" : "bg-white shadow-lg";

  const buttonClass =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white"
      : "bg-gradient-to-r from-green-400 to-teal-400 hover:opacity-90 text-white";

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className={`p-6 min-h-screen transition-colors ${containerClass}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">Our Menu</h1>

        <div className="flex items-center gap-4">
          {user?.role === "admin" && (
            <Link
              to="/admin/menu"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + Add Item
            </Link>
          )}

          {user && (
            <button
              onClick={() => navigate("/cart-order")}
              className="relative p-3 text-xl bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 transition"
            >
              <FiShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      {items.length === 0 ? (
        <p className="text-center text-lg">No menu items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 20px 30px rgba(0,0,0,0.2)" }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden ${cardClass} ${
                addedItemId === item._id ? "ring-4 ring-green-400" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full h-48 flex items-center justify-center rounded-xl mb-4 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Info */}
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm mb-2 line-clamp-2">{item.description || "No description"}</p>
              <p className="font-bold text-lg">₹{item.price}</p>

              {/* Sold Out Overlay */}
              {!item.isAvailable && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl rounded-2xl">
                  Sold Out
                </div>
              )}

              {/* Quantity & Add */}
              {user?.role !== "admin" && item.isAvailable && (
                <>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, (quantities[item._id] || 1) - 1)
                      }
                      className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantities[item._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 text-center border rounded"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, (quantities[item._id] || 1) + 1)
                      }
                      className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`mt-4 w-full py-2 rounded-lg font-semibold ${buttonClass}`}
                  >
                    🛒 Add to Cart
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
