import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";

function Map() {

    const{cities} = useCities();
   

    const [mapPosition, setMapPosition] = useState([40, 0])
     const [searchParams]= useSearchParams();

     const mapLat = searchParams.get("lat");
     const mapLng =searchParams.get("lng");

   useEffect(function(){
   
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
   },[mapLat, mapLng])

    return (
        <div className={styles.mapContainer}  >   
        
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
 { cities.map((city)  => (
    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
    <Popup>
   <span>{city.emoji}</span><span>{city.cityName}</span>
    </Popup>
</Marker> ))} 


<DetectClick />
<SwitchCenter position={mapPosition} />
</MapContainer>
     
        </div>
    )
}

function SwitchCenter({position}){
    // This custom hook will move to that specific position on the map
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
    // This custom hook will detect any click on the map and immediately show the map
    
    const navigate = useNavigate()
    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng}$lng=${e.latlng}`)

    });
}


export default Map
