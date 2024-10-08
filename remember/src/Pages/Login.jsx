import { useEffect, useState } from "react";
import PageNavigation from "../components/PageNavigation";
import styles from "./login.module.css"
import { useAuth } from "../Contexts/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


 export default function  Login() {
const [username, setUsername] = useState(" ");
const [password, setPassword] = useState(" ");

const  {login, isAuthenticated} =useAuth();
const navigate = useNavigate();

function handleSubmitEvent (e){
    e.preventDefault();
    if(username && password) login(username,password)
}

useEffect(function (){
  if (isAuthenticated) navigate('/app', {replace: true})
}, [isAuthenticated, navigate])

    return (
        <main className={styles.login}>
            <PageNavigation />
            <form className= {styles.form} onSubmit={handleSubmitEvent}>
                <div className={styles.row} >
                    <label htmlFor="username">Username </label>
                    <input type="username" id="username" placeholder="start typing..." name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
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


