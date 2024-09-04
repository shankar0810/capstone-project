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

const bodyParts = [
  "abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system", 
  "delts", "forearms", "glutes", "hamstrings", "lats", "levator scapulae", 
  "pectorals", "quads", "serratus anterior", "spine", "traps", "triceps", "upper back"
];

const ExerciseRecommendation = () => {
  const [bodyPart, setBodyPart] = useState('');
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`http://localhost:9999/recommendations/${bodyPart}`);
      const data = await response.json();
      const formattedData = data.map((exercise) => ({
        Name: exercise.name,
        Target: exercise.target,
        Equipment: exercise.equipment,
        "Secondary Muscles": exercise.secondaryMuscles.join(', '),
        Instructions: exercise.instructions.join('. '),
        "GIF": <a href={exercise.gifUrl} target="_blank" rel="noopener noreferrer">View</a>,
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error('Error fetching exercises:', error);
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
            <h2 className="exercise-recommendation__title">Recommendations for Exercises</h2>
            <select
              className="exercise-recommendation__input"
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
            >
              <option value="" disabled>Select Body Part</option>
              {bodyParts.map((part, index) => (
                <option key={index} value={part}>{part}</option>
              ))}
            </select>
            <button
              className="exercise-recommendation__button"
              onClick={handleRecommend}
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Loading...' : 'Recommend'}
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
              <h3 className="exercise-recommendation__table-title">Table Data</h3>
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

export default ExerciseRecommendation;
