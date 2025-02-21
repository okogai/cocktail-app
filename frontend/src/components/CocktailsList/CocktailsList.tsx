import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { CardMedia, CircularProgress, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { Cocktail, User } from '../../typed';
import { deleteCocktail, fetchCocktails, publishCocktail } from '../../store/thunks/cocktailThunk.ts';
import { useAppDispatch } from '../../app/hooks.ts';

interface Props {
  user: User | null;
  cocktails: Cocktail[] | null;
  loading: boolean;
  publishLoading: boolean;
}

const CocktailsList: React.FC<Props> = ({user, cocktails, loading, publishLoading}) => {
  const dispatch = useAppDispatch();

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
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {cocktails && cocktails.map((cocktail) => (
          <Grid size={4} key={cocktail._id}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                alt={cocktail.title}
                height="300"
                sx={{padding: 3}}
                image={`http://localhost:8000/public/${cocktail.image}`}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%', }}>
                <Link to={`/cocktail/${cocktail._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="h6" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                    {cocktail.title}
                  </Typography>
                </Link>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2}}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: '100%',
                      gap: 2,
                    }}
                  >
                    {user?.role === "admin" && !cocktail.isPublished && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handlePublish(cocktail._id)}
                        disabled={publishLoading}
                      >
                        Publish
                      </Button>
                    )}
                    {user?.role === "admin" && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(cocktail._id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CocktailsList;
