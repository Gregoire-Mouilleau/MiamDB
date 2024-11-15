import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true); 
  const [loadingCategories, setLoadingCategories] = useState(true); 
  const [loadingIngredients, setLoadingIngredients] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors de la récupération des recettes");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.meals.slice(0, 6));
        setLoadingRecipes(false); 
        console.log("Recettes:", data.meals);
      })
      .catch((error) => {
        setError(error.message);
        setLoadingRecipes(false);
        console.error("Erreur lors de la récupération des recettes:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors de la récupération des catégories");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data.categories.slice(0, 6));
        setLoadingCategories(false); 
        console.log("Catégories:", data.categories);
      })
      .catch((error) => {
        setError(error.message);
        setLoadingCategories(false);
        console.error("Erreur lors de la récupération des catégories:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors de la récupération des ingrédients");
        }
        return response.json();
      })
      .then((data) => {
        setIngredients(data.meals.slice(0, 6));
        setLoadingIngredients(false); 
        console.log("Ingrédients:", data.meals);
      })
      .catch((error) => {
        setError(error.message);
        setLoadingIngredients(false);
        console.error("Erreur lors de la récupération des ingrédients:", error);
      });
  }, []);

  return (
    <div className="homepage">
      <h1>Welcome to the MiamDB App</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="section">
        <h2>Popular Recipes</h2>
        <div className="cards-container">
          {loadingRecipes ? (
            <p>Loading recipes...</p>
          ) : (
            recipes.map((recipe) => (
              <div className="card" key={recipe.idMeal}>
                <img
                  className="card-img"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
                <h3>{recipe.strMeal}</h3>
                <Link to={`/recipe/${recipe.idMeal}`} className="button">
                  See Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="section">
        <h2>Categories</h2>
        <div className="cards-container">
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            categories.map((category) => (
              <div className="card" key={category.strCategory}>
                <img
                  className="card-img"
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                />
                <h3>{category.strCategory}</h3>
                <Link to={`/category/${category.strCategory}`} className="button">
                  See Recipes
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="section">
        <h2>Ingredients</h2>
        <div className="cards-container">
          {loadingIngredients ? (
            <p>Loading ingredients...</p>
          ) : (
            ingredients.map((ingredient) => (
              <div className="card" key={ingredient.strIngredient}>
                <img
                  className="card-img"
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
                  alt={ingredient.strIngredient}
                />
                <h3>{ingredient.strIngredient}</h3>
                <Link to={`/ingredient/${ingredient.strIngredient}`} className="button">
                  See Recipes
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
