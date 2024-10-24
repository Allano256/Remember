import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';


const BASE_URL = "https://drf-api-remember-f742a049740b.herokuapp.com"; 

const CitiesContext = createContext();



function getCSRFToken(){
  return localStorage.getItem('refresh_token');
  
}

function CitiesProvider({children}) {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState(null)

  
    
        useEffect(function(){
            async function fetchCities(){
              try {
                setIsLoading(true)
               
                const token=localStorage.getItem('token');
                const res =  await fetch(`${BASE_URL}/cities/`, 
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'Application/json',
                      
                    }
                  }
                );
                 const data = await res.json();
                console.log(data)
                 setCities(data.length > 0 ? data : []);
               
              } catch{
                alert('Error loading the data...')
              } finally {
                setIsLoading(false)
              }
            }
            fetchCities();
            
          },[]);

          async function getCity(id){
            console.log(id)

            // This function will get one specific City using the id.
              try {
                setIsLoading(true)
                const token=localStorage.getItem('token');
                const res =  await fetch(`${BASE_URL}/cities/${id}`,
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  }
                );
               
                 const data = await res.json(); 
                 
                 setCurrentCity(data); 
              ; 
                       
              } catch{
                alert('Error loading the city data...')
              } finally {
                setIsLoading(false)
              }
           
          };

          async function createCity(newCity){

            // This function will create City using the id.
              try {
                setIsLoading(true)
                const csrfToken =getCSRFToken();
                const token = localStorage.getItem('token');
                
                const decoded = jwtDecode(token);
                console.log(decoded);
                const {user_id} = decoded;

                const city={...newCity, city_name:newCity.cityName, user:user_id}

                const res =  await fetch(`${BASE_URL}/cities/`, {
                  method:'POST',
                  body: JSON.stringify(city),
                  headers: {
                    
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                   
                   
                  }
                });
               
                 const data = await res.json(); 
                 
                //  This will add the newly created city to the list
            //  setCities(cities=> [...cities, data]);
            console.log("Before adding city:", cities);
             setCities(prevCities=> [...prevCities, data]);
             console.log("After adding city:", [...cities, data]);
              
                       
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
                const token =localStorage.getItem('token');
                await fetch(`${BASE_URL}/cities/${id}/`, {
                  method:'DELETE',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'Application/json'
                  }
                
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


