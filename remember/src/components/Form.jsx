// 

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";


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
 
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeoCodingError] = useState('')


  

  useEffect(function(){
    // This effect will check for the city and attach the new data to that city accordingly, lookup if this city exists,throw an error if it doesnt.

    async function fetchCityData(){
     
      try{
        isLoadingGeocoding(true);
        setGeoCodingError('')
        const res = await fetch(`${BASE_URL}?latitude={lat}&longitude={lng}`);
        const data = await res.json();
        if(!data.countryCode) throw new Error ('Click somewhere else, that is not a city please..😟');
      setCityName(data.city || data.locality ||  '');
      setCountry(data.countryName);
      setEmoji(convertToEmoji(data.countryCode))
      }catch(err) {
            setGeoCodingError(err.message)
      } finally {
         isLoadingGeocoding(false)
      }
    }
  }, [lat, lng])

  // This will show an error if the user clicks on a position that is not a city,like in the lake or sea
  
  if(geocodingError) return <Message message={geocodingError} />

  if(isLoadingGeocoding) return <Spinner />

  return (
    <form className={styles.formItem}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
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
