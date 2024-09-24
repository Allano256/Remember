
import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from "./Message"

function CityList({cities, isLoading}) {
    // This function will return a list of all the cities visited.
    

    if(isLoading) return <Spinner />;

     // Incase there is no cities, a message will be returned
     if(!cities.length) return <Message message="Please click on the map to get started..." />

    return (
        <ul className={styles.cityList} >
           {cities.map((city)=> <CityItem city={city} key={city.id} /> )}
        </ul>
    )
}

export default CityList
