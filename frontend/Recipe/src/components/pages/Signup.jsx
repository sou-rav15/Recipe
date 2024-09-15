import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Signup.css"; // Your custom CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    username: "",
  });

  const [checkbox, setCheckbox] = useState(false);
const navigate= useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckBox = () => {
    setCheckbox(!checkbox);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!checkbox){
      return HandleError('You must have to accept terms and conditions');
    }
    const { email, password ,username,fullname} = formData;
    if (!email || !password||!username||!fullname) {
      // setError('All details are required');
      // setShowError(true);
      console.log('all details are required');
      
      return ;
    }
    try {
      const url = `http://localhost:3000/register`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      const {success,message,error}=data;
console.log('data->',data);
if(success){
 
  setTimeout(()=>{
    navigate('/Login')
  },1000)
}
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
      <p className="small text-muted">
            <Link to="/" className="signup-link">Home</Link>
          </p>
        <h1>Create an Account</h1>
        <p>Sign up to start sharing your favorite recipes with the community!</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="fullname">FullName</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
           <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
         
          
          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              checked={checkbox}
              onChange={handleCheckBox}
              required
            />
            <label htmlFor="terms">
              I agree to the{" "}
              <NavLink to="/Terms&conditions" className="terms-link">
                terms and conditions
              </NavLink>
            </label>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
          <p className="small text-muted">
            Already have an account?
            <Link to="/Login" className="signup-link">Log in</Link>
          </p>
        </form>

        <div className="divider">
          <hr />
          <p>OR</p>
          <hr />
        </div>
        
        <button className="signup-btn google-signup">Sign Up with Google</button>
      </div>
    </div>
  );
};

export default Signup;
