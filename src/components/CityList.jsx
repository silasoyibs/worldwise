import Spinner from "./Spinner";
import Message from "./Message";
import Cityitem from "./Cityitem";
import styles from "./CityList.module.css";
import { useCity } from "../contexts/CitiesContext";
function CityList() {
  const {cities,isLoading,getFlag}= useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <Cityitem city={city} key={city.id} getFlag={getFlag} />
      ))}
    </ul>
  );
}

export default CityList;
