
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import { Link } from 'react-router-dom';
import { FaComment, FaShareSquare, FaThumbsUp, FaUser } from 'react-icons/fa'; // Import FaUser from react-icons
import './Mainpage1.css'; // Import your CSS file

function Recipe() {
  const [recipes, setRecipes] = useState([]); // useState for storing recipes

  // useEffect for fetching recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sharerecipe'); // Replace with your API endpoint
        setRecipes(response.data);
        console.log(response.data)
        console.log(recipes[0].image);
        
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      {/* Navbar */}
      {/* <nav className="navbar">
        <div className="navbar-left">
          <button>Home</button>
          <button>Categories</button>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search recipes..." />
        </div>
        <div className="navbar-right">
          <div className="profile-dropdown">
         
            <FaUser className="profile" size={30} style={{ color: '#f17713' }} />
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="/my-recipes">
                    My Recipes
                  </Link>
                </li>
                <li>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="/favorites">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="/settings">
                    Settings
                  </Link>
                </li>
                <li>
                  <button>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav> */}
      

      {/* Main Content */}
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar-left">
          <ul>
            <li>My recipe</li>
            <li>Saved Recipes</li>
            <li>Favorites</li>
          </ul>
        </div>

        {/* Recipe Cards */}
        <div className="main-content">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
                
              <RecipeCard key={recipe.id} recipe={recipe} /> // Unique key
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </div>
    </>
  );
}

// RecipeCard component
const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-header">
        {/* Profile Avatar */}
        <img
          src={recipe.userAvatar || '/default-avatar.jpg'} // Dynamic image or fallback
          alt="Profile"
          className="profile-avatar"
        />
        <div className="username">{recipe.username}</div>
      </div>
      <img
  src={`http://localhost:3000${recipe.image || '/default-food.jpg'}`} // Use the backend URL
  alt={recipe.title}
  className="recipe-image"
/>

      {/* Recipe Body */}
      <div className="recipe-body">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
      </div>

      {/* Footer with Buttons */}
      <div className="recipe-footer">
        {/* <button>Like</button> */}
        <button className="button">
        <FaThumbsUp className="icon" /> Like
      </button>
      <button className="button">
        <FaShareSquare className="icon" /> Share
      </button>
      <button className="button">
        <FaComment className="icon" /> Comment
      </button>
      </div>
    </div>
  );
};

export default Recipe;
