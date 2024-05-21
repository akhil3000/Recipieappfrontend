import React,{useState} from 'react'
import axios from 'axios';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import Footer from './Footer';
export const Auth = () => {
  return (
    <>
    <div className="auth">
     <Login/>
     <Register/>
    
    </div>
    <div>
     <Footer/>
     </div>
     </>
  )
}


const Login=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const[_,setCookies]=useCookies(["access_token"])
    const navigate=useNavigate()

    const onSubmit= async(event)=>{
     
      event.preventDefault();
      try{
      const response=await axios.post("http://localhost:3000/auth/login",{
          username,
          password,
        });//from frontend we are passing login credentials to backend if they are correct we will
        //recieve jwt token it is stored in response variable
        setCookies("access_token",response.data.token);//setting access token to cookies from jwt token
        window.localStorage.setItem("userID",response.data.userID);//setting userid to local storage
        navigate("/");//Then navigating to home page
      }catch(err){
        console.error(err);

      }
    }

  return<Form 
  username={username}
  setUsername={setUsername}
  password={password}
  setPassword={setPassword}
  label="Login"
  onSubmit={onSubmit}

/>
};

const Register=()=>{
     const [username,setUsername]=useState("");
     const [password,setPassword]=useState("");

     const onSubmit=async(event)=>{
       event.preventDefault();
        try{
          await axios.post("http://localhost:3000/auth/register",{
            username,
            password,
          });//Passing User credentials to Backend
          alert("Registration Completed!Now login");
        }catch(err){
          console.error(err);

        }
     };

 return<Form 
   username={username}
   setUsername={setUsername}
   password={password}
   setPassword={setPassword}
   label="Register"
   onSubmit={onSubmit}
 
 />
};

const Form=({username,setUsername,password,setPassword,label,onSubmit})=>{
  return(
   <div>
    <div className="auth-container">
    <form onSubmit={onSubmit}>
     <h2>{label}</h2>   
     <div className="form-group">
        <label>Username:</label>
        <input type="text" id="username" value={username} onChange={(event)=>{
            setUsername(event.target.value);
        }}/>    
           
    </div>

    <div className="form-group">
        <label>Password:</label>
        <input type="password" id="username" value={password} onChange={(event)=>{
            setPassword(event.target.value);
        }}/>    
           
    </div>


    <button type="submit">Register</button>
    </form> 

    </div>


</div>
  )
}

