import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import {
  selectCocktails,
  selectDeleteCocktailLoading, selectfetchCocktailsLoading,
  selectPublishCocktailLoading
} from '../store/slices/cocktailSlice.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import { useEffect } from 'react';
import { fetchCocktailsByUser } from '../store/thunks/cocktailThunk.ts';
import CocktailsList from '../components/CocktailsList/CocktailsList.tsx';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectfetchCocktailsLoading);
  const publishLoading = useAppSelector(selectPublishCocktailLoading);
  const deleteLoading = useAppSelector(selectDeleteCocktailLoading);

  useEffect(() => {
    if (user) {
      dispatch(fetchCocktailsByUser(user._id));
    }
  }, [dispatch, user]);

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

export default MyCocktails;