import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiLogIn,
  FiLogOut,
  FiMoon,
  FiSun,
  FiHome,
  FiList,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toggleTheme } from "../store/theamSlice";
import { logoutUser } from "../store/authSlice";
import { successToast } from "../utils/toast";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ===== Updated Theme Colors =====
  const headerClass =
    theme === "dark"
      ? "bg-[#0D1164] text-white shadow-lg" 
      : "bg-[#AED6CF] text-black shadow-lg"; 

  const sidebarClass =
    theme === "dark"
      ? "bg-[#0D1164] text-white"
      : "bg-[#AED6CF] text-black";

  const menuHoverClass =
    theme === "dark"
      ? "hover:bg-[#1A1F8C] rounded-lg px-2 py-1 transition" 
      : "hover:bg-[#96CFC2] rounded-lg px-2 py-1 transition";

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        successToast("Logged out successfully!");
        navigate("/login");
      });
  };

  return (
    <div className={`font-sans ${theme === "dark" ? "dark" : ""}`}>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-3 ${headerClass} transition-all duration-300`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            <FiMenu />
          </button>
          <img
            src="/ChatGPT Image Sep 7, 2025, 09_49_06 AM.png"
            alt="Shakti Logo"
            className="w-8 h-8 object-cover rounded-full"
          />
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold tracking-wide">
            Shakti Restaurant
          </h1>
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <button
              onClick={handleLogout}
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${menuHoverClass}`}
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${menuHoverClass}`}
            >
              <FiLogIn /> Login
            </Link>
          )}
        </div>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 80 }}
            className={`fixed top-14 left-0 h-[calc(100%-4rem)] w-60 z-50 p-6 flex flex-col gap-6 shadow-2xl ${sidebarClass} transition-all`}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end text-2xl mb-4 focus:outline-none hover:text-red-500"
            >
              <FiX />
            </button>

            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <nav className="flex flex-col gap-2">
              <Link to="/" className={`flex items-center gap-2 ${menuHoverClass}`}>
                <FiHome /> HOME
              </Link>
              <Link to="/cart" className={`flex items-center gap-2 ${menuHoverClass}`}>
                <FiList /> MENU
              </Link>
              <Link to="/orders" className={`flex items-center gap-2 ${menuHoverClass}`}>
                <FiShoppingCart /> ORDERS
              </Link>
            </nav>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full bg-white/20 hover:bg-gray-200 hover:text-black transition"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="pt-16" />
    </div>
  );
}

export default memo(Header);
