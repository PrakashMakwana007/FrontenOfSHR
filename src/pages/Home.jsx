// src/pages/Home.jsx
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const features = [
  { title: "Delicious Menu", desc: "Explore a variety of cuisines: Gujarati, Punjabi, South Indian, and more." },
  { title: "Fast Delivery", desc: "Get your food delivered hot and fresh at your doorstep within minutes." },
  { title: "Easy Ordering", desc: "Simple and fast ordering process with secure payments." },
];

const galleryImages = [
  "/1 inside h.jpg",
  "/2 inside h.jpg",
  "/4 osen inside 4.jpg",
  "/44 app.jpeg",
];

export default function Home() {
  const { theme } = useSelector((state) => state.theme);

  const bgClass = theme === "dark" ? "bg-[#0D1164] text-white" : "bg-[#AED6CF] text-black";
  const cardClass = theme === "dark" ? "bg-[#0D1164]/90 text-white shadow-lg border border-orange-400 rounded-2xl" : "bg-white text-black shadow-md rounded-2xl";

  return (
    <div className={`min-h-screen w-full ${bgClass} px-6 py-10 space-y-12`}>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6"
      >
        <img 
          src="/main  pic.jpg" 
          alt="Shakti Restaurant" 
          className="w-full rounded-3xl shadow-xl object-cover max-h-[600px]" 
        />
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mt-4">
          Welcome to <span className="text-green-600 dark:text-orange-400">Shakti Restaurant</span>
        </h1>
        <p className="text-center max-w-3xl text-lg md:text-xl mt-2">
          Taste the best traditional and modern dishes with love. Order online, enjoy fast delivery, and explore our special offers!
        </p>
      </motion.div>

      {/* Owner Section */}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center p-6 bg-green-100 dark:bg-green-400 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-2">100% Vegetarian Food</h2>
        <p className="text-base md:text-lg">
          At Shakti Restaurant, all our dishes are completely vegetarian. We are committed to serving healthy, delicious, and wholesome meals prepared with fresh ingredients.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 150 }}
            className={`p-6 text-center ${cardClass}`}
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`Gallery ${idx + 1}`}
            whileHover={{ scale: 1.05 }}
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6 bg-orange-100 dark:bg-green-400 rounded-2xl shadow-md"
      >
        <img 
          src="/me.png" 
          alt="Owner" 
          className="w-48 h-48 object-cover rounded-full shadow-lg"
        />
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold">Meet the Owner</h2>
          <p className="text-base md:text-lg">
            Hi, I am <span className="font-semibold">Makwana</span>, a software developer who opened <span className="font-semibold">Shakti Restaurant</span> to bring delicious vegetarian food to the community.
          </p>
          <p className="text-sm md:text-base italic">
            "Passionate about technology and food, I combine creativity from both worlds to offer an amazing dining experience."
          </p>
        </div>
      </motion.div>

    </div>
  );
}
