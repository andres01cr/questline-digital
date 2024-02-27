import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SubscribersState, ActionTypes, AsyncActionTypes, Subscriber } from '../interfaces/types';

export const searchSubscribers = createAsyncThunk(
  AsyncActionTypes.SEARCH_SUBSCRIBERS_PENDING,
  async ({ pageIndex, searchTerm }: { pageIndex: number; searchTerm: string }) => {
    const response = await axios.get(`https://tech-test.questline.com/searchsubscribers?pageIndex=${pageIndex}&search=${searchTerm}`);
    return response.data;
  }
);

const initialState: SubscribersState = {
    subscribers: [],
    loading: false,
    error: null,
    pageIndex: 0,
    searchTerm: '',
    totalResults: 0,
    pageSize: 10,
};

const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setPageIndex(state, action) {
      state.pageIndex = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(searchSubscribers.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchSubscribers.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribers = action.payload.subscribers;
    });
    builder.addCase(searchSubscribers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'An error occurred';
    });
  },
});

export const { setSearchTerm, setPageIndex } = subscribersSlice.actions;

export default subscribersSlice.reducer;