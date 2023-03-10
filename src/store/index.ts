import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './news/newsSlice';

const store = configureStore({
    reducer: {
        news: newsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;