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
import { Box, Typography } from '@mui/material';

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

  if (cocktails === null || cocktails.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        marginTop={5}
      >
        <Typography variant="h4" gutterBottom>
          There are no cocktails to display yet
        </Typography>
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