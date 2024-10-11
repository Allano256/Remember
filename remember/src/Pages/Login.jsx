import { useContext, useEffect, useState } from "react";
import PageNavigation from "../components/PageNavigation";
import styles from "./login.module.css"
// import { useAuth } from "../Contexts/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {SetCurrentUserContext} from '../Contexts/AuthContext'


 export default function  Login() {

    const setCurrentUser= SetCurrentUserContext()
    
// const [username, setUsername] = useState(" ");
// const [password, setPassword] = useState(" ");
const[signInData, setSignInData] = useState({
    username: '',
    password: ''
})
const {username, password} = signInData;

// const  {login, isAuthenticated} =useAuth();
// const navigate = useNavigate();

const handleSubmitEvent = async (e)=>{
    e.preventDefault();

    try{
      const {data}=  await axios.post("/dj-rest-auth/login",signInData );
      setCurrentUser(data.user)
    } catch(err){
        console.log('Log in failed')
    }
    // if(username && password) login(username,password)
}

const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

// useEffect(function (){
//   if (isAuthenticated) navigate('/app', {replace: true})
// }, [isAuthenticated, navigate])

    return (
        <main className={styles.login}>
            <PageNavigation />
            <form className= {styles.form} onSubmit={handleSubmitEvent}>
                <div className={styles.row} >
                    <label htmlFor="username">Username </label>
                    <input type="username" id="username" placeholder="start typing..." name="username" onChange={handleChange} value={username} />
                </div>
                <div className={styles.row} >
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"  onChange={handleChange} value={password}   />
                </div>

                <div>
             
                    <Button type='primary'>Login</Button>
                </div>
            </form>
        </main>
    );
}


