import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../store/menuSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);
  const { theme } = useSelector((state) => state.theme);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "Thali",
    available: true,
    image: null,
  });

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("category", newItem.category);
    formData.append("available", newItem.available);
    if (newItem.image) formData.append("image", newItem.image);

    dispatch(createMenuItem(formData));
    setNewItem({ name: "", description: "", price: "", category: "Thali", available: true, image: null });
  };

  const handleUpdate = (id, field, value) => dispatch(updateMenuItem({ id, updateData: { [field]: value } }));
  const handleDelete = (id) => { if (confirm("Are you sure?")) dispatch(deleteMenuItem(id)); };

  const categories = ["Thali", "Items", "Cold Drink", "Ice Cream"];

  // Helper for input styles
  const inputStyle = `w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
    theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-400" : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-400"
  }`;

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-wide">Admin Dashboard</h1>

      {/* --- Form Section --- */}
      <motion.form
        onSubmit={handleCreate}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-12 p-6 md:p-10 rounded-3xl shadow-2xl transition-colors ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center tracking-wide">Add New Menu Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, lodu: e.target.value })} className={inputStyle} required />
          <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className={inputStyle} required />
          <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className={inputStyle}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className={`${inputStyle} md:col-span-2 h-28 resize-none`} />
          
          {/* Image Upload */}
          <div className="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-orange-400 transition-colors relative">
            <input type="file" accept="image/*" onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            {newItem.image ? <img src={URL.createObjectURL(newItem.image)} alt="preview" className="w-32 h-32 object-cover rounded-xl mb-2 shadow-md" /> : <p className="text-gray-400 dark:text-gray-300 text-center">Click or Drag & Drop an Image</p>}
          </div>

          <button type="submit" className="col-span-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-md">
            Add Menu Item
          </button>
        </div>
      </motion.form>

      {/* --- Menu Items --- */}
      {loading ? <p className="text-center text-lg">Loading...</p> :
        error ? <p className="text-red-600 text-center">{error}</p> :
          categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-5 tracking-wide">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.filter(item => item.category === category).map(item => (
                  <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className={`flex flex-col items-center p-4 rounded-2xl shadow-lg gap-3 transition-colors hover:shadow-2xl ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                    {item.image ? <img src={`/${item.image}`} alt={item.name} className="w-32 h-32 object-cover rounded-xl shadow-md" /> : <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-xl text-gray-500">No Image</div>}
                    <h3 className="font-semibold text-lg text-center">{item.name}</h3>
                    <input type="number" value={item.price} onChange={(e) => handleUpdate(item._id, "price", e.target.value)} className={`border p-2 rounded w-24 text-center bg-transparent ${theme === "dark" ? "border-gray-700 text-gray-200" : "border-gray-300 text-gray-900"}`} />
                    <div className="flex items-center gap-2">
                      <label>Available:</label>
                      <input type="checkbox" checked={item.available} onChange={(e) => handleUpdate(item._id, "available", e.target.checked)} />
                    </div>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-xl transition-all transform hover:scale-105 shadow-md">
                      Delete
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
      }
    </div>
  );
}
