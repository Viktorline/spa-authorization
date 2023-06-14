import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types/index';

const initialState = {
  entities: null as User | null,
  loading: 'idle',
  error: '' as String | undefined,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get('http://localhost:8080/about', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = 'idle';
        state.entities = payload;
      })
      .addCase(fetchUser.rejected, (state, { error }) => {
        state.loading = 'idle';
        state.error = error.message;
      });
  },
});

export default userSlice.reducer;
