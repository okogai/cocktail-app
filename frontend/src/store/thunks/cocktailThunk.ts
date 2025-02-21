import { createAsyncThunk } from '@reduxjs/toolkit';
import { CocktailMutation} from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';


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