import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

type roadmapSearchStates = {
  searchText: string;
  mobileAdvSearch: boolean;
};

const initialState: roadmapSearchStates = {
  searchText: '',
  mobileAdvSearch: false,
};

export const roadmapSearchSlice = createSlice({
  name: 'roadmapSearch',
  initialState,
  reducers: {
    updateSearchText: (state: any, action: PayloadAction<String>) => {
      state.searchText = action.payload;
    },
    toggleMobileAdvSearch: (state: any) => {
      state.mobileAdvSearch = !state.mobileAdvSearch;
    },
  },
});

export const { updateSearchText, toggleMobileAdvSearch } =
  roadmapSearchSlice.actions;

export const selectSearchText = (state: RootState) =>
  state.roadmapSearch.searchText;
export const selectMobileAdvSearch = (state: RootState) =>
  state.roadmapSearch.mobileAdvSearch;

export default roadmapSearchSlice.reducer;
