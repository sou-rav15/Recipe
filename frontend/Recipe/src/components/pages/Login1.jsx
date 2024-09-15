import React, { useState } from 'react'

import {Link, useNavigate} from 'react-router-dom'

function Login() {
const [loginInfo, setloginInfo]=useState({
  email:'',
  password:''
});
const navigate= useNavigate();
const handleChange=(e)=>{
e.preventDefault();
const {name,value}=e.target;
// setloginInfo(previnfo=> ({...previnfo, [name]:value}));
setloginInfo(prevInfo => ({
  ...prevInfo,
  [name]: value
}));

};
const handlesubmit=async(e)=>{
e.preventDefault();
const {email, password}=loginInfo;
console.log(password);
if(!email||!password){
  console.log('all details are required');
  
  return ;
}
try {
  const url=`http://localhost:3000/login`;
  const response = await fetch(url, 
    {
      method:'POST',
      headers:{
        'content-Type':'application/json',
      },
      body:JSON.stringify(loginInfo)
    });
    const data = await response.json();
    console.log('data->',data);
    const {success,message,jwtoken,fullname,error,username,userId}=data;
    console.log('success->',success);
    
    if(success){
  
      localStorage.setItem('token',jwtoken);
      localStorage.setItem('loggedInUser',fullname);
      localStorage.setItem('username',username);
      localStorage.setItem('userId',userId);
      // setTimeout(()=>{
      //   // navigate('/Problems')
      // },1000)
    }
    else if(error){
    
   
    }
} catch (error) {
  console.log('error is->',error);
  
}
}

  return (

    <>
      <div className="container mt-5">
        <div className="row justify-content-center  align-items-center">
          <div className="col-lg-5 col-mid-7 col-sm-9" style={{ borderRadius: '15px', backgroundColor: '' }} >
            <div className="card  shadow-lg border-0 rounded-lg text-center">
              <div className="card-body text-center">
              <h3 className="card-title mb-3">Welcome Back!</h3>
              <p className="text-muted">Log in to continue sharing your favorite recipes!</p>
              <form>
              <div className="form-group mb-3">
                  <input
                  onChange={handleChange}
                    name='email'
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                  onChange={handleChange}
                    name='password'
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="d-grid mb-3">
                  <button onClick={handlesubmit} className="btn btn-block" style={{ backgroundColor: '#e85d04', color: 'white', fontWeight: 'bold', borderRadius: '10px' }}>
                    Log in
                  </button>
                </div>
                <div>
                <span>   <a href="#" className="small text-muted">Forgot your password?</a>
              {/* <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/Signup'}> </NavLink> */}
            </span>
                </div>
              </form>
              <hr className="my-4" />
              <div className="buttons">
                <button className=" btn btn-block mb-3" style={{backgroundColor: '#ff9f1c', color: 'white', fontWeight: 'bold' }}>
                  Log in with Google
                </button>
              </div>
              <div className="div">
                <p className=" text-muted small">Don't have an account?
                <Link style={{ textDecoration: 'none', listStyle: 'none' }} to={'/Signup1'}> signup</Link>
                </p>
              </div>
              </div>
             
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Login;
