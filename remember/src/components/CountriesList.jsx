import CountryItem from './CountryItem';
import styles from './CountriesList.module.css'
import Spinner from './Spinner'
import Message from "./Message"

function CountriesList({cities, isLoading}) {
    // This function will return a list of all the cities visited.
    

    if(isLoading) return <Spinner />;

     // Incase there is no cities, a message will be returned
     if(!cities.length) return <Message message="Please click on the map to get started..." />

     const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
          return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
      }, []);
       
   

    return (
        <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
    )
}

export default CountriesList
