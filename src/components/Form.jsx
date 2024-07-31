// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// "/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/usePositionUrl";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCity } from "../contexts/CitiesContext";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASEURL= "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [lat,lng]= useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeo,setisLoadingGeo]= useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingErr, setgeoCodingErr] = useState("");
  const {createCity,isLoading } = useCity();

  useEffect(function(){
    if(!lat && !lng) return;
   async function fetchCity(){
     try{
     setisLoadingGeo(true);
     const res= await fetch(`${BASEURL}?latitude=${lat}&longitude=${lng}`);
     const data= await res.json();
     console.log(country,isLoadingGeo,data);
     if(!data.city)
     throw new Error(" this city does not exist please click somewhere else ");
     setCityName(data.city || data.locality || "");
     setCountry(data.countryName);
     setEmoji(convertToEmoji(data.countryCode));
     }catch(error){
      console.log(error.message)
        setgeoCodingErr(error.message);
     }
     finally{
      setisLoadingGeo(false);
     }
   }
   fetchCity()
  },[]);
   async function handleSubmit(e){
      e.preventDefault();
      if(!cityName || !date) return;
      const newCity = {
        cityName,
        country,
        emoji,
        notes,
        position:{lat,lng },
      };
      await createCity(newCity);
      navigate("/app/cities");
   }



  if(isLoadingGeo) return <Spinner/>;
  if(!lat && !lng) return <Message message={'👏click anywhere on the map to display city'}/>;
  if(geoCodingErr) return <Message message={geoCodingErr}/>;
  return (
    <form className={`${styles.form} ${ isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChnage={date => setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e)=>{ 
        e.preventDefault();
        navigate(-1);
        }
        }>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
