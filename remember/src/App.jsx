import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AboutPage from "./Pages/AboutPage"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import PageNotFound from "./Pages/PageNotFound"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import CountriesList from "./components/CountriesList"
import City from "./components/City"
import Form from "./components/Form"

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
         {/* The index route takes you direct to the cities list */}

         <Route index element={<Navigate replace to={'cities'}  />} />
         
      {/* These are nested routes */}
         <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />}  />

         <Route path="cities/:id" element={<City />} />

         <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading} />}  />
         <Route path="form" element={<Form/>} />
      </Route> 
      <Route path="*"  element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
      
  
  )
}

export default App
