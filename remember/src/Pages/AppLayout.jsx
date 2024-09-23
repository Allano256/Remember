import styles from "./AppLayOut.module.css";
// import PageNavigation from "../components/PageNavigation";
import SideBar from "../components/SideBar";
import Map from "../components/Map";

function AppLayout() {
    // <PageNavigation />
          
    return (
        <div className={styles.app}>
          
          <SideBar />
          <Map />
          
        </div>
    )
}

export default AppLayout
