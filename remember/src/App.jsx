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
      <Route path="/"  element={<HomePage />} />
      <Route path="about" element= {<AboutPage/>} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />} />
      <Route path="*"  element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
      
  
  )
}

export default App
