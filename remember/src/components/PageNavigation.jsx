import {  NavLink} from "react-router-dom"
import styles from "./PageNavigation.module.css"
import Logo from "./Logo";
import { useContext } from "react";
// import {CurrentUserContext} from "./Contexts/AuthContext"
import { useCurrentUser } from "../Contexts/AuthContext";

function PageNavigation() {

    const currentUser = useCurrentUser();
    const loggedInIcons  = <> {currentUser ?.username} </>

    const loggedOutIcons = (
        <>
       

          <li>
                   <NavLink to="/login" className={styles.ctaLink}>Login</NavLink> 
               </li>

               <li>
                   <NavLink to="/signup" className={styles.ctaLink}>Signup</NavLink> 
               </li>
             
 
   
   </>
    );
    
    return (
        <nav className={styles.nav}>
            <ul>
               <Logo />
                
                <li>
                    <NavLink to="/about">About </NavLink> 
                </li>
                
                {currentUser ? loggedInIcons : loggedOutIcons}
                
            </ul>
            
        </nav>
    )
}

export default PageNavigation
