import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus, deleteOrder } from "../store/orderSlice";

export default function OrderPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (user) dispatch(getOrders());
  }, [dispatch, user]);

  const handleStatusChange = (id, status) =>
    dispatch(updateOrderStatus({ id, status }));
  const handleDelete = (id) =>
    window.confirm("Are you sure you want to delete this order?") &&
    dispatch(deleteOrder(id));
  const handleCancelOrder = (id) =>
    window.confirm("Cancel this order?") &&
    dispatch(updateOrderStatus({ id, status: "cancelled" }));

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "processing":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        theme === "dark"
          ? "bg-gradient-to-r from-blue-950 to-purple-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        {user?.role === "admin" ? "All Orders (Admin)" : "My Orders"}
      </h1>

      {loading && <p className="text-center text-lg">Loading orders...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {orders.map((order, idx) => (
          <div
            key={order._id}
            className={`p-5 rounded-2xl shadow-lg transition-transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-lg">Order #{idx + 1}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                  order.status
                )}`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>

            {user?.role === "admin" && (
              <p className="text-sm mb-2">
                <span className="font-semibold">Customer:</span>{" "}
                {order.user?.Name || "Unknown"}
              </p>
            )}

            <div className="mb-2">
              <span className="font-semibold">Items:</span>
              <ul className="list-disc list-inside">
                {order.items.map((i, id) => (
                  <li key={id}>{i.menuItem?.name}</li>
                ))}
              </ul>
            </div>

            <p className="mb-1">
              <span className="font-semibold">Total:</span> ₹{order.totalPrice}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Payment:</span> {order.paymentMethod}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Address:</span> {order.address}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {user?.role === "admin" && (
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`border rounded px-2 py-1 text-sm ${
                    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Delete
                </button>
              )}

              {user?.role !== "admin" && order.status !== "cancelled" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Cancel
                </button>
              )}

              {user?.role !== "admin" && (
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
