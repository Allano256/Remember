import { useState } from "react";
import PageNavigation from "../components/PageNavigation";
import styles from "./login.module.css"


 export default function  Login() {
const [email, setEmail] = useState("doe@example.com")
const [password, setPassword] = useState("jkyhkgik")

    return (
        <main className={styles.login}>
            <PageNavigation />
            <form className= {styles.form}>
                <div className={styles.row} >
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email" />
                </div>
                <div className={styles.row} >
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"  />
                </div>

                <div>
                    <button>Login</button>
                </div>
            </form>
        </main>
    );
}


