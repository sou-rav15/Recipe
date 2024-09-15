import { useState } from 'react'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Login1 from './components/pages/Login1.jsx'
import Homepage from './components/Homepage/Homepage'
import Homepage1 from './components/Homepage/Homepage1'
import { Route, Routes } from 'react-router-dom'
import ShareRecipe from './components/ShareRecipe/ShareRecipe.jsx'
import ShareRecipe1 from './components/ShareRecipe/ShareRecipe1.jsx'
import Mainpage from './components/MainPage/Mainpage.jsx'
import Signup1 from './components/pages/Signup1.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'



function App() {


  return (
    <>
    {/* <Signup/> */}
       {/* <Login/> */}
       {/* <Login1/> */}
       {/* <Homepage/> */}
       {/* <Homepage1/> */}
       <Routes>
       <Route path='/'  element={<Homepage1 />}  />
       {/* <Route path='/About' element={<About />} /> */}
        <Route path='/Login' element={<Login />} />
        {/* <Route path='*' element={<ErrorPage />} /> */}
        <Route path='/Signup' element={<Signup />} />
        <Route path='/ShareRecipe' element={<ShareRecipe />} />
       
      
         <Route path='/mainpage' element={
          <ProtectedRoute>
             <Mainpage />
          </ProtectedRoute>
         } />
     
       </Routes>
    </>
  )
}

export default App
