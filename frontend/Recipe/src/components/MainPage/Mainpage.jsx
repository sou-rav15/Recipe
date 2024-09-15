
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import { Link, useNavigate } from 'react-router-dom';
import { FaComment, FaShareSquare, FaThumbsUp, FaUser } from 'react-icons/fa'; // Import FaUser from react-icons
import './Mainpage1.css'; // Import your CSS file

function Mainpage() {
  const [recipes, setRecipes] = useState([]); // useState for storing recipes
  const navigate= useNavigate();
// Logout function
const handleLogout = () => {
  localStorage.removeItem('token'); 
  localStorage.removeItem('userId'); 
  localStorage.removeItem('username'); 
  localStorage.removeItem('loggedInUser'); 

  navigate('/'); 
};


  // useEffect for fetching recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sharerecipe'); // Replace with your API endpoint
        setRecipes(response.data);
        console.log(response.data)
        // console.log(recipes[0]._id);
        
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <button>Home</button>
          <button>Categories</button>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search recipes..." />
        </div>
        <div className="navbar-right">
          <div className="profile-dropdown">
            {/* FaUser icon */}
            <FaUser className="navbar-profile" size={30} style={{ color: '#f17713' }} />
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
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

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
const RecipeCard =  ({ recipe }) => {
  const [likes, setlikes]=useState(0);
  const [unlike, setunlike]=useState(false);
  const recipeId=recipe._id;
 

  useEffect(() => {
    // Fetch the number of likes (assuming this is available from the API)
    const fetchLikes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/sharerecipe/${recipeId}`);
        const data = await response.json();
        setlikes(data.likes || 0); // Set initial likes from the API
      } catch (error) {
        console.error("Failed to fetch recipe likes", error);
      }
    };

    fetchLikes();
  }, [recipeId,unlike]);
  const handlelikes= async(e)=>{
    e.preventDefault();
    const userId = localStorage.getItem('userId'); 
      // if(!unlike){
      //   setlikes(likes+1);
      //   console.log('1');
       
      //   setunlike(true);
      //   console.log('1');
        
      // }
      // else{
      //   setlikes(likes-1);
      //   setunlike(false);
       
        
      // };

    try {
      await fetch(`http://localhost:3000/favourite/${recipeId}/likes`, { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
       });
    
      
    } catch (error) {
      console.error("Failed to like the post", error);
      setlikes(likes - 1); 
    }
  
    }
    
  return (
    <div style={{
      padding:'15px'
    }}>
       <div className="recipe-card" style={{
     
    }}>
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

  
      <div className="recipe-footer" style={{
        display:'flex',
      }}>
      
        <button className="button" onClick={handlelikes}>
        <FaThumbsUp className="icon" style={{
       color:'#f17713',
        }} /> <span style={{color:'black'}}>{likes}</span>
      </button>
      <button className="button">
        <FaShareSquare className="icon" 
        style={{
          color:'#f17713',
           }}
        /> 
      </button>
      <button className="button">
        <FaComment className="icon"
        style={{
          color:'#f17713',
           }}
        /> 
      </button>
      </div>
    </div>
    </div>
   
  );
};

export default Mainpage;
