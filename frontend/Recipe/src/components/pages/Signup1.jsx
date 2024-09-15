import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Signup1 = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    username: '',
    password: '',
  });
  
  const [checkbox, setCheckbox] = useState(false);

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckBox = () => {
    setCheckbox(!checkbox);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData, checkbox);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center" style={{ borderRadius: '15px' }}>
        <div className="col-lg-5 col-md-7 col-sm-9 col-12">
          <div className="card p-4 shadow" style={{ borderRadius: '15px', backgroundColor: '#fff8f0' }}>
            <h2 className="text-center" style={{ fontFamily: 'Cursive', color: '#e85d04' }}>
              Welcome to RecipeShare!
            </h2>
            <p className="text-center" style={{ color: '#6c757d' }}>
              Share your favorite recipes and discover delicious ideas from fellow food lovers.
            </p>

            <button className="btn btn-block mb-3" style={{ backgroundColor: '#ff9f1c', color: 'white', fontWeight: 'bold' }}>
              Sign up with Google
            </button>

            <div className="text-center mb-3" style={{ fontWeight: 'bold', color: '#e85d04' }}>OR</div>

            <form onSubmit={handlesubmit}>
              <input
                onChange={handlechange}
                name="email"
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                style={{ borderRadius: '10px' }}
                required
              />
              <input
                onChange={handlechange}
                name="fullname"
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
                style={{ borderRadius: '10px' }}
                required
              />
              <input
                onChange={handlechange}
                name="username"
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                style={{ borderRadius: '10px' }}
                required
              />
              <input
                onChange={handlechange}
                name="password"
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                style={{ borderRadius: '10px' }}
                required
              />

              <div className="form-check checkbuttons">
                <div className="form-check-container">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checkbox}
                    id="flexCheckDefault"
                    onChange={handleCheckBox}
                    required
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    I agree to the{' '}
                    <NavLink to="/Terms&conditions" className="terms-link ms-1">
                      terms and conditions
                    </NavLink>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-block mb-3" style={{ backgroundColor: '#e85d04', color: 'white', fontWeight: 'bold', borderRadius: '10px' }}>
                Sign up
              </button>
              <p className="small text-muted">
            Already have an account?
            <Link to="/Signup1" className="signup-link">Sign up</Link>
          </p>
            </form>

            <small className="text-center d-block mt-3" style={{ color: '#6c757d' }}>
              By signing up, you agree to our{' '}
              <Link href="#" style={{ color: '#e85d04' }}>
                Terms
              </Link>{' '}
              and{' '}
              <Link href="#" style={{ color: '#e85d04' }}>
                Privacy Policy
              </Link>.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup1;
