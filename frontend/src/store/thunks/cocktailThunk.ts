import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailMutation, GlobalError } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';
import { isAxiosError } from 'axios';

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  "cocktails/fetchCocktails",
  async () => {
    const response = await axiosAPI.get(`/cocktails`);
    return response.data;
  },
);

export const createCocktail = createAsyncThunk<void, CocktailMutation>
("cocktails/createCocktail", async (cocktailMutation) => {
  const formData = new FormData();

  const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];

  keys.forEach((key) => {
    const value = cocktailMutation[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosAPI.post("/cocktails", formData);
});

export const publishCocktail = createAsyncThunk<void, string>(
  "cocktails/publishCocktail",
  async (id: string) => {
    await axiosAPI.patch(`cocktails/${id}/togglePublished`);
  },
);

export const deleteCocktail = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  "cocktails/deleteCocktail", async (id: string, { rejectWithValue }) => {
  try {
    await axiosAPI.delete(`cocktails/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
