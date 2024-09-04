import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BounceLoader from 'react-spinners/BounceLoader'; // Import BounceLoader
import './DietPlanForm.css';
import SideNavBar from '../../components/sidenav/SideNavbar';

const DietPlanForm = () => {
  const [formData, setFormData] = useState({
    medicalConditions: '',
    foodAllergies: '',
    dietPreference: '',
    howManyMealsPerDay: '',
    howMuchCaloriesIWantToHit: '',
    foodsYouDislike: ''
  });
  
  const [dietPlan, setDietPlan] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from local storage
        const userResponse = await fetch(`http://localhost:9999/health/userdata/${userId}`);
        const userdata = await userResponse.json();
        setUserData(userdata);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Reset error state

    if (!userData) {
      setError('User data not available.');
      setLoading(false);
      return;
    }

    const mergedData = {
      ...formData,
      age: userData.age,
      gender: userData.gender,
      height: userData.height,
      currentWeight: userData.weight,
      dietPreference: userData.dietaryPreferences,
      primaryHealthAndNutritionGoals: userData.goal
    };

    try {
      const response = await axios.get('http://localhost:9999/recommendations/diet', {
        params: {
          ...mergedData,
          geminiKey: 'AIzaSyCFuEkMDyIOBOJ2rWGm3bBmpAP5i0VZG8g' 
        }
      });
      const content = response.data.candidates[0].content.parts[0].text;
      setDietPlan(content);
    } catch (error) {
      console.error('Error generating the diet plan!', error);
      setError('Failed to generate the diet plan. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="diet-plan-container1">
      <SideNavBar />
      <div className="diet-plan-container">
        <h1>Generate Your Custom Diet Plan</h1>
        <form className="diet-plan-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="medicalConditions"
            placeholder="Medical Conditions eg.(High Blood Pressure, Healthy etc.)"
            value={formData.medicalConditions}
            onChange={handleChange}
          />
          <input
            type="text"
            name="foodAllergies"
            placeholder="Food Allergies eg.(any allergies)"
            value={formData.foodAllergies}
            onChange={handleChange}
          />
          <input
            type="number"
            name="howManyMealsPerDay"
            placeholder="Meals Per Day"
            value={formData.howManyMealsPerDay}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="howMuchCaloriesIWantToHit"
            placeholder="Calories Per Day"
            value={formData.howMuchCaloriesIWantToHit}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="foodsYouDislike"
            placeholder="Foods You Dislike"
            value={formData.foodsYouDislike}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>Generate Diet Plan</button>
        </form>

        {loading && (
          <div className="loader-container">
            <BounceLoader color="#2850b2" />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {dietPlan && (
          <div className="diet-plan-content">
            <h2>Your Custom Diet Plan</h2>
            <div dangerouslySetInnerHTML={{ __html: dietPlan }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlanForm;
