import {  NavLink} from "react-router-dom"
import styles from "./PageNavigation.module.css"
import Logo from "./Logo";

function PageNavigation() {
    return (
        <nav className={styles.nav}>
          
               <Logo />
               
               <ul>
                
                <li>
                    <NavLink to="/about"  className={styles.ctaLink3}>About </NavLink> 
                </li>
                
                <li>
                    <NavLink to="/login" className={styles.ctaLink2}>Login</NavLink> 
                </li>

                <li>
                    <NavLink to="/signup" className={styles.ctaLink1}>Signup</NavLink> 
                </li>
               
                
            </ul>
            
        </nav>
    )
}

export default PageNavigation
