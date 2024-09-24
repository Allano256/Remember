import { useContext } from "react";
import { createContext, useState, useEffect } from "react";


const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

// Create the Provider

function CitiesProvider({children}){
    
  // These are global states that will be used in both the country and Place lists

   const [cities, setCities] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [currentCity, setCurrentCity] = useState({})

  //  Use the useEffect hook on the initial render/mount of the application
  useEffect(function(){
    async function fetchCities(){
      try {
        setIsLoading(true)
        const res =  await fetch(`${BASE_URL}/cities`);
         const data = await res.json();
         setCities(data);
      } catch{
        alert('There was an error loading the data...')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities();
    
  },[]);

  async function getCity(id){
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);

        } catch{
            alert("There was an error loading the data...")
        } finally {

            setIsLoading(false);
        }
  
  }

  

  return (
    <CitiesContext.Provider  value={{cities,
        isLoading,
        currentCity, getCity,
      }}>
         {children}
      </CitiesContext.Provider>
  ) 
}

// Building the consumers 
function useCities(){
    const context =useContext(CitiesContext);
    // check that the context is used in the right place/child provider
    if(context ===undefined)
         throw new Error("CitiesContext must be used inside the CitiesProvider");
    return context;
}


export {CitiesProvider, useCities};