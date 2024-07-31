import Spinner from "./Spinner";
import Message from "./Message";
import Countryitem from "./Countryitem";
import styles from "./CountryList.module.css";
import { useCity } from "../contexts/CitiesContext";
function CountryList() {
  const { cities, isLoading, getFlag } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;
  const countries = cities.reduce((newArray, current) => {
    if (!newArray.map((el) => el.country).includes(current.country)) {
      return [...newArray, { country: current.country, emoji: current.emoji }];
    } else {
      return newArray;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <Countryitem country={country} key={country.id} getFlag={getFlag} />
      ))}
    </ul>
  );
}

export default CountryList;
