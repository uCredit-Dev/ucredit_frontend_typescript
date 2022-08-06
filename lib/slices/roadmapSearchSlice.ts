import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { M } from 'msw/lib/glossary-297d38ba';
import { RootState } from '../appStore/store';

type roadmapSearchStates = {
  searchText: string;
  searchTagsText: string;
  searchMajorText: string;
  mobileAdvSearch: boolean;
};

const initialState: roadmapSearchStates = {
  searchText: '',
  searchTagsText: '',
  searchMajorText: '',
  mobileAdvSearch: false,
};

export const roadmapSearchSlice = createSlice({
  name: 'roadmapSearch',
  initialState,
  reducers: {
    updateSearchText: (state: any, action: PayloadAction<String>) => {
      state.searchText = action.payload;
    },
    updateSearchTagsText: (state: any, action: PayloadAction<String>) => {
      state.searchTagsText = action.payload;
    },
    updateSearchMajorText: (state: any, action: PayloadAction<String>) => {
      state.searchMajorText = action.payload;
    },
    toggleMobileAdvSearch: (state: any) => {
      state.mobileAdvSearch = !state.mobileAdvSearch;
    },
  },
});

export const { updateSearchText, updateSearchTagsText, updateSearchMajorText, toggleMobileAdvSearch } =
  roadmapSearchSlice.actions;

export const selectSearchText = (state: RootState) =>
  state.roadmapSearch.searchText;
export const selectSearchTagsText = (state: RootState) =>
  state.roadmapSearch.searchTagsText;
export const selectSearchMajorText = (state: RootState) =>
  state.roadmapSearch.searchMajorText;
export const selectMobileAdvSearch = (state: RootState) =>
  state.roadmapSearch.mobileAdvSearch;

export default roadmapSearchSlice.reducer;
