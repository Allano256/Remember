import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
    
    // This hook helps to move to another page in an imperative way "useNavigate"
    
//    const navigate =useNavigate();
const {cities} = useCities();

   const [mapPosition, setMapPosition]   = useState([40, 0])
   const {isLoading: isLoadingPosition, position:geolocationPosition, getPosition} = useGeolocation();
   
    const [searchParams]=useSearchParams();

    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(function (){
      // This checks first if the (lat, lng) exists first and will display the position and move to that position.
       if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
   [mapLat, mapLng]);

// Synchronize two variables, geolocationPosition and the setMapPosition
   useEffect(function(){
   if(geolocationPosition)
    setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
   },[geolocationPosition]);

    return (
        <div className={styles.mapContainer} >
         { !geolocationPosition && ( <Button type="position" onClick={getPosition}>
            {isLoadingPosition? 'Loading': 'Use your position'}
          </Button>) } 
           <MapContainer 
           center={mapPosition}
            zoom={6}
             scrollWheelZoom={true} 
             className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    { cities.map(city =>( <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName} </span>
      </Popup>
    </Marker>))
     
    }
    <ChangeCenter position={mapPosition} />
    <DetectClick />
  </MapContainer>
            
        </div>
    )
}  

// Custom components
function ChangeCenter({position}){
  const map=useMap()
  map.setView(position);
  return null;

  function DetectClick(){
    const navigate =useNavigate();
    useMapEvents({
      click: (e) =>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
  }
}


export default Map
