import React, { useState } from 'react';
import './profile.css';
import Dashboard from '../Dashboard/Dashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/sidenav/SideNavbar';

const ProfileSetupPopup = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    activityLevel: '',
    fitnessLevel: '',
    climate: '',
    unit: '',
    bodyCompositionalGoal: '',
    dietaryPreferences: '',
    equation: '',
});
const [error, setError] = useState(null);
const [submitted, setSubmitted] = useState(false); // Track submission status
const navigate = useNavigate();

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken'); // Get token from local storage
    const userId = localStorage.getItem('userId'); // Get userId from local storage

    try {
        // Include userId in the userData object
        const dataToPost = { ...formData, userId };

        // Post user data
        await axios.post('http://localhost:9999/health/createuser', dataToPost, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

      // Set submitted to true to trigger data fetching in the dashboard
      
      setSubmitted(true);
      navigate("/dashboard");
      
    } catch (err) {
        console.error('Error posting user data:', err);
        setError('Failed to submit user data');
    }
};

  return (
    <div className="psp-container">
      <SideNavBar />
    <div className="psp-overlay">
      <div className="psp-card">
        <h2 className="psp-title">Setup your Profile</h2>
        <form className="psp-form" onSubmit={handleSubmit}>
          <div className="psp-form-row">
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="psp-input"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="psp-select"
            >
              <option className="psp-option" value="" disabled>Select Gender</option>
              <option className="psp-option" value="male">male</option>
              <option className="psp-option" value="female">female</option>
            </select>
          </div>
          <div className="psp-form-row">
            <input
              type="text"
              placeholder="Height in cm"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="psp-input"
            />
            <input
              type="text"
              placeholder="Weight in kg"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="psp-input"
            />
          </div>
          <div className="psp-form-column">
            <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select Goal</option>
            <option className="psp-option" value="weight_loss">weight_loss</option>
            <option className="psp-option" value="maintenance">maintenance</option>
            <option className="psp-option" value="weight_gain">weight_gain</option>
          </select>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select Activity Level</option>
            <option className="psp-option" value="sedentary">sedentary</option>
            {/* <option className="psp-option" value="lightly_active">lightly_active</option> */}
            <option className="psp-option" value="moderately_active">moderately_active</option>
            <option className="psp-option" value="very_active">very_active</option>
            {/* <option className="psp-option" value="extra_active">extra_active</option> */}
          </select>
          <select
            name="climate"
            value={formData.climate}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select Climate</option>
            <option className="psp-option"value="cold">cold</option>
            <option className="psp-option"value="normal">normal</option>
            <option className="psp-option" value="hot">hot</option>
          </select>
          <select
            name="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select Fitness Level</option>
            <option className="psp-option" value="beginner">beginner</option>
            <option className="psp-option" value="intermediate">intermediate</option>
            <option className="psp-option" value="advanced">advanced</option>
          </select>
          <select
            name="bodyCompositionalGoal"
            value={formData.bodyCompositionalGoal}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select Body Compositional Goal</option>
            <option className="psp-option" value="weight_loss">weight_loss</option>
            <option className="psp-option" value="maintenance">maintenance</option>
            <option className="psp-option" value="muscle_gain">muscle_gain</option>
          </select>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select unit for water-intake</option>
            <option className="psp-option" value="liters">liters</option>
            <option className="psp-option" value="ounces">ounces</option>
          </select>
          <select
            name="equation"
            value={formData.equation}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select equation</option>
            <option className="psp-option" value="mifflin">mifflin</option>
            <option className="psp-option" value="harris">harris</option>
          </select>
          <select
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
            className="psp-select"
          >
            <option className="psp-option" value="" disabled>Select Dietary Preferences</option>
            <option className="psp-option" value="vegan">vegan</option>
            <option className="psp-option" value="vegetarian">vegetarian</option>
            <option className="psp-option" value="gluten-free">gluten-free</option>
            <option className="psp-option" value="pescatarian">pescatarian</option>
          </select>
          </div>
          <button type="submit" className="psp-submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
            {submitted && <Dashboard />} {/* Render dashboard after submission */}
      </div>
      </div>
      </div>
  );
};

export default ProfileSetupPopup;

