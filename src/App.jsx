import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
import { getCurrentUser } from "./store/authSlice";
import Loader from "./components/Loader";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminDashboard = lazy(() => import("./pages/Dashbord"));
const Menu = lazy(() => import("./pages/Menu"));
const AdminMenu = lazy(() => import("./components/Admin.menu"));
const OrderPage = lazy(() => import("./pages/Order"));
const Cart = lazy(() => import("./components/Cart"));
const Contact = lazy(() => import("./components/Contect"));

import ProtectedRoute from "./components/ProtectRoutes";

export default function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken || localStorage.getItem("accessToken")) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, accessToken]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="cart" element={<Menu />} /> */}
          <Route path="contact" element={<Contact />} />

          {/* Protected User Routes */}
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart-order"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/menu"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminMenu />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
