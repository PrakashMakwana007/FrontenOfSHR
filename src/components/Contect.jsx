import { useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { FiMail, FiUser, FiMessageSquare, FiSend } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

function Contact() {
  const { theme } = useSelector((state) => state.theme);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inputClass =
    theme === "dark"
      ? "bg-[#0D1164] border border-[#AED6CF] text-white placeholder-gray-400"
      : "bg-[#AED6CF] border border-[#0D1164] text-black placeholder-gray-600";

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const subject = encodeURIComponent(`Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Hello Shakti Restaurant,\n\nMy name is ${form.name}.\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );

      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=shaktirestaurant@gmail.com&su=${subject}&body=${body}`,
        "_blank"
      );
    },
    [form]
  );

  return (
    <div
      className={`max-w-3xl mx-auto my-16 p-6 rounded-2xl shadow-xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-[#0D1164] text-white"
          : "bg-[#AED6CF] text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        📩 Contact Us
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex items-center gap-2">
          <FiUser className="text-lg" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`w-full px-4 py-2 rounded-lg outline-none ${inputClass}`}
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <FiMail className="text-lg" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={`w-full px-4 py-2 rounded-lg outline-none ${inputClass}`}
            required
          />
        </div>

        {/* Message */}
        <div className="flex items-start gap-2">
          <FiMessageSquare className="mt-2 text-lg" />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className={`w-full px-4 py-2 rounded-lg outline-none ${inputClass}`}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold shadow-lg transition ${
            theme === "dark"
              ? "bg-[#AED6CF] text-black hover:opacity-90"
              : "bg-[#0D1164] text-white hover:opacity-90"
          }`}
        >
          <FiSend /> Send via Gmail
        </button>
      </form>

      {/* Instagram Button */}
      <div className="flex justify-center mt-10">
        <motion.a
          href="https://www.instagram.com/prakash_makwana_012/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.15, rotate: 8 }}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition ${
            theme === "dark" ? "bg-[#AED6CF] text-black" : "bg-[#0D1164] text-white"
          }`}
        >
          <FaInstagram size={26} />
        </motion.a>
      </div>
    </div>
  );
}

export default memo(Contact);
