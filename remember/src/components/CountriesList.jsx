import { useCities } from '../contexts/CitiesContext';
import styles from './CountriesList.module.css'
import CountryItem from './CountryItem'
import Message from './Message';
import Spinner from "./Spinner";

function CountriesList() {

    const {cities, isLoading} = useCities(); 

    if(isLoading) return <Spinner />

    if(!cities.length) return (
        <Message message="Please click on the map to get started..." />

    ) 
    // Start with an empty country array
    const countries = cities.reduce((arr, city) => {
        if(!arr.map((el) => el.country).includes(city.country))
            return [...arr, {country: city.country, emoji: city.emoji}];
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
           {countries.map( (country) => (<CountryItem country={country} key={country.country} /> ))}
        </ul>
    );
}

export default CountriesList
