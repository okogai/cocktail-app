import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { CocktailMutation } from '../typed';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import FileInput from '../components/UI/FileInput/FileInput.tsx';
import { createCocktail } from '../store/thunks/cocktailThunk.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreateCocktailLoading } from '../store/slices/cocktailSlice.ts';

const initialState = {
  title: "",
  description: "",
  ingredients: '',
  image: null,
};

const CocktailForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CocktailMutation>(initialState);
  const [filename, setFilename] = useState("");
  const [ingredients, setIngredients] = useState<{name: string; amount: number}[]>([]);
  const loading = useAppSelector(selectCreateCocktailLoading);
  const dispatch = useAppDispatch();

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      setFilename(files[0].name);
    }
  };

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createCocktail({...form, ingredients: JSON.stringify(ingredients)}));
    navigate('/my-cocktails');
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const addIngredient = () => {
    setIngredients(prev => [...prev, {name: '', amount: 0}]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_ing, i) => i !== index));
  };

  const onChangeIngredientsInputs = (i: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target;
    setIngredients(ingredients.map((ing, index) => {
      const ingCopy = {
        ...ingredients[i],
        [name]: value,
      };

      if (index === i) return ingCopy;

      return ing;
    }));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper"
        }}
      >
        <Typography component="h1" variant="h5">
          Create Cocktail
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3, width: '100%' }}>
          <Grid container direction="column" spacing={2}>
            <Grid size={12}>
              <TextField
                id="title"
                name="title"
                label="Title"
                required
                fullWidth
                value={form.title}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid size={12} container spacing={2} >
              <Typography variant="body1">Ingredients</Typography>
              {ingredients.map((_ing, i) => (
                <Grid container spacing={2} key={i} alignItems="center">
                  <Grid size={5}>
                    <TextField
                      name="name"
                      label="Name"
                      required
                      fullWidth
                      onChange={e => onChangeIngredientsInputs(i, e)}
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      name="amount"
                      label="Amount"
                      required
                      fullWidth
                      onChange={e => onChangeIngredientsInputs(i, e)}
                    />
                  </Grid>
                  <Grid size={2}>
                    {ingredients.length > 1 && (
                      <Button type="button" onClick={() => deleteIngredient(i)}>X</Button>
                    )}
                  </Grid>
                </Grid>
              ))}
              <Button type="button" onClick={addIngredient} sx={{ mt: 2 }}>+ Add new ingredient</Button>
            </Grid>
            <Grid size={12}>
              <TextField
                name="description"
                id="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                required
                value={form.description}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid size={12}>
              <FileInput
                name="image"
                label="Image"
                filename={filename}
                onChange={fileInputChangeHandler}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, alignSelf: 'center' }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create"
              )}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CocktailForm;