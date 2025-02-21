import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import {
  selectCocktails,
  selectCreateCocktailLoading,
  selectPublishCocktailLoading
} from '../store/slices/cocktailSlice.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import CocktailsList from '../components/CocktailsList/CocktailsList.tsx';
import { useEffect } from 'react';
import { deleteCocktail, fetchCocktails, publishCocktail } from '../store/thunks/cocktailThunk.ts';

const AllCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectCreateCocktailLoading);
  const publishLoading = useAppSelector(selectPublishCocktailLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const handlePublish = async (cocktailId: string) => {
    if (user?.role === "admin") {
      await dispatch(publishCocktail(cocktailId));
      await dispatch(fetchCocktails());
    }
  };

  const handleDelete = async (cocktailId: string) => {
    await dispatch(deleteCocktail(cocktailId));
    await dispatch(fetchCocktails());
  };

  return (
    <>
      <CocktailsList
        user={user}
        cocktails={cocktails}
        loading={loading}
        publishLoading={publishLoading}
        handlePublish={handlePublish}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AllCocktails;