import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
  return (
    <div>
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor:'#ff9f1c'}}>
        <div className="container">
          <a className="navbar-brand" href="#">RecipeBook</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Recipes</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Categories</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Submit Recipe</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section text-center" style={{ backgroundImage: 'url(/path-to-image.jpg)', padding: '100px 0', backgroundSize: 'cover', color: 'white' }}>
        <h1>Discover & Share Delicious Recipes</h1>
        <p>Your ultimate recipe sharing platform.</p>
        <a href="/explore" className="btn btn-lg btn-warning">Explore Recipes</a>
      </div>

      {/* Recipe Categories Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Explore by Category</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="/path-to-appetizer-image.jpg" className="card-img-top" alt="Appetizers" />
              <div className="card-body">
                <h5 className="card-title">Appetizers</h5>
                <a href="/categories/appetizers" className="btn btn-warning">Explore</a>
              </div>
            </div>
          </div>
          {/* Repeat for other categories */}
        </div>
      </div>

      {/* Featured Recipes Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Recipes</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="/path-to-recipe-image.jpg" className="card-img-top" alt="Recipe Name" />
              <div className="card-body">
                <h5 className="card-title">Recipe Name</h5>
                <p className="card-text">Brief description of the recipe...</p>
                <a href="/recipe/1" className="btn btn-warning">View Recipe</a>
              </div>
            </div>
          </div>
          {/* Repeat for other recipes */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="container p-4">
          <p>&copy; 2024 RecipeShare. All rights reserved.</p>
          <div>
            <a href="#" className="text-muted mx-2">Privacy Policy</a>
            <a href="#" className="text-muted mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
