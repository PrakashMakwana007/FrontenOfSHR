import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/Api.js";
import { successToast, errorToast } from "../utils/toast.js";

// ------------------------
// Async Thunks
// ------------------------

// Fetch all menu items
export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/menus");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch menu item by ID
export const fetchMenuById = createAsyncThunk(
  "menu/fetchMenuById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/menus/${id}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new menu item (admin)
export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async (menuData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/menus", menuData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      successToast("Menu item created successfully!");
      return data.data;
    } catch (err) {
      errorToast(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update menu item (admin)
export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      let payload;

      // if updating with file (image), use FormData
      if (updateData instanceof FormData) {
        payload = updateData;
      } else {
        payload = new FormData();
        Object.keys(updateData).forEach((key) => {
          payload.append(key, updateData[key]);
        });
      }

      const { data } = await axiosInstance.put(`/menus/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      successToast("Menu item updated successfully!");
      return data.data;
    } catch (err) {
      errorToast(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete menu item (admin)
export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/menus/${id}`);
      successToast("Menu item deleted successfully!");
      return id;
    } catch (err) {
      errorToast(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ------------------------
// Slice
// ------------------------

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    currentItem: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMenuError: (state) => {
      state.error = null;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch one
      .addCase(fetchMenuById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchMenuById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenuError, clearCurrentItem } = menuSlice.actions;
export default menuSlice.reducer;
