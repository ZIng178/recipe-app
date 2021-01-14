import React, { useState } from "react";
 import {BrowserRouter as Router} from "react-router-dom"
import axios from "axios";
import {v4 as uuidv4} from "uuid"
import "./App.css";
import Recipe from "./Components/Recipe"
import LandingImage from "./Components/images/landing-image.svg"
import Alert from "./Components/Alert"

function App() {
  const [query, setQuery] = useState("");
  const [recipes,setRecipes]=useState([])
  const [alert,setAlert]=useState("")

  const APP_ID = "7b84c8b0";
  const APP_KEY = "99b802f5a5cf325436b4215264d592b3";
  const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query!==""){
      const result = await axios.get(URL);
      if(!result.data.more){
        return setAlert("No food with such name")
      }
      setRecipes(result.data.hits)
      console.log(result);
      setAlert("")
      setQuery("")
    } else{
      setAlert("Search field cannot be empty ")
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    setQuery("")
  };

  const handleOnChange = e => {
    // console.log(e.target.value);
    setQuery(e.target.value)
  };

  return (
    <div className="App">
    <Router>
    <h1 > FIND YOUR RECIPE </h1>
      <form className="search-form" onSubmit={handleSubmit}>
      {alert !=="" && <Alert alert={alert}/>}
        <input
          type="text"
          placeholder="search Food"
          autoComplete="off"
          onChange={handleOnChange}
          value={query}
        />
        {/* Why do we use another input type here ? */}
       <input type="submit" value="search"/>
      </form>
      <div className="recipe">
       {recipes!==[] && recipes.map(recipe=><Recipe key={uuidv4} recipe={recipe}/>)}
       <div>
       <img src={LandingImage} alt="landingimage"/>
       </div>
   
      </div>
    </Router>
      
    </div>
  );
}

export default App;
