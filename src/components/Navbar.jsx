import React from 'react'
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import "../pages/Home.css"

const Navbar = () => {
  const[cookies,setCookies]=useCookies(["access_token"]);
  const Navigate=useNavigate();
  const logout=()=>{
   setCookies("access_token","");
   window.localStorage.removeItem("userID");
   Navigate("/auth");
  //When logout is clicked accesstoken is removed from cookies and user id is removed from local storage
  //And Then navigating to auth page

  }
  return (
    <div className="navbar">
    <Link to="/">Home</Link>
    <Link to="/createrecipie">CreateRecipie</Link>    
   
    {!cookies.access_token?( <Link to="/auth">Login/Register</Link>):(
      <>
       <Link to="/saverecipie">Saved Recipie</Link>
      <button onClick={logout}>Logout</button>
      </>
    )}
    <Link to="/about">AboutUs</Link>
   
    </div>
  )
}

export default Navbar