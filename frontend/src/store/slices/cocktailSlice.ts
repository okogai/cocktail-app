import { Cocktail, GlobalError } from '../../typed';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createCocktail } from '../thunks/cocktailThunk.ts';

interface CocktailsState {
  cocktails: Cocktail[] | null;
  fetchCocktailsLoading: boolean;
  createLoading: boolean;
  error: GlobalError | null;
}

const initialState: CocktailsState = {
  cocktails: null,
  fetchCocktailsLoading: false,
  createLoading: false,
  error: null,
};

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktails.createLoading;

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
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;

