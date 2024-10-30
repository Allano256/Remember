
import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from "./Message"
import { useCities } from '../Contexts/CitiesContext';

function CityList() {
    // This function will return a list of all the cities visited.
    console.log("CityList rendered");
    
    const {cities, isLoading} = useCities();

    console.log("Cities in CityList:", cities);
    

    if(isLoading) return <Spinner />;

     // Incase there is no cities, a message will be returned
     if(!cities.length) return <Message message="Please click on the map to get started..." />
    

    return (
        <ul className={styles.cityList} >
                
           {cities.map((city, index)=> <CityItem city={city} key={`${city.id}-${index}`} />  )}
        </ul>
    )


    
}

export default CityList
