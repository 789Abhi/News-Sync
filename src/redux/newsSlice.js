import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch news data from an API
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=267bdc4f934340108e0e06e0ce308060'); // Replace with your API URL
  const data = await response.json();
  return data.articles; // Adjust based on the API response structure
});

// New async thunk for search functionality
export const searchNews = createAsyncThunk('news/searchNews', async (searchTerm) => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=267bdc4f934340108e0e06e0ce308060`);
  const data = await response.json();
  return data.articles; // Adjust based on the API response structure
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    searchResults: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    searchStatus: 'idle',
    error: null,
    searchError: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Top Headlines
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Search News
      .addCase(searchNews.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      });
  },
});

export const { clearSearchResults } = newsSlice.actions;
export default newsSlice.reducer;