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

  // ===== Theme Colors =====
  const headerClass =
    theme === "dark"
      ? "bg-[#0D1164] text-white shadow-lg"
      : "bg-[#AED6CF] text-black shadow-lg";

  const sidebarClass =
    theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#AED6CF] text-black";

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
      {/* ===== Header ===== */}
      <header
        className={`fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-4 sm:px-6 ${headerClass} transition-all duration-300`}
      >
        {/* Left: Logo + Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl focus:outline-none hover:scale-110 transition-transform"
          >
            <FiMenu />
          </button>
          <img
            src="/ChatGPT Image Sep 7, 2025, 09_49_06 AM.png"
            alt="Shakti Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>

        {/* Center: Restaurant Name */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-center flex-1">
          Shakti Restaurant
        </h1>

        {/* Right: Desktop Login/Logout */}
        <div className="hidden md:flex items-center gap-5">
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

      {/* ===== Sidebar (Mobile) ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dim Background */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className={`fixed top-20 left-0 h-[calc(100%-5rem)] w-64 z-50 p-6 flex flex-col shadow-2xl ${sidebarClass} transition-all`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="self-end text-2xl mb-6 focus:outline-none hover:text-red-500"
              >
                <FiX />
              </button>

              <h2 className="text-lg font-bold mb-4">Menu</h2>
              <nav className="flex flex-col gap-3">
                <Link
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 ${menuHoverClass}`}
                >
                  <FiHome /> HOME
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 ${menuHoverClass}`}
                >
                  <FiList /> MENU
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 ${menuHoverClass}`}
                >
                  <FiShoppingCart /> ORDERS
                </Link>
              </nav>

              {/* Login/Logout inside Sidebar (Mobile) */}
              <div className="mt-6 border-t pt-4">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg ${menuHoverClass}`}
                  >
                    <FiLogOut /> Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg ${menuHoverClass}`}
                  >
                    <FiLogIn /> Login
                  </Link>
                )}
              </div>

              {/* Theme Toggle (unique style) */}
              <div className="mt-auto flex justify-center">
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-green-700 text-white shadow-md hover:scale-110 transition-transform duration-300"
                >
                  {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for Header */}
      <div className="pt-20" />
    </div>
  );
}

export default memo(Header);
