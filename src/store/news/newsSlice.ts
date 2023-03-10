import { RootState } from '..';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NewsObject = {
  id: number;
  by: string;
  descendants: number;
  kids : number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

type NewsState = {
  newsList: NewsObject[];
}

export const initialState: NewsState = {
  newsList: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,

  reducers: {
    addNews(
      state: NewsState,
      action: PayloadAction<NewsObject>
    ) {
      state.newsList.push(action.payload);
    },
    deleteNews(
      state: NewsState,
      action: PayloadAction<NewsObject[]>
    ) {
      state.newsList = action.payload;
    },
  },
});


export const { addNews, deleteNews } = newsSlice.actions;
export default newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.newsList;