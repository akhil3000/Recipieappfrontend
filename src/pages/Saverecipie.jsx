import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from "react-cookie";
const Saverecipie = () => {

  const[recipies,setRecipies]=useState([]);
  const userID=useGetUserID();
  const[cookies,_]=useCookies(["access_token"]);

  useEffect(()=>{
    const fetchRecipie=async()=>{
      
      try{
       const response= await axios.get(`https://recipieappbackend-6.onrender.com/recipies/savedRecipies/${userID}`,{
        headers:{authorization:cookies.access_token},
       });
       setRecipies(response.data.savedRecipies);
       
      }catch(err){

        console.error(err);
      }


     }

    fetchRecipie();
  },[])

  return (
    <div>
    <h1>SavedRecipes</h1>
    <ul>
      {recipies.map((recipie) => (
        <li key={recipie._id}>
        
          <div>
            <h2>{recipie.name}</h2>
            
            
          </div>
          <div className="instructions">
            <p>{recipie.instructions}</p>
          </div>
          <img src={recipie.imageUrl} alt={recipie.name} />
          <p>Cooking Time: {recipie.cookingTime} minutes</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Saverecipie