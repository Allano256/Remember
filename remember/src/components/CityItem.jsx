import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../Contexts/CitiesContext';
import BackButton from './BackButton';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",  
  }).format(new Date(date));


function CityItem({city}) {
  const {currentCity, deleteCity} = useCities();
    const {cityName, emoji, date, id, position} = city;
    

    function handleClick(e){
      e.preventDefault();
      deleteCity(id);
    }
  
    return (
        <li >
          <Link  className= {`${styles.city} ${id === currentCity.id ? styles["city--active"] : "" }  `} to={`${id}?lat=${position.lat}&lng=${position.lng}`} >
          <span className={styles.emoji} >{emoji} </span>
          <h3 className={styles.name}>{cityName} </h3>
          <time className={styles.date} > ({formatDate(date)})</time>
          <button className={styles.deleteBtn} onClick={handleClick} >&times;</button>
         
          </Link>
         
        </li>
        
    )
}

export default CityItem;
