import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../Contexts/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import EditButton from "./EditButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
   
  }).format(new Date(date));

function City() {

  const {id} =useParams();

  
  
 const {getCity, cities, isLoading} = useCities();
 let currentCity=null
 cities.map((city)=> {
  console.log(city)
  if (city.id === parseInt(id)){
    currentCity = city
  }
 })


 useEffect(function (){
   getCity(id);
 },[id]);

  const { city_name, emoji, date, notes } = currentCity;

  if(isLoading) return <Spinner />;
   
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {city_name}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {city_name} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${city_name}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {city_name} on Wikipedia &rarr;
        </a>
      </div>


      <div>
        <BackButton />
      </div>
      <div>
        <EditButton />
      </div>
     
      

    </div>
  );
}

export default City;
