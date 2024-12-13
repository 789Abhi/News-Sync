import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper functions
const isDataFresh = (timestamp, maxAgeHours = 6) => {
  const currentTime = new Date().getTime();
  const maxAge = maxAgeHours * 60 * 60 * 1000;
  return currentTime - timestamp < maxAge;
};

const applyPreferences = (articles, preferences) => {
  return articles.filter(article => {
    const categoryMatch =
      preferences.categories.length === 0 ||
      preferences.categories.includes(article.category);

    const sourceMatch =
      preferences.sources.length === 0 ||
      preferences.sources.includes(article.source?.name);

    const authorMatch =
      preferences.authors.length === 0 ||
      preferences.authors.includes(article.author);

    return categoryMatch && sourceMatch && authorMatch;
  });
};

// Thunks
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ country = 'us' }, { rejectWithValue }) => {
    try {
      const cachedKey = `news_${country}`;
      const cachedData = localStorage.getItem(cachedKey);
      const cachedTimestamp = localStorage.getItem(`${cachedKey}_timestamp`);

      if (cachedData && cachedTimestamp && isDataFresh(parseInt(cachedTimestamp))) {
        return JSON.parse(cachedData);
      }

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=267bdc4f934340108e0e06e0ce308060`
      );
      const data = await response.json();

      if (data.articles) {
        localStorage.setItem(cachedKey, JSON.stringify(data.articles));
        localStorage.setItem(`${cachedKey}_timestamp`, new Date().getTime().toString());
      }

      return data.articles;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchNews = createAsyncThunk(
  'news/searchNews',
  async ({ searchTerm, country = 'all' }, { rejectWithValue }) => {
    try {
      const cachedSearchKey = `newsSearch_${country}_${searchTerm}`;
      const cachedSearch = localStorage.getItem(cachedSearchKey);
      const cachedTimestamp = localStorage.getItem(`${cachedSearchKey}_timestamp`);

      if (cachedSearch && cachedTimestamp && isDataFresh(parseInt(cachedTimestamp))) {
        return JSON.parse(cachedSearch);
      }

      const categories = [
        'business', 'entertainment', 'general',
        'health', 'science', 'sports', 'technology'
      ];

      const allSearchResults = [];

      for (const category of categories) {
        const apiUrl =
          country === 'all'
            ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
                searchTerm
              )}&category=${category}&pageSize=100&apiKey=267bdc4f934340108e0e06e0ce308060`
            : `https://newsapi.org/v2/everything?q=${encodeURIComponent(
                searchTerm
              )}&country=${country}&category=${category}&pageSize=100&apiKey=267bdc4f934340108e0e06e0ce308060`;

        for (let page = 1; page <= 3; page++) {
          const response = await fetch(`${apiUrl}&page=${page}`);
          const data = await response.json();

          if (data.articles) {
            const articlesWithCategory = data.articles.map(article => ({
              ...article,
              category: category.charAt(0).toUpperCase() + category.slice(1),
            }));
            allSearchResults.push(...articlesWithCategory);
          }

          await new Promise(resolve => setTimeout(resolve, 250));
        }
      }

      const uniqueSearchResults = Array.from(
        new Map(allSearchResults.map(article => [article.title, article])).values()
      );

      localStorage.setItem(cachedSearchKey, JSON.stringify(uniqueSearchResults));
      localStorage.setItem(`${cachedSearchKey}_timestamp`, new Date().getTime().toString());

      return uniqueSearchResults;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    searchResults: [],
    status: 'idle',
    searchStatus: 'idle',
    error: null,
    searchError: null,
    currentCountry: 'us',
    preferences: {
      categories: [],
      sources: [],
      authors: []
    }
  },
  reducers: {
    clearSearchResults: state => {
      state.searchResults = [];
      state.searchStatus = 'idle';
    },
    setCurrentCountry: (state, action) => {
      state.currentCountry = action.payload;
    },
    setUserPreferences: (state, action) => {
      state.preferences = action.payload;
    },
    clearUserPreferences: state => {
      state.preferences = { categories: [], sources: [], authors: [] };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(searchNews.pending, state => {
        state.searchStatus = 'loading';
        state.searchError = null;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.payload || action.error.message;
      });
  }
});

export const {
  clearSearchResults,
  setCurrentCountry,
  setUserPreferences,
  clearUserPreferences
} = newsSlice.actions;

export default newsSlice.reducer;
