import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import {
  selectCocktails,
  selectDeleteCocktailLoading, selectfetchCocktailsLoading,
  selectPublishCocktailLoading
} from '../store/slices/cocktailSlice.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import CocktailsList from '../components/CocktailsList/CocktailsList.tsx';
import { useEffect } from 'react';
import {  fetchCocktails } from '../store/thunks/cocktailThunk.ts';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const AllCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectfetchCocktailsLoading);
  const publishLoading = useAppSelector(selectPublishCocktailLoading);
  const deleteLoading = useAppSelector(selectDeleteCocktailLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  if (!user) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        marginTop={5}
      >
        <Typography variant="h5" gutterBottom>
          You need to log in to see the cocktails.
        </Typography>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Login page
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <>
      <CocktailsList
        user={user}
        cocktails={cocktails}
        loading={loading}
        publishLoading={publishLoading}
        deleteLoading={deleteLoading}
      />
    </>
  );
};

export default AllCocktails;