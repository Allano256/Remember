import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNavigation.module.css";

function PageNavigation() {
    return (
      <nav className={styles.nav}>
        <Logo />
  
        <ul>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={styles.ctaLink}>
              Sign up
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default PageNavigation;
  