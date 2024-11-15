import React from 'react';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';  
import RecipeDetail from './components/RecipeDetail'; 
import CategoryRecipesPage from './pages/CategoryRecipesPage';  
import IngredientRecipesPage from './pages/IngredientsPage';  
import SearchResultsPage from './pages/SearchResultsPage';
import Header from './components/Header';  
import RandomRecipePage from './pages/RandomRecipePage';  

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/category/:categoryName" element={<CategoryRecipesPage />} />
        <Route path="/ingredient/:ingredientName" element={<IngredientRecipesPage />} />
        <Route path="/recipes/search/:query" element={<SearchResultsPage />} />
        <Route path="/random-recipe" element={<RandomRecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
