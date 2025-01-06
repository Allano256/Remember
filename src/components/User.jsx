import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  
  const { user, logout } = useAuth();
  const storedinUser = localStorage.getItem(user)
  let loggedinUser = null
  if (storedinUser)
  { loggedinUser = JSON.parse(storedinUser)}
 
  console.log("---",loggedinUser)
  const navigate = useNavigate();

  function handleClickEvent() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      
      <span>Welcome, {loggedinUser?.first_name || "Guest"}</span>


      <button onClick={handleClickEvent}>Logout</button>
    </div>
  );
}

export default User;
