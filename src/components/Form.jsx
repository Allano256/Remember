
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesContext";
import { useNavigate } from "react-router-dom";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
 
  const [lat, lng]= useUrlPosition();
  const {createCity, isLoading}= useCities();
  const navigate=useNavigate();
 
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeoCodingError] = useState('')


  
function getCSRFToken(){
  let csrfToken=null;
  if(document.cookie && document.cookie !== ''){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++){
      const cookie= cookies[i].trim();
      if (cookie.startsWith('csrftoken=')){
        csrfToken = cookie.substring('csrftoken='.length);
        break;
      }
    }
  }
  return csrfToken;
}



  

  useEffect(function(){
    // This effect will check for the city and attach the new data to that city accordingly, lookup if this city exists,throw an error if it doesnt.
    if(!lat && !lng) return;

    async function fetchCityData(){
    
      try{
        setIsLoadingGeocoding(true);
        setGeoCodingError('');
        const csrfToken =getCSRFToken();
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          {
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'Application/json',
              'X-CSRFToken': csrfToken,
            }
  
          }
        );
        const data = await res.json();
        if(!data.countryCode) throw new Error ('Click somewhere else, that is not a city please..😟');
      setCityName(data.city || data.locality ||  '');
      setCountry(data.countryName);
      setEmoji(convertToEmoji(data.countryCode))
      }catch(err) {
            setGeoCodingError(err.message)
      } finally {
         setIsLoadingGeocoding(false)
      }
    }
    fetchCityData();
  },
   [lat, lng])

 async function handleSubmit(e){
  e.preventDefault();
  if(!cityName || !date) return;

  const newCity= {
       cityName,
       country,
       emoji,
       date,
       notes,
        lat,
        lng
  };

  await createCity(newCity);
  navigate('/app/cities');

}


  // This will show an error if the user clicks on a position that is not a city,like in the lake or sea
  
  if(geocodingError) return <Message message={geocodingError} />

  if(isLoadingGeocoding) return <Spinner />

  if(!lat && !lng) return <Message message='Click on the map to get started...' />

  return (
    <form className=  {`${styles.formItem} ${isLoading ? styles.loading: ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        

        <DatePicker onChange={(date)=> setDate(date)} selected={date} dateFormat='dd/MM/yyyy' id="date" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.formButtons}>
        <Button type='primary'>  Add</Button>  
       <BackButton />
      </div>
    </form>
  );
}

export default Form;