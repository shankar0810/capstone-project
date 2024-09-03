import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BounceLoader from 'react-spinners/BounceLoader';
import SideNavBar from '../../components/sidenav/SideNavbar';
import './exercise.css';

const ActivityForm = () => {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitActivity = async () => {
    setLoading(true); // Start loading
    try {
      // Fetch user data from the endpoint
      const userId = localStorage.getItem('userId'); // Get userId from local storage
      const userResponse = await fetch(`http://localhost:9999/health/userdata/${userId}`);
      const userdata = await userResponse.json();

      // Fetch activity data from the endpoint
      const response = await fetch('http://localhost:9999/activity/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityName: activity,
          weight: userdata.weight, // Use the weight fetched from the user data
          duration: duration, // Dynamic duration
        }),
      });
        

      const data = await response.json();
      const formattedData = data.map((activityData) => ({
        Activity: activityData.activityName,
        "Total Calories": activityData.totalCalories,
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="sideNavBar-exercise">
      <SideNavBar />
      <div className="exercise-recommendation">
        <div className="exercise-recommendation__inputs">
          <div className="exercise-recommendation__input-card">
            <h2 className="exercise-recommendation__title">Enter an activity</h2>
            <input
              type="text"
              placeholder="Activity name (e.g., cycling)"
              className="exercise-recommendation__input"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              disabled={loading} // Disable the input while loading
            />
            <input
              type="text"
              placeholder="Duration (in minutes)"
              className="exercise-recommendation__input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={loading} // Disable the input while loading
            />
            <button
              className="exercise-recommendation__button"
              onClick={handleSubmitActivity}
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
        
        {/* Display the loader while data is being fetched */}
        {loading ? (
          <div className="loader-container">
            <BounceLoader color="#2850b2" size={60} />
          </div>
        ) : (
          tableData && (
            <div className="exercise-recommendation__table-container">
              <h3 className="exercise-recommendation__table-title">Activity Data</h3>
              <TableContainer component={Paper}>
                <Table className="exercise-recommendation__table">
                  <TableHead>
                    <TableRow>
                      {Object.keys(tableData[0]).map((header) => (
                        <TableCell key={header}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, cellIndex) => (
                          <TableCell key={cellIndex}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ActivityForm;
