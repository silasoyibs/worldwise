import Sidebar from "../components/sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import User from "../components/User";
// import styles from "..pages/AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User/>
    </div>
  );
}

export default AppLayout;
