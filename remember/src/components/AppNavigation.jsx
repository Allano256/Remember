import { NavLink } from "react-router-dom"
import styles from "./AppNavigation.module.css"

function AppNavigation() {
    return (
        <nav className={styles.nav} >
           <ul>
            <li>
                <NavLink to="cities">Cites</NavLink>
            </li>
            <li>
                <NavLink to="countries">Countries</NavLink> 
            </li>
           
           </ul>
            
        </nav>
    )
}

export default AppNavigation
