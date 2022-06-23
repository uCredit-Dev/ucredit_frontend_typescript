import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

type roadmapSearchStates = {
  searchText: string
}

const initialState: roadmapSearchStates = {
  searchText: ""
}

export const roadmapSearchSlice = createSlice({
  name: 'roadmapSearch',
  initialState,
  reducers: {
    updateSearchText: (state: any, action: PayloadAction<String>) => {
      state.searchText = action.payload;
    }
  }
});

export const {
  updateSearchText
} = roadmapSearchSlice.actions;

export const selectSearchText = (state: RootState) => 
  state.roadmapSearch.searchText;

export default roadmapSearchSlice.reducer;