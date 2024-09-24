import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"


import AboutPage from "./Pages/AboutPage"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import PageNotFound from "./Pages/PageNotFound"
import CityList from "./components/CityList"
import CountriesList from "./components/CountriesList"
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext"



function App() {


  return (
    <CitiesProvider>
    <BrowserRouter>
    <Routes>
      <Route index  element={<HomePage />} />
      <Route path="about" element= {<AboutPage/>} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
         {/* This creates the list of cities to be displayed if no specific route is specified */}
         {/* The replace keyword will replace the current elementin the history stack */}
         <Route index element={<Navigate replace to="cities" />} />
      {/* These are nested routes */}
         <Route path="cities" element={<CityList />} />
         {/* Using params to store/manage state in the URL */}
         <Route path="cities/:id" element={<City />} />
         {/* We derive the countries from the cities component when  it loads */}
         <Route path="countries" element={<CountriesList />} />
        
         <Route path="form" element={<Form />} />
      </Route> 
      <Route path="*"  element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
      </CitiesProvider >
      
  
  )
}

export default App
