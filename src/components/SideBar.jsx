import Footer from "./Footer";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import AppNavigation from "./AppNavigation";
import { Outlet } from "react-router-dom";



function SideBar() {
    return (
        <div className={styles.sidebar} >
            <Logo />
          
          <AppNavigation />
          
          {/* This is the same as using "children prop" */}
            <Outlet />

           <Footer />
            
        </div>
    )
}

export default SideBar
