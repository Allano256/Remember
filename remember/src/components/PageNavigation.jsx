import {  NavLink} from "react-router-dom"
import styles from "./PageNavigation.module.css"

function PageNavigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/" >Home</NavLink> 
                </li>
                <li>
                    <NavLink to="/about">About </NavLink> 
                </li>
                
                <li>
                    <NavLink to="/login">Login</NavLink> 
                </li>
               
                
            </ul>
            
        </nav>
    )
}

export default PageNavigation
