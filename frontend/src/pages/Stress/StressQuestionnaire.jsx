import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BounceLoader from 'react-spinners/BounceLoader'; // Import BounceLoader
import './stress.css'; // Create a corresponding CSS file
import SideNavBar from '../../components/sidenav/SideNavbar';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, Paper } from '@mui/material';

const StressQuestionnaire = () => {
  const [formData, setFormData] = useState({
    stressors: '',
    copingMethod: 'Exercise' // Default selection
  });

  const [recommendations, setRecommendations] = useState('');
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
      geminiKey: 'AIzaSyCFuEkMDyIOBOJ2rWGm3bBmpAP5i0VZG8g' // Replace with your actual API key
    };

    try {
      const response = await axios.get('http://localhost:9999/recommendations/stress', {
        params: mergedData
      });

      const content = response.data.candidates[0].content.parts[0].text;
      setRecommendations(content); // Extract the text content and set it to the state
    } catch (error) {
      console.error('Error generating stress management recommendations!', error);
      setError('Failed to generate stress management recommendations. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="stress-questionnaire-container1">
      <SideNavBar />
      <div className="stress-questionnaire-container">
        <Typography variant="h4" component="h1" gutterBottom>
          Stress Management Questionnaire
        </Typography>
        <form className="stress-questionnaire-form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="What is causing you stress?"
            variant="outlined"
            name="stressors"
            value={formData.stressors}
            onChange={handleChange}
            required
            className="stress-input"
          />
          <RadioGroup
            name="copingMethod"
            value={formData.copingMethod}
            onChange={handleChange}
            className="stress-input"
          >
            <FormControlLabel value="Exercise" control={<Radio />} label="Exercise" />
            <FormControlLabel value="Meditation" control={<Radio />} label="Meditation" />
            <FormControlLabel value="Yoga" control={<Radio />} label="Yoga" />
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="submit-button"
          >
            Get Recommendations
          </Button>
        </form>

        {loading && (
          <div className="loader-container">
            <BounceLoader color="#2850b2" />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {recommendations && (
          <Paper elevation={1} className="stress-recommendations-content">
            <Typography variant="h6" component="h2" gutterBottom>
              Your Stress Management Recommendations
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: recommendations }} />
          </Paper>
        )}
      </div>
    </div>
  );
};

export default StressQuestionnaire;
