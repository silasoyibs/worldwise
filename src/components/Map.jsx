// import { useNavigate} from "react-router-dom";
import { MapContainer, TileLayer,Popup,Marker, useMap,useMapEvents} from 'react-leaflet';
import styles from "./map.module.css";
import { useCity} from '../contexts/CitiesContext';
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/usePositionUrl";
import { useNavigate } from 'react-router-dom';

// import { useState } from 'react';
function Map() {
 const [lat,lng]= useUrlPosition();
 const [mapPosition, setmapPosition]=useState([40,0]);
 const {cities,getFlag} = useCity();
 const { isLoading:isLoadingPosition, position:geoPosition,
   getPosition}= useGeolocation()

useEffect(function(){
 if(lat && lng) setmapPosition([lat,lng]);
},[lat,lng]);

useEffect(function(){
  if(geoPosition)setmapPosition([geoPosition.lat,geoPosition.lng]);
},[geoPosition])

  return( 
  <div className={styles.mapContainer} >
    {/* <h1>map</h1>
    <h1>position {lat}, {lng}</h1> */}
    <Button type="position" onClick ={getPosition}>
      {isLoadingPosition ?"loading": "use your position"}
    </Button>
     <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city)=><Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            <span>{getFlag(city.emoji)}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>)}
        <ChangeCenter position={mapPosition}></ChangeCenter>
        <DectectClick/>
     </MapContainer>
  </div>
  
  );
}

function ChangeCenter({position}){
 const map = useMap();
 map.setView(position);
 return null;
}

function DectectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click:(e)=>{
      console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  
  });
}

export default Map;
