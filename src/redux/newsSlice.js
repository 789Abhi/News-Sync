import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch news data from an API
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=267bdc4f934340108e0e06e0ce308060'); // Replace with your API URL
  const data = await response.json();
  return data.articles; // Adjust based on the API response structure
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    filteredNews: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
        state.filteredNews = action.payload.slice(0, 3); // Keep only 3 latest news articles
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
