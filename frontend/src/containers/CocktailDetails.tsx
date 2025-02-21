import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectCocktail, selectfetchCocktailsLoading } from '../store/slices/cocktailSlice.ts';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchCocktailById, rateCocktail } from '../store/thunks/cocktailThunk.ts';
import { Box, Card, CardContent, CardMedia, Typography, Rating, CircularProgress, Container } from '@mui/material';
import { selectUser } from '../store/slices/userSlice.ts';

const CocktailDetails = () => {
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectCocktail);
  const loading = useAppSelector(selectfetchCocktailsLoading);
  const user = useAppSelector(selectUser);
  const { id } = useParams();
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCocktailById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (cocktail?.rating && user) {
      const userPreviousRating = cocktail.rating.find((r) => r.user === user._id)?.rate || null;
      setUserRating(userPreviousRating);
    }
  }, [cocktail, user]);

  const handleRate = (event: React.SyntheticEvent, value: number | null) => {
    event.preventDefault();

    if (value !== null && id && user) {
      dispatch(rateCocktail({ cocktailId: id, rate: value }));
      setUserRating(value);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      {cocktail ? (
        <Card sx={{ maxWidth: 600, boxShadow: 3, borderRadius: 3, padding: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={`http://localhost:8000/public/${cocktail.image}`}
            alt={cocktail.title}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="div" fontWeight="bold">
              {cocktail.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              {cocktail.description}
            </Typography>

            <Typography variant="h6" mt={2}>
              Ingredients:
            </Typography>
            <ul>
              {cocktail.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    {ingredient.name} - {ingredient.amount}
                  </Typography>
                </li>
              ))}
            </ul>

            {user && (
                <>
                  <Typography variant="h6" mt={2} sx={{ mt: 5, alignSelf: 'center' }}>
                    Rating:
                  </Typography>
                  <Rating
                    name="cocktail-rating"
                    value={userRating ?? 0}
                    onChange={handleRate}
                    size="large"
                    sx={{ alignSelf: 'center' }}
                  />
                </>
              )}
              </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Cocktail not found
        </Typography>
      )}
    </Box>
  );
};

export default CocktailDetails;