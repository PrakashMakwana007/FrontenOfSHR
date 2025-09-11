import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/Api.js";
import { successToast, errorToast } from "../utils/toast.js";

// Create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/orders", orderData);
      successToast("Order placed successfully!");
      return data.data;
    } catch (err) {
      errorToast(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get orders (admin sees all, user sees own)
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/orders");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get single order by ID
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders/${id}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update order status (admin)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/orders/${id}`, { status });
      successToast("Order status updated!");
      return data.data;
    } catch (err) {
      errorToast(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/orders/${id}`);
      successToast("Order deleted successfully!");
      return id;
    } catch (err) {
      errorToast(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => { state.loading = false; state.orders.push(action.payload); })
      .addCase(createOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(getOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(getOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(getOrderById.pending, (state) => { state.loading = true; })
      .addCase(getOrderById.fulfilled, (state, action) => { state.loading = false; state.currentOrder = action.payload; })
      .addCase(getOrderById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateOrderStatus.pending, (state) => { state.loading = true; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map(o => o._id === action.payload._id ? action.payload : o);
      })
      .addCase(updateOrderStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteOrder.pending, (state) => { state.loading = true; })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(o => o._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
