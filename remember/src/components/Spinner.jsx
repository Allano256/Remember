
import styles from './Spinner.module.css';

function Spinner() {
    return (
        <div>
            <div  className={styles.spinnerTin} ></div>
            <div className={styles.spinner}></div>
            
        </div>
    );
}

export default Spinner
