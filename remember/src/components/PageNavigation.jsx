import {  NavLink} from "react-router-dom"
import styles from "./PageNavigation.module.css"
import Logo from "./Logo";

function PageNavigation() {
    return (
        <nav className={styles.nav}>
            <ul>
               <Logo />
                
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
