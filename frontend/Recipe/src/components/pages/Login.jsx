// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Login.css'; // Assuming you have a separate CSS file for custom styles

// function Login1() {
//   const [loginInfo, setloginInfo] = useState({
//     email: '',
//     password: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     setloginInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginInfo;
//     if (!email || !password) {
//       console.log('All details are required');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const url = `http://localhost:3000/login`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginInfo),
//       });
//       const data = await response.json();
//       console.log('data->',data);
      
//       const { success, jwtoken, fullname, username, userId } = data;
   
//       if (success) {
       
//         localStorage.setItem('token', jwtoken);
//         localStorage.setItem('loggedInUser', fullname);
//         localStorage.setItem('username', username);
//         localStorage.setItem('userId', userId);
       
//         navigate('/Mainpage'); // Redirect after successful login

//         setTimeout(() => {
//           setIsLoading(false); // Stop loading after timeout
//           navigate('/mainpage'); // Navigate to main page
//         }, 2000);
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">

//       <div className="login-container">

//       {isLoading ? ( // Show loading spinner if isLoading is true
//           <div className="loading">
//             <p>Loading...</p>
//             {/* You can replace this with a spinner or other loading animation */}
//           </div>
//         ) : (
//         <div className="login-card shadow-lg">
//           <h3>Welcome Back!</h3>
//           <p>Log in to continue sharing your favorite recipes!</p>
//           <form onSubmit={handlesubmit}>
//             <div className="form-group">
//               <input
//                 onChange={handleChange}
//                 name="email"
//                 type="email"
//                 className="form-control"
//                 placeholder="Email Address"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 onChange={handleChange}
//                 name="password"
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 required
//               />
//             </div>
//             <button type="submit" className="login-btn">Log in</button>
//           </form>
//           <p className="small text-muted" >
//             <Link to="#" style={{color:'#ff9f1c'}}>Forgot your password?</Link>
//           </p>
//           <div className="divider">
//             <hr />
//             <p>OR</p>
//             <hr />
//           </div>
//           <button className="google-login-btn">Log in with Google</button>
//           <p className="small text-muted">
//             Don't have an account?{' '}
//             <Link to="/Signup" className="signup-link">Sign up</Link>
//           </p>
//         </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login1;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have a separate CSS file for custom styles

function Login1() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false); // Track if error should be shown
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      setError('All details are required');
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setError(''); // Clear previous errors
    setShowError(false); // Hide error message before submitting

    try {
      const url = `http://localhost:3000/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();

      const { success, jwtoken, fullname, username, userId , message} = data;

      if (success) {
        localStorage.setItem('token', jwtoken);
        localStorage.setItem('loggedInUser', fullname);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);

        // Simulate loading time before navigation
        setTimeout(() => {
          setIsLoading(false); // Stop loading
          navigate('/Mainpage'); // Redirect after successful login
        }, 2000);
      } else {
        setError(message);
        setShowError(true); // Show error message
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An unexpected error occurred. Please try again.');
      setShowError(true); // Show error message
      setIsLoading(false);
    }
  };

  // Automatically hide the error message after a few seconds
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {isLoading ? (
          <div className="loading">
            <p>Loading...</p>
            {/* You can replace this with a spinner or other loading animation */}
          </div>
        ) : (
          <div className="login-card shadow-lg">
            <h3>Welcome Back!</h3>
            <p>Log in to continue sharing your favorite recipes!</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="login-btn">Log in</button>
            </form>
            <p className="small text-muted">
              <Link to="#" style={{ color: '#ff9f1c' }}>Forgot your password?</Link>
            </p>
            <div className="divider">
              <hr />
              <p>OR</p>
              <hr />
            </div>
            <button className="google-login-btn">Log in with Google</button>
            <p className="small text-muted">
              Don't have an account?{' '}
              <Link to="/Signup" className="signup-link">Sign up</Link>
            </p>
          </div>
        )}
        {showError && (
          <div className={`error-container ${showError ? 'error-show' : ''}`}>
            <p className="error-text">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login1;
