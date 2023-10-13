import logo from './logo.svg';
import './App.css';
// import Navbar from './components/navbar';
import Taible from './components/taible';
import AllComponents from './components/allComponennts';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
function App() {
  const [isLoging,setISLogin]=useState(true)
  const [token,setToken]=useState()
  const Navigate=useNavigate()
  const location =useLocation()
  useEffect(()=>{
    let token = localStorage.getItem('admin_token')
    setToken(token)
    token&& token.length>150?setISLogin(false):setISLogin(true)
    !token?Navigate('/login'):location.pathname=='/login'?Navigate('/'):Navigate(location.pathname)
  },[token])
  return (<>  
   {/* <Navbar/>
   <Taible/> */}
   
   {/* {isLoging ?<> <Routes> <Route path ='/login' element={<SignIn/>}  /> </Routes>  </> : <AllComponents />} */}
   <AllComponents/>
   
   </>
  );
}

export default App;
