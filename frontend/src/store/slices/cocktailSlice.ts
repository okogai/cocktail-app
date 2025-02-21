import { Cocktail, GlobalError } from '../../typed';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {
  createCocktail,
  fetchCocktailById,
  fetchCocktails,
  fetchCocktailsByUser,
  publishCocktail
} from '../thunks/cocktailThunk.ts';

interface CocktailsState {
  cocktail: Cocktail | null;
  cocktails: Cocktail[] | null;
  fetchCocktailsLoading: boolean;
  createLoading: boolean;
  publishLoading: boolean;
  error: GlobalError | null;
}

const initialState: CocktailsState = {
  cocktail: null,
  cocktails: null,
  fetchCocktailsLoading: false,
  createLoading: false,
  publishLoading: false,
  error: null,
};

export const selectCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktails.createLoading;
export const selectPublishCocktailLoading = (state: RootState) => state.cocktails.publishLoading;

export const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    clearCocktails: (state) => {
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
      .addCase(fetchCocktailsByUser.pending, (state) => {
        state.fetchCocktailsLoading = true;
      })
      .addCase(fetchCocktailsByUser.fulfilled,  (state, action) => {
        state.cocktails = action.payload;
        state.fetchCocktailsLoading = false;
      })
      .addCase(fetchCocktailsByUser.rejected, (state) => {
        state.fetchCocktailsLoading = false;
      })
      .addCase(fetchCocktailById.pending, (state) => {
        state.fetchCocktailsLoading = true;
      })
      .addCase(fetchCocktailById.fulfilled,  (state, action) => {
        state.cocktail = action.payload;
        state.fetchCocktailsLoading = false;
      })
      .addCase(fetchCocktailById.rejected, (state) => {
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
export const { clearCocktails } = cocktailsSlice.actions;
