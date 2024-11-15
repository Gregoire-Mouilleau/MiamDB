import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();

        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else {
          console.log("No categories found.");
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-page">
      <h1>Categories</h1>
      <div className="categories-container">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.idCategory} className="category-card">
              <Link to={`/category/${category.strCategory}`}>
                <button>{category.strCategory}</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
