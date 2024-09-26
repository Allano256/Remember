import { BrowserRouter, Routes, Route } from "react-router-dom"

import AboutPage from "./Pages/AboutPage"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import PageNotFound from "./Pages/PageNotFound"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import CountriesList from "./components/CountriesList"

const BASE_URL = "http://localhost:8000";

function App() {

  // These are global states that will be used in both the country and Place lists

   const [cities, setCities] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

  //  Use the useEffect hook on the initial render/mount of the application
  useEffect(function(){
    async function fetchCities(){
      try {
        setIsLoading(true)
        const res =  await fetch(`${BASE_URL}/cities`);
         const data = await res.json();
          
         setCities(data);
         console.log(cities)
         
      } catch{
        alert('Error loading the data...')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities();
    
  },[]);

  return (
    <BrowserRouter>
    <Routes>
      <Route index  element={<HomePage />} />
      <Route path="about" element= {<AboutPage/>} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
         {/* This creates the list of cities to be displayed if no specific route is specified */}

         <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
         
      {/* These are nested routes */}
         <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />}  />
         <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading} />}  />
         <Route path="form" element={<p>Form</p>} />
      </Route> 
      <Route path="*"  element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
      
  
  )
}

export default App
