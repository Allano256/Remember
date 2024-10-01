import { useEffect, useState } from "react";
import PageNavigation from "../components/PageNavigation";
import styles from "./login.module.css"
import { useAuth } from "../Contexts/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


 export default function  Login() {
const [email, setEmail] = useState("jack@example.com");
const [password, setPassword] = useState("milan10")

const  {login, isAuthenticated} =useAuth();
const navigate = useNavigate();

function handleSubmitEvent (e){
    e.preventDefault();
    if(email && password) login(email,password)
}

useEffect(function (){
  if (isAuthenticated) navigate('/app', {replace: true})
}, [isAuthenticated, navigate])

    return (
        <main className={styles.login}>
            <PageNavigation />
            <form className= {styles.form} onSubmit={handleSubmitEvent}>
                <div className={styles.row} >
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email" placeholder="example@yahoo.com" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className={styles.row} >
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"  onChange={(e)=> setPassword(e.target.value)} value={password}   />
                </div>

                <div>
             
                    <Button type='primary'>Login</Button>
                </div>
            </form>
        </main>
    );
}


