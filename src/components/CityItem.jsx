import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../Contexts/CitiesContext';


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",  
  }).format(new Date(date));


function CityItem({city}) {
  const {currentCity, deleteCity} = useCities();


    const {city_name, date, id, lat, lng} = city;
    

    function handleClick(e){
      e.preventDefault();
      deleteCity(id);
    }
    
  

    return (
        <li >
          <Link  className= {`${styles.city} `} to={`${id}?lat=${lat}&lng=${lng}`} >
          <h3 className={styles.name}>{city_name} </h3>
          <time className={styles.date} > ({formatDate(date)})</time>
          <button className={styles.deleteBtn} onClick={handleClick} >&times;</button>
        
          </Link>
         
        </li>
        
    )
}

export default CityItem;
