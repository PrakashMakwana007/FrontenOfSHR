Shakti Hotel - Frontend

This is the frontend of the Shakti Hotel Food Delivery app.
It is built with React, Redux Toolkit, Tailwind CSS, and Framer Motion for animations.
The frontend connects with the backend (Node.js + Appwrite/MongoDB) to provide a complete food ordering experience.

🚀 Features

📖 Menu Listing – Users can browse all food items

🛒 Cart System – Add, update, or remove items from cart

🛍️ Order Management – Place orders and track them

👨‍🍳 Admin Panel – Manage menu items & orders

🎨 Modern UI – Tailwind CSS + Framer Motion animations

🌙 Dark/Light Mode toggle

🔐 Authentication (Login & Register)

🔔 Notifications for order updates

⚡ Lazy loading & optimized performance

🛠️ Tech Stack

Frontend: React (Vite), Redux Toolkit, Tailwind CSS, Framer Motion

Backend: Node.js, Express, Appwrite / MongoDB

Deployment: Vercel (frontend) & Render (backend)

📂 Project Structure
frontend/
│── public/            # Static assets (images, icons, etc.)
│── src/
│   ├── components/    # Navbar, Cart, MenuItem, etc.
│   ├── pages/         # Pages (Home, Menu, Cart, Orders, Admin, etc.)
│   ├── store/         # Redux slices (menuSlice, cartSlice, orderSlice, userSlice)
│   ├── utils/         # API instance, helpers
│   ├── App.jsx        # Main app file
│   └── main.jsx       # Entry point
│── .env               # Environment variables
│── package.json
│── tailwind.config.js
│── vite.config.js
└── README.md

⚙️ Setup
1️⃣ Clone the repository
git clone <frontend-repo-url>
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory:

VITE_BACKEND_URL=https://your-backend-url.com/api

4️⃣ Run locally
npm run dev

5️⃣ Build for production
npm run build

🌍 Deployment

Frontend (React): Deployed on Vercel

Backend (Node/Express): Deployed on Render

🤝 Contributing

Fork the repo

Create a feature branch (git checkout -b feature-name)

Commit changes (git commit -m "Added feature")

Push to branch (git push origin feature-name)

Open a Pull Request

📜 License

This project is licensed under the MIT License.
