import React, { useState } from "react";
import styles from './Signup.module.css';
import Button from "../components/Button";
import PageNavigation from "../components/PageNavigation";

export default function Signup() {
  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirmPassword match
    if (formData.password !== formData.password2) {
      setError("Passwords do not match!");
      return;
    }

    
    console.log("Form Submitted", formData);
    try {
      const response = await fetch('http://127.0.0.1:8000/dj-rest-auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile created successfully:', data);
        // Optionally reset the form or show success message
       
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        setError("");
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  return (
    <main className={styles.login}>
      <PageNavigation />
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Username */}
        <div className={styles.row}>
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
