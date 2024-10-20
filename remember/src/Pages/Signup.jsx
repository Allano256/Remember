import React, { useEffect, useState } from "react";
import styles from './Signup.module.css';
import Button from "../components/Button";
import PageNavigation from "../components/PageNavigation";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  // Form state
  const [formData, setFormData] = useState({
   
    first_name:'',
    last_name:'',
    email: "",
    password: "",
    password2: ""
  });
  const {first_name,last_name, email, password, password2} = formData;

  // Error state
  const [error, setErrors] = useState();
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();
 

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    
const handleSubmit= async(event)=>{

    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        'Authorization':  `Token ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

     

      if (response.ok) {
        setSuccess(data);
        
      
        setFormData({
          
    first_name:'',
    last_name:'',
    email: "",
    password: "",
    password2: ""
        });
        setErrors("");
      } else {
        const error = await response.json();
        console.error('Error:', data);
        setErrors(data.detail || 'An error occured')
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  useEffect(()=>{
    if(success){
      navigate('/login');
    }

  },[success, navigate]);

  return (
    <main className={styles.login}>
      <PageNavigation />
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Username */}
        <div className={styles.row}>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleChange}
            required
            autoComplete="new-password"
             
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
            required
            autoComplete="new-password"
             
          />
        </div>
        

        {/* Email */}
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            autoComplete="new-password"
             
          />
        </div>

        {/* Confirm Password */}
        <div className={styles.row}>
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
            required
          />
        </div>

       
        {/* Submit Button */}
        <div>
          <Button type='primary'>Sign up</Button>
        </div>
      </form>
    </main>
  );
}
