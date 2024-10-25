import React, { useEffect, useState } from "react";
import styles from './Signup.module.css';
import Button from "../components/Button";
import PageNavigation from "../components/PageNavigation";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'https://drf-api-remember-f742a049740b.herokuapp.com/api/v1'

export default function Signup() {
  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: ""
  });

  // Error state
  const [error, setError] = useState("");
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirmPassword match
    if (formData.password !== formData.password2) {
      setError("Passwords do not match!");
      return;
    }

    
    console.log("Form Submitted", formData);


    function getCookie(name){
      let cookieValue=null;
      if(document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++){
          const cookie= cookies[i].trim();
          if (cookie.substring(0, name.length + 1)===(name + '=')){
            cookieValue = decodeURIComponent(cookie(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    



    try {
      const csrfToken = getCookie('csrftoken');
      // const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        // 'Authorization':  `Token ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess(data);
        
      
        setFormData({
          first_name: "",
          last_name: "",
          
          email: "",
          password: "",
          password2: ""
        });
        setError("");
      } else {
        // const errorData = await response.json();
        console.error('Error:', data);
        setError(data.detail || 'An error occured')
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
            value={formData.first_name}
            onChange={handleChange}
            required
            
             
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            
             
          />
        </div>

        {/* Email */}
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
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
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Submit Button */}
        <div>
          <Button type='primary'>Sign up</Button>
        </div>
      </form>
    </main>
  );
}
