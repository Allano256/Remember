import { useParams } from "react-router-dom";
import styles from "./City.module.css";

import { useEffect, useState } from "react";
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
  const { id } = useParams();
  const { getCity, updateCity, cities, isLoading } = useCities();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    city_name: '',
    emoji: '',
    date: '',
    notes: ''
  });

  let currentCity = null;
  cities.forEach((city) => {
    if (city.id === parseInt(id)) {
      currentCity = city;
    }
  });

  useEffect(() => {
    if (currentCity) {
      setFormData({
        city_name: currentCity.city_name,
        emoji: currentCity.emoji,
        date: currentCity.date,
        notes: currentCity.notes || '',
      });
    }
  }, [currentCity]);

  useEffect(() => {
    getCity(id);
  }, [id]);

  if (isLoading) return <Spinner />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCity(id, formData);
    setIsEditing(false);
  };

  return (
    <div className={styles.city}>
      {!isEditing ? (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{formData.emoji}</span> {formData.city_name}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {formData.city_name} on</h6>
            <p>{formatDate(formData.date || null)}</p>
          </div>

          {formData.notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{formData.notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${formData.city_name}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {formData.city_name} on Wikipedia &rarr;
            </a>
          </div>

          <BackButton />
          <EditButton onClick={() => setIsEditing(true)} />
        </>
      ) : (
        <form className={styles.editForm} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label>City name</label>
            <input
              type="text"
              name="city_name"
              value={formData.city_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.row}>
            <label>Emoji</label>
            <span>{formData.emoji}</span>
            {/* <input
              type="text"
              name="emoji"
              value={formData.emoji}
              onChange={handleChange}
              required
            /> */}
          </div>
          <div className={styles.row}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.row}>
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default City;




// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
   
//   }).format(new Date(date));

// function City() {

//   const {id} =useParams();

  
  
//  const {getCity, cities, isLoading} = useCities();
//  let currentCity=null
//  cities.map((city)=> {
//   console.log(city)
//   if (city.id === parseInt(id)){
//     currentCity = city
//   }
//  })


//  useEffect(function (){
//    getCity(id);
//  },[id]);

//   const { city_name, emoji, date, notes } = currentCity;

//   if(isLoading) return <Spinner />;
   
//   return (
//     <div className={styles.city}>
//       <div className={styles.row}>
//         <h6>City name</h6>
//         <h3>
//           <span>{emoji}</span> {city_name}
//         </h3>
//       </div>

//       <div className={styles.row}>
//         <h6>You went to {city_name} on</h6>
//         <p>{formatDate(date || null)}</p>
//       </div>

//       {notes && (
//         <div className={styles.row}>
//           <h6>Your notes</h6>
//           <p>{notes}</p>
//         </div>
//       )}

//       <div className={styles.row}>
//         <h6>Learn more</h6>
//         <a
//           href={`https://en.wikipedia.org/wiki/${city_name}`}
//           target="_blank"
//           rel="noreferrer"
//         >
//           Check out {city_name} on Wikipedia &rarr;
//         </a>
//       </div>


//       <div>
//         <BackButton />
//       </div>
//       <div>
//         <EditButton />
//       </div>
     
      

//     </div>
//   );
// }

// export default City;
