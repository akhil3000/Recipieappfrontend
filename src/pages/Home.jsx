import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from "react-cookie";
const Home = () => {

   const[recipies,setRecipies]=useState([]);
   const[savedRecipies,setSavedRecipies]=useState([]);
   const[cookies,_]=useCookies(["access_token"]);
   const userID=useGetUserID();
   useEffect(()=>{
     const fetchRecipie=async()=>{
      
      try{
       const response= await axios.get("https://recipieappbackend-6.onrender.com/recipies/getrecipie");
       setRecipies(response.data);
       console.log(response.data);
      }catch(err){

        console.error(err);
      }


     }

     const fetchSavedRecipie=async()=>{
     
     
      try{
        const response= await axios.get(`https://recipieappbackend-6.onrender.com/recipies/savedRecipies/ids/${userID}`);
        setSavedRecipies(response.data.savedRecipies);

        
        
       }catch(err){
 
         console.error(err);
       }



     }

     



     fetchRecipie();

     if(cookies.access_token)
    {
     fetchSavedRecipie();
    }
   },[])

   const saveRecipie=async(recipieID)=>{
     
    try{
      const response= await axios.put("https://recipieappbackend-6.onrender.com/recipies/saverecipie",{
        recipieID,
        userID
      },{headers:{authorization:cookies.access_token}});
      setSavedRecipies(response.data.savedRecipies);
     }catch(err){

       console.error(err);
     }
   }

   const isRecipieSaved=(id)=>savedRecipies.includes(id);

  return (
    <div>
    <h1>Recipes</h1>
    <ul>
      {recipies.map((recipie) => (
        <li key={recipie._id}>
        
          <div>
            <h2>{recipie.name}</h2>
            <button onClick={()=>saveRecipie(recipie._id) } 
            disabled={isRecipieSaved(recipie._id)} >Save</button>
            
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

export default Home