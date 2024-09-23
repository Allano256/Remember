import Footer from "./Footer";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import AppNavigation from "./AppNavigation";



function SideBar() {
    return (
        <div className={styles.sidebar} >
            <Logo />
          
          <AppNavigation />

            <p>List of cities</p>

           <Footer />
            
        </div>
    )
}

export default SideBar
