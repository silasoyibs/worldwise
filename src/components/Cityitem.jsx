import { Link } from "react-router-dom";
import styles from "./Cityitem.module.css";
import { useCity } from "../contexts/CitiesContext";
// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(new Date(date));
function Cityitem({ city, getFlag }) {
  const {currentCity,deleteCity} = useCity();
  const { cityName, emoji, id, position } = city;

  function handleClick(e){
    e.preventDefault();
    deleteCity(id);
   }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"]:""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{getFlag(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        {/* <time className={styles.date}>{formatDate(date)}</time> */}
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}

export default Cityitem;
