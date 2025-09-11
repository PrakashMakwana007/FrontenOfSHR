import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice.js";
import { successToast, errorToast } from "../utils/toast.js";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { motion } from "framer-motion";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
    adminSecret: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.role === "admin" && !formData.adminSecret) {
      errorToast("Admin secret is required!");
      return;
    }

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        successToast("Account created successfully ✅");
        navigate("/login");
      })
      .catch((err) => {
        errorToast(err?.message || "Registration failed ❌");
      });
  };

  if (loading) return <Loader />;

  const containerClass =
    theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#AED6CF] text-black";

  const cardClass =
    theme === "dark"
      ? "bg-[#0D1164]/90 border border-orange-400 shadow-2xl shadow-orange-500/50 backdrop-blur-md text-white"
      : "bg-[#AED6CF]/90 border border-green-400 shadow-2xl shadow-green-500/50 backdrop-blur-md text-black";

  const inputClass =
    theme === "dark"
      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition rounded-lg w-full p-3"
      : "bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-green-400 focus:ring-1 focus:ring-green-400 transition rounded-lg w-full p-3";

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${containerClass}`}>
      <motion.div
        className={`w-full max-w-md p-8 rounded-3xl ${cardClass} hover:scale-105 transition-transform duration-300`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="Name"
            placeholder="Full Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={inputClass}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === "admin" && (
            <input
              name="adminSecret"
              type="text"
              placeholder="Enter Admin Secret"
              value={formData.adminSecret}
              onChange={handleChange}
              className={inputClass}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold ${
              theme === "dark"
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/50"
                : "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/50"
            } transition`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`${theme === "dark" ? "text-orange-400" : "text-green-700"} hover:underline`}
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
