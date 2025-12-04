import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    return id;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;