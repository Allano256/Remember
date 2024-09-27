import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000"; 

const CitiesContext = createContext();

function CitiesProvider({children}) {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({})

  
        useEffect(function(){
            async function fetchCities(){
              try {
                setIsLoading(true)
                const res =  await fetch(`${BASE_URL}/cities`);
                 const data = await res.json();
                
                 setCities(data);
               
              } catch{
                alert('Error loading the data...')
              } finally {
                setIsLoading(false)
              }
            }
            fetchCities();
            
          },[]);

          async function getCity(id){

            // This function will get one specific City using the id.
              try {
                setIsLoading(true)
                const res =  await fetch(`${BASE_URL}/cities/${id}`);
               
                 const data = await res.json(); 
                 
                 setCurrentCity(data); 
              ; 
                       
              } catch{
                alert('Error loading the city data...')
              } finally {
                setIsLoading(false)
              }
           
          }

        


          async function createCity(newCity){

            // This function will create City using the id.
              try {
                setIsLoading(true)
                const res =  await fetch(`${BASE_URL}/cities`, {
                  method:'POST',
                  body: JSON.stringify(newCity),
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
               
                 const data = await res.json(); 
                 
                //  This will add the newly created city to the list
             setCities(cities=> [...cities, data]);
              ; 
                       
              } catch{
                alert('Error creating the city ...')
              } finally {
                setIsLoading(false)
              }
           
          }


          
          async function deleteCity(id){

            // This function will create City using the id.
              try {
                setIsLoading(true)
                await fetch(`${BASE_URL}/cities/${id}`, {
                  method:'DELETE',
                
                });
                    
                //  This will delete the  cityfrom the list.
             setCities((cities)=> cities.filter((city)=> city.id !== id));
              ; 
                       
              } catch{
                alert('Error deleting city...')
              } finally {
                setIsLoading(false)
              }
           
          }
    
    
        
  return <CitiesContext.Provider value={{
    cities,
    isLoading,
    currentCity, 
    getCity,
    createCity,
    deleteCity,
  }}>
    {children}

  </CitiesContext.Provider>

 
}

function useCities(){
    const context = useContext(CitiesContext);

    if(context === undefined) throw new Error('Cities context must  be used within cities provider')
        return context
  }

export  { CitiesProvider, useCities}




// const BASE_URL = "http://localhost:8000";   

// const cityContext=  function CitiesContext() {
//     return (
       
//   // These are global states that will be used in both the country and Place lists
  
//    const [cities, setCities] = useState([]);
//    const [isLoading, setIsLoading] = useState(false);

//   //  Use the useEffect hook on the initial render/mount of the application
//   useEffect(function(){
//     async function fetchCities(){
//       try {
//         setIsLoading(true)
//         const res =  await fetch(`${BASE_URL}/cities`);
//          const data = await res.json();
          
//          setCities(data);
//          console.log(cities)
         
//       } catch{
//         alert('Error loading the data...')
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchCities();
    
//   },[]);
//     )
// }


