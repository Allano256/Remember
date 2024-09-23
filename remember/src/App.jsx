import { BrowserRouter, Routes, Route } from "react-router-dom"

import AboutPage from "./Pages/AboutPage"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import PageNotFound from "./Pages/PageNotFound"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index  element={<HomePage />} />
      <Route path="about" element= {<AboutPage/>} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
         {/* This creates the list of cities to be displayed if no specific route is specified */}
         <Route index element={<p>List of cities</p>} />
      {/* These are nested routes */}
         <Route path="cities" element={<p>Cities</p>} />
         <Route path="countries" element={<p>Countries</p>} />
         <Route path="form" element={<p>Form</p>} />
      </Route> 
      <Route path="*"  element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
      
  
  )
}

export default App
