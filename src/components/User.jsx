import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  console.log(user)
  const navigate = useNavigate();

  function handleClickEvent() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {/* <img src={user.avatar} alt={user.name} /> */}
      <span>Welcome, {user}</span>
    
      <button onClick={handleClickEvent}>Logout</button>
    </div>
  );
}

export default User;
