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


    const {city_name,  emoji, date, id, lat, lng} = city;
    

    function handleClick(e){
      e.preventDefault();
      deleteCity(id);
    }
    
  // if(currentCity == null) return;

    return (
        <li >
          <Link  className= {`${styles.city} `} to={`${id}?lat=${lat}&lng=${lng}`} >
          {/* <Link  className= {`${styles.city} ${id === currentCity.id ? styles["city--active"] : "" }  `} to={`${id}?lat=${lat}&lng=${lng}`} ></Link> */}
          <span className={styles.emoji} >{emoji} </span>
          <h3 className={styles.name}>{city_name} </h3>
          <time className={styles.date} > ({formatDate(date)})</time>
          <button className={styles.deleteBtn} onClick={handleClick} >&times;</button>
        
          </Link>
         
        </li>
        
    )
}

export default CityItem;
