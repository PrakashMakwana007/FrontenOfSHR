// AdminMenu.jsx
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../store/menuSlice";
import { motion } from "framer-motion";

function AdminMenu() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);
  const { theme } = useSelector((state) => state.theme);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Other",
    available: true,
    image: null,
    currentImage: null,
  });

  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Other",
      available: true,
      image: null,
      currentImage: null,
    });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "currentImage") return;
        if (key === "available") {
          data.append(key, formData.available ? "true" : "false");
        } else {
          data.append(key, formData[key]);
        }
      });
      dispatch(createMenuItem(data));
      resetForm();
    },
    [formData, dispatch, resetForm]
  );

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "currentImage") return;
        if (key === "image" && !formData.image) return;
        if (key === "available") {
          data.append(key, formData.available ? "true" : "false");
        } else {
          data.append(key, formData[key]);
        }
      });
      dispatch(updateMenuItem({ id: editingItem._id, updateData: data }));
      resetForm();
      setEditingItem(null);
    },
    [formData, editingItem, dispatch, resetForm]
  );

  const startEditing = useCallback((item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: item.category || "Other",
      available: item.available,
      image: null,
      currentImage: item.image,
    });
  }, []);

  const getImageUrl = useCallback(
    (img) => (!img ? null : img.startsWith("http") ? img : `${API_BASE}${img}`),
    [API_BASE]
  );

  // Single-color theme
  const gradients = useMemo(
    () =>
      theme === "dark"
        ? {
            bg: "bg-[#0D1164] text-white",
            card: "bg-[#0D1164] text-white",
            btnAdd: "bg-[#AED6CF] text-black",
            btnUpdate: "bg-[#AED6CF] text-black",
            btnDelete: "bg-red-600 text-white",
          }
        : {
            bg: "bg-[#AED6CF] text-black",
            card: "bg-[#AED6CF] text-black",
            btnAdd: "bg-[#0D1164] text-white",
            btnUpdate: "bg-[#0D1164] text-white",
            btnDelete: "bg-red-600 text-white",
          },
    [theme]
  );

  return (
    <div className={`p-6 min-h-screen transition-colors ${gradients.bg}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">
        🍴 Admin Menu Management
      </h1>

      {/* Form */}
      <form
        onSubmit={editingItem ? handleUpdate : handleSubmit}
        className={`p-6 rounded-2xl shadow-lg mb-8 transition ${gradients.card}`}
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingItem ? "Update Menu Item" : "Add New Menu Item"}
        </h2>

        {editingItem && formData.currentImage && !formData.image && (
          <div className="mb-3">
            <p className="text-sm mb-1">Current Image:</p>
            <img
              src={getImageUrl(formData.currentImage)}
              alt={formData.name}
              className="w-32 h-32 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          >
            <option>Gujarati</option>
            <option>Punjabi</option>
            <option>South Indian</option>
            <option>Chinese</option>
            <option>Snacks</option>
            <option>Other</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className={`${
              editingItem ? gradients.btnUpdate : gradients.btnAdd
            } px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition`}
          >
            {editingItem ? "Update Item" : "Add Item"}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                resetForm();
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Items */}
      {loading ? (
        <p>Loading menu...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.05 }}
              className={`shadow-lg rounded-2xl p-4 transition ${gradients.card}`}
            >
              {item.image ? (
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl mb-3 shadow"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm opacity-80 mb-1">
                {item.description || "No description"}
              </p>
              <p className="font-bold text-lg">₹{item.price}</p>
              <p className="text-sm">{item.category}</p>
              <p
                className={`text-sm mt-1 ${
                  item.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.available ? "Available" : "Not Available"}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => dispatch(deleteMenuItem(item._id))}
                  className={`${gradients.btnDelete} px-3 py-1 rounded-lg shadow hover:scale-105 transition`}
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditing(item)}
                  className={`${gradients.btnUpdate} px-3 py-1 rounded-lg shadow hover:scale-105 transition`}
                >
                  Update
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMenu;
