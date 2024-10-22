import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../Hooks/UseGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Map() {

    const{cities} = useCities();
    console.log("Cities from backend:", cities);
   
    const [mapPosition, setMapPosition] = useState([40, 0])
    
     const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();

    const [mapLat, mapLng]  = useUrlPosition();

   useEffect(function(){
   
    if(mapLat && mapLng) setMapPosition([parseFloat(mapLat), parseFloat(mapLng)])
   },[mapLat, mapLng])

   useEffect(function(){
    if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);

   }, [geolocationPosition])

    return (
        <div className={styles.mapContainer}> 
     {!geolocationPosition  &&  (
      <Button type='position' onClick={getPosition}
      >  {isLoadingPosition ? "Loading..." : "Use your position..." } </Button>
     ) } 


{/* 
useEffect(function(){
   
   if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
  },[mapLat, mapLng])

  useEffect(function(){
   if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);

  }, [geolocationPosition])

   return (
       <div className={styles.mapContainer}> 
    {!geolocationPosition  &&  (
     <Button type='position' onClick={getPosition}
     >  {isLoadingPosition ? "Loading..." : "Use your position..." } </Button>
    ) }  */}
        
        <MapContainer 
        center={mapPosition}
         zoom={7} 
         scrollWheelZoom={true}
           className={styles.map} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />

    {/* Here we loop over the cities and add a marker to that city */}
 { cities.map((city, index)  => (
    <Marker position={[city.lat, city.lng]} key={city.id || index}>
    <Popup>
   <span>{city.emoji}</span><span>{city.cityName}</span>
    </Popup>
</Marker> )
)} 


<DetectClick />
<SwitchCenter position={mapPosition} />
</MapContainer>
     
        </div>
    );
}

function SwitchCenter({position}){
    // This custom hook will move to that specific position on the map
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
    // This custom hook will detect any click on the map and immediately show the map
    
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),

    });
}


export default Map
