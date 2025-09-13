import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiMail,
  FiHome,
  FiList,
  FiShoppingCart,
  FiGrid,
} from "react-icons/fi";

function Footer() {
  const { theme } = useSelector((state) => state.theme);

  const footerClass =
    theme === "dark"
      ? "bg-[#0D1164] text-white"
      : "bg-[#AED6CF] text-black";

  const linkHoverClass =
    theme === "dark"
      ? "hover:text-[#AED6CF] transition-colors"
      : "hover:text-[#0D1164] transition-colors";

  return (
    <footer
      className={`w-full mt-12 py-10 px-6 shadow-inner ${footerClass} transition-all duration-300`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left Side - Logo + Info */}
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img
              src="/ChatGPT Image Sep 7, 2025, 09_49_06 AM.png"
              alt="Shakti Logo"
              className="w-12 h-12 object-cover rounded-full shadow-lg"
            />
            <h2 className="text-xl font-bold">
              Shakti Restaurant
            </h2>
          </div>
          <p className="text-sm opacity-80">
            Near Bus Stand, Bhrugupur • Serving since 2021
          </p>
        </div>

        {/* Center - Navigation */}
        <nav className="flex flex-col md:flex-row gap-5 text-sm font-semibold items-center">
          <Link to="/" className={`flex items-center gap-2 ${linkHoverClass}`}>
            <FiHome /> Home
          </Link>
          <Link to="/cart" className={`flex items-center gap-2 ${linkHoverClass}`}>
            <FiList /> Menu
          </Link>
          <Link to="/orders" className={`flex items-center gap-2 ${linkHoverClass}`}>
            <FiShoppingCart /> Orders
          </Link>
          <Link to="/contact" className={`flex items-center gap-2 ${linkHoverClass}`}>
            <FiGrid /> Contact
          </Link>
        </nav>

        {/* Right Side - Socials */}
        <div className="flex gap-5 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className={linkHoverClass}
          >
            <FiFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className={linkHoverClass}
          >
            <FiInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className={linkHoverClass}
          >
            <FiTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={linkHoverClass}
          >
            <FiGithub />
          </a>
          <a
            href="mailto:shaktirestaurant@gmail.com"
            className={linkHoverClass}
          >
            <FiMail />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-opacity-40 mt-8 pt-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Shakti Restaurant. All rights reserved.
      </div>
    </footer>
  );
}

export default memo(Footer);
