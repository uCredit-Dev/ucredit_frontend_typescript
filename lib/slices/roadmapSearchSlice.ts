import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

type roadmapSearchStates = {
  searchText: string;
  searchTagsText: string;
  searchTags: Array<string>;
  searchTagsSearchType: string;
  searchMajorText: string;
  mobileAdvSearch: boolean;
};

const initialState: roadmapSearchStates = {
  searchText: '',
  searchTagsText: '',
  searchTags: [],
  searchTagsSearchType: 'or',
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
    updateSearchTags: (state: any, action: PayloadAction<Array<string>>) => {
      state.searchTags = action.payload;
    },
    updateSearchTagsSearchType: (state: any, act: PayloadAction<string>) => {
      state.searchTagsSearchType = act.payload;
      console.log(state.searchTagsSearchType);
    },
    updateSearchMajorText: (state: any, action: PayloadAction<String>) => {
      state.searchMajorText = action.payload;
    },
    toggleMobileAdvSearch: (state: any) => {
      state.mobileAdvSearch = !state.mobileAdvSearch;
    },
  },
});

export const {
  updateSearchText,
  updateSearchTagsText,
  updateSearchMajorText,
  toggleMobileAdvSearch,
  updateSearchTags,
  updateSearchTagsSearchType,
} = roadmapSearchSlice.actions;

export const selectSearchText = (state: RootState) =>
  state.roadmapSearch.searchText;
export const selectSearchTagsText = (state: RootState) =>
  state.roadmapSearch.searchTagsText;
export const selectSearchMajorText = (state: RootState) =>
  state.roadmapSearch.searchMajorText;
export const selectMobileAdvSearch = (state: RootState) =>
  state.roadmapSearch.mobileAdvSearch;
export const selectSearchTags = (state: RootState) =>
  state.roadmapSearch.searchTags;
export const selectSearchTagsSearchType = (state: RootState) =>
  state.roadmapSearch.searchTagsSearchType;

export default roadmapSearchSlice.reducer;
