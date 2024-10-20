import {  useState } from "react";
import PageNavigation from "../components/PageNavigation";
import styles from "./login.module.css";
import { useAuth } from "../Contexts/AuthContext"; 
import Button from "../components/Button";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const { login, isAuthenticated } = useAuth(); 

  async function handleSubmit(e) {
    e.preventDefault();

    if (username && password) {
      await login(username, password); 
  
      
      if (isAuthenticated) {
        Navigate("/app", { replace: true });
      }
    }
  }

  

  return (
    <main className={styles.login}>
      <PageNavigation />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="start typing..."
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
