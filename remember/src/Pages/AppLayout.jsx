import styles from "./AppLayOut.module.css";

import SideBar from "../components/SideBar";
import Map from "../components/Map";
import User from '../components/User'

function AppLayout() {
    // <PageNavigation />
          
    return (
        <div className={styles.app}>
          
          <SideBar />
          <Map />
          <User />
        </div>
    )
}

export default AppLayout
