import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer} >
       <p className={styles.copright} > &copy; Copyright {new Date().getFullYear()} by Remember, All rights reserved.</p>  </footer>
    )
    
}

export default Footer
