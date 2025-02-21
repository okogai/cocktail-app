import { Route, Routes } from "react-router-dom";
import NavBar from "./components/UI/NavBar/NavBar.tsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.tsx";
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import CocktailForm from './containers/CocktailForm.tsx';
import AllCocktails from './containers/AllCocktails.tsx';


const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<AllCocktails />} />
        <Route path="/add-cocktail" element={<CocktailForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
