import React, { useState } from 'react';
import './stress.css';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, Paper } from '@mui/material';
import SideNavBar from '../../components/sidenav/SideNavbar';

const StressQuestionnaire = () => {
  const [stressors, setStressors] = useState('');
  const [copingMethod, setCopingMethod] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleSubmit = () => {
    // Here you would typically send the data to a backend API
    // For this example, we'll just set some mock recommendations
    setRecommendations(`Based on your input, we recommend:
    1. Continue with ${copingMethod}
    2. Try to address your stressor: ${stressors}
    3. Consider speaking with a professional about stress management`);
  };

    return (
      <div className='stress-container'>
            <SideNavBar />
    <Paper elevation={3} style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Stress Management Questionnaire
      </Typography>
      <Typography variant="body1" gutterBottom>
        Answer the following questions to assess your stress level and receive personalized recommendations.
      </Typography>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          label="What is causing you stress?"
          variant="outlined"
          value={stressors}
          onChange={(e) => setStressors(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1">How do you usually cope with stress?</Typography>
        <RadioGroup value={copingMethod} onChange={(e) => setCopingMethod(e.target.value)}>
          <FormControlLabel value="Exercise" control={<Radio />} label="Exercise" />
          <FormControlLabel value="Meditation" control={<Radio />} label="Meditation" />
          <FormControlLabel value="Talking to a friend" control={<Radio />} label="Talking to a friend" />
        </RadioGroup>
      </div>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Get Recommendations
      </Button>

      {recommendations && (
        <Paper elevation={1} style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Recommendations:
          </Typography>
          <Typography variant="body1">{recommendations}</Typography>
        </Paper>
      )}
            </Paper>
            </div>
  );
};

export default StressQuestionnaire;
