import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AboutPage from "./Pages/AboutPage"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import PageNotFound from "./Pages/PageNotFound"
import CityList from "./components/CityList"
import CountriesList from "./components/CountriesList"
import City from "./components/City"
import Form from "./components/Form"
import { CitiesProvider } from "./Contexts/CitiesContext"
import {AuthProvider} from "./Contexts/AuthContext"

 

function App() {

  return (
   <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Routes>
      <Route index  element={<HomePage />} />
      <Route path="about" element= {<AboutPage/>} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
         {/* The index route takes you direct to the cities list */}

         <Route index element={<Navigate replace to={'cities'}  />} />
         
      {/* These are nested routes */}
         <Route path="cities" element={<CityList  />}  />

         <Route path="cities/:id" element={<City />} />

         <Route path="countries" element={<CountriesList  />}  />
         <Route path="form" element={<Form/>} />
      </Route> 
      <Route path="*"  element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
     
    
  )
}

export default App
