import React, { useState } from "react";
import styles from './Signup.module.css'
import Button from "../components/Button";
import PageNavigation from "../components/PageNavigation";

export default function Signup() {
  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Error state
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Proceed with form submission (e.g., send to backend)
    console.log("Form Submitted", formData);
    
    // Reset form and error after successful submission
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setError("");
  };

  return (
    <main className={styles.login}>
      <PageNavigation />
      
      <form onSubmit={handleSubmit} className={styles.form} >
        {/* Username */}
        <div  className={styles.row}>
          <label htmlFor="username">Username</label>
          <input
          id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div  className={styles.row}>
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
        <div  className={styles.row}>
          <label htmlFor="password1">Password</label>
          <input
          id="password1"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div >
          <label htmlFor="password2">Confirm Password</label>
          <input
          id="password2"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
};


