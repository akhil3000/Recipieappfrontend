import React,{useState} from 'react';
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";
const Createrecipe = () => {
  const userID=useGetUserID();
  const[cookies,_]=useCookies(["access_token"]);
  const [recipie,setRecipie]=useState({
   name:"",
   ingredients:[],
   instructions:"",
   imageUrl:"",
   cookingTime:0,
   userOwner:userID,

  });
  const Navigate=useNavigate();
  const handleChange=(event)=>{
   const {name,value}=event.target;
   setRecipie({...recipie,[name]:value});
  }

  const handleIngredientChange=(event,idx)=>{
   const {value}=event.target;
   const ingredients=recipie.ingredients;
   ingredients[idx]=value;
   setRecipie({...recipie,ingredients:ingredients});

  }

   const addIngredient=()=>{
      setRecipie({...recipie,ingredients:[...recipie.ingredients,""]});
   }

   const onSubmit=async(event)=>{
    event.preventDefault();
    try{
       await axios.post("https://recipieappbackend-6.onrender.com/recipies/createrecipie",recipie,{
        headers:{authorization:cookies.access_token},
       });
       alert("Recipie Created")
       Navigate("/");
    }catch(err){
      console.error(err);
    }

   }

  return (
    <div className="create-recipe">
      <h2>Create Recipie</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={recipie.name} onChange={handleChange}/>
        <label htmlFor="ingredients">Ingredients</label> 
        {recipie.ingredients.map((ingredient,idx)=>(
          <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event)=>handleIngredientChange(event,idx)} />
        ))

        }

        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" value={recipie.instructions} onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" value={recipie.imageUrl} onChange={handleChange}/>
        <label htmlFor="cookingTime">Cooking Time(minutes)</label>
        <input type="number" id="cookingTime" name="cookingTime" value={recipie.cookingTime} onChange={handleChange}/>

        <button  type="submit">
          Create Recipie
        </button>
      </form>
    </div>
  )
}

export default Createrecipe