
import styles from './Button.module.css'

function Button({children, onClick, type}) {
    return (
    <button onClick={onclick} className={`${styles.Btn} ${styles[type]}`} >
            {children}
            
        </button>
    )
}

export default Button
