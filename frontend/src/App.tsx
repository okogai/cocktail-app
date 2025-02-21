import { Route, Routes } from "react-router-dom";
import NavBar from "./components/UI/NavBar/NavBar.tsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.tsx";
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import CocktailForm from './containers/CocktailForm.tsx';
import AllCocktails from './containers/AllCocktails.tsx';
import MyCocktails from './containers/MyCocktails.tsx';
import CocktailDetails from './containers/CocktailDetails.tsx';


const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<AllCocktails />} />
        <Route path="/cocktail/:id" element={<CocktailDetails />} />
        <Route path="/my-cocktails" element={<MyCocktails />} />
        <Route path="/add-cocktail" element={<CocktailForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
