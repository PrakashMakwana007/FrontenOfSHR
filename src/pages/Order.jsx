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

  const handleStatusChange = (id, status) => dispatch(updateOrderStatus({ id, status }));
  const handleDelete = (id) => window.confirm("Are you sure?") && dispatch(deleteOrder(id));
  const handleCancelOrder = (id) => window.confirm("Cancel this order?") && dispatch(updateOrderStatus({ id, status: "cancelled" }));

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered": return "bg-green-500 text-white";
      case "pending": return "bg-yellow-500 text-white";
      case "cancelled": return "bg-red-500 text-white";
      case "processing": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className={`p-6 min-h-screen transition-colors ${theme === "dark" ? "bg-gradient-to-r from-blue-950 to-purple-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-3xl font-bold mb-6">{user?.role === "admin" ? "All Orders (Admin)" : "My Orders"}</h1>

      {loading && <p className="text-center">Loading orders...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && orders.length === 0 && <p className="text-gray-500 text-center">No orders found.</p>}

      <div className="overflow-x-auto mt-4">
        <table className={`min-w-full border rounded-2xl shadow-md divide-y divide-gray-300 dark:divide-gray-700 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <thead>
            <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} text-left rounded-t-2xl`}>
              <th className="p-3 rounded-tl-2xl">#</th>
              {user?.role === "admin" && <th className="p-3">Customer</th>}
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Address</th>
              <th className="p-3">Status</th>
              <th className="p-3 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id} className={`border-t transition-all hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
                <td className="p-3">{idx + 1}</td>
                {user?.role === "admin" && <td className="p-3 font-semibold">{order.user?.Name || "Unknown"}</td>}
                <td className="p-3">{order.items.map((i, id) => <div key={id}>{i.menuItem?.name}</div>)}</td>
                <td className="p-3 font-semibold">₹{order.totalPrice}</td>
                <td className="p-3">{order.paymentMethod}</td>
                <td className="p-3">{order.address}</td>

                <td className="p-3">
                  {user?.role === "admin" ? (
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`border rounded px-2 py-1 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-lg text-sm ${getStatusClass(order.status)}`}>{order.status}</span>
                  )}
                </td>

                <td className="p-3 flex gap-2">
                  {user?.role === "admin" && <button onClick={() => handleDelete(order._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">Delete</button>}
                  {user?.role !== "admin" && (
                    <>
                      {order.status !== "cancelled" && <button onClick={() => handleCancelOrder(order._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">Cancel</button>}
                      <button onClick={() => handleDelete(order._id)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
