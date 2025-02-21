import { Cocktail, GlobalError } from '../../typed';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createCocktail, fetchCocktails, publishCocktail } from '../thunks/cocktailThunk.ts';

interface CocktailsState {
  cocktails: Cocktail[] | null;
  fetchCocktailsLoading: boolean;
  createLoading: boolean;
  publishLoading: boolean;
  error: GlobalError | null;
}

const initialState: CocktailsState = {
  cocktails: null,
  fetchCocktailsLoading: false,
  createLoading: false,
  publishLoading: false,
  error: null,
};

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktails.createLoading;
export const selectPublishCocktailLoading = (state: RootState) => state.cocktails.publishLoading;

export const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.cocktails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCocktail.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCocktail.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchCocktailsLoading = true;
      })
      .addCase(fetchCocktails.fulfilled,  (state, action) => {
        state.cocktails = action.payload;
        state.fetchCocktailsLoading = false;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchCocktailsLoading = false;
      })
      .addCase(publishCocktail.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(publishCocktail.fulfilled,  (state) => {
        state.publishLoading = false;
      })
      .addCase(publishCocktail.rejected, (state) => {
        state.publishLoading = false;
      })
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;

