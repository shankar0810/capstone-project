// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SideNavBar from '../../components/sidenav/SideNavbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTint, faHeartbeat, faFireAlt, faChartPie, faWeight } from '@fortawesome/free-solid-svg-icons';
// import GaugeChart from 'react-gauge-chart';
// import './dashboard.css'; // Import the CSS file

// const HealthDashboard = () => {
//     const [waterIntake, setWaterIntake] = useState(null);
//     const [heartRate, setHeartRate] = useState(null);
//     const [dailyCalorie, setDailyCalorie] = useState(null);
//     const [macronutrients, setMacronutrients] = useState(null);
//     const [bmi, setBmi] = useState(null); // New state for BMI
//     const [username, setUsername] = useState(''); // New state for Username
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchHealthData = async () => {
//             const userId = localStorage.getItem('userId');

//             if (!userId) {
//                 setError('User ID missing');
//                 return;
//             }

//             try {
//                 // Fetch the user details
//                 const userResponse = await axios.get(`http://localhost:9999/user/${userId}`);
//                 const userData = userResponse.data;
//                 setUsername(userData.username); // Set the username

//                 //Fetch other health data
//                 // const waterIntakeResponse = await axios.get(`http://localhost:9999/health/water-intake/${userId}`);
//                 // setWaterIntake(waterIntakeResponse.data);

//                 // const heartRateResponse = await axios.get(`http://localhost:9999/health/heart-rate/${userId}`);
//                 // setHeartRate(heartRateResponse.data);

//                 const dailyCalorieResponse = await axios.get(`http://localhost:9999/health/daily-caloric-intake/${userId}`);
//                 setDailyCalorie(dailyCalorieResponse.data);

//                 // console.log(dailyCalorieResponse);

//                 // const macronutrientResponse = await axios.get(`http://localhost:9999/health/macro-nutrients/${userId}`);
//                 // setMacronutrients(macronutrientResponse.data);

//                 // Fetch BMI data
//                 const bmiResponse = await axios.get(`http://localhost:9999/health/bmi/${userId}`);
//                 setBmi(bmiResponse.data);

//             } catch (err) {
//                 console.error('Error fetching health data:', err);
//                 setError('Failed to fetch health data');
//             }
//         };

//         fetchHealthData();
//     }, []);

//     // Determine the color based on BMI category
//     const getColor = (category) => {
//         switch (category) {
//             case 'Underweight':
//                 return '#ff6f61';
//             case 'Normal weight':
//                 return '#4caf50';
//             case 'Overweight':
//                 return '#ff9800';
//             case 'Obesity':
//                 return '#f44336';
//             default:
//                 return '#2196f3';
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <SideNavBar />
//             <div className="main-content4">
//                 <h1 className="dashboard-title">Hi {username}, Welcome to your Health Dashboard</h1>
//                 {error && <p className="error-message">{error}</p>}
//                 <div className="dashboard-grid">
//                     <div className="dashboard-card water-intake">
//                         <FontAwesomeIcon icon={faTint} className='icon-water'/>
//                         <h2>Water Intake</h2>
//                         {waterIntake ? (
//                             <p>Water Intake: {waterIntake.water_intake} {waterIntake.unit}</p>
//                         ) : (
//                             <p>Loading water intake data...</p>
//                         )}
//                     </div>
//                     <div className="dashboard-card heart-rate">
//                         <FontAwesomeIcon icon={faHeartbeat} className='icon-heart'/>
//                         <h2>Target Heart Rate</h2>
//                         {heartRate ? (
//                             <div>
//                                 <p>Max Heart Rate: {heartRate.thr_max}</p>
//                                 <p>Min Heart Rate: {heartRate.thr_min}</p>
//                             </div>
//                         ) : (
//                             <p>Loading target heart rate data...</p>
//                         )}
//                     </div>
//                     <div className="dashboard-card daily-calorie">
//                         <FontAwesomeIcon icon={faFireAlt} className='icon-calorie'/>
//                         <h2>Daily Caloric Needs</h2>
//                         {dailyCalorie ? (
//                             <div>
//                                 <p>Calories: {dailyCalorie.caloric_needs.calories}</p>
//                             </div>
//                         ) : (
//                             <p>Loading daily caloric needs data...</p>
//                         )}
//                     </div>
//                     <div className="dashboard-card macronutrients">
//                         <FontAwesomeIcon icon={faChartPie} className='icon-nutrients'/>
//                         <h2>Macronutrient Distribution</h2>
//                         {macronutrients ? (
//                             <div>
//                                 <p>Carbohydrates: {macronutrients.carbohydrates}</p>
//                                 <p>Fats: {macronutrients.fats}</p>
//                                 <p>Proteins: {macronutrients.proteins}</p>
//                             </div>
//                         ) : (
//                             <p>Loading macronutrient data...</p>
//                         )}
//                     </div>
//                     <div className="dashboard-card bmi">
//                         <FontAwesomeIcon icon={faWeight} className='icon-bmi' />
//                         <h2>BMI</h2>
//                         {bmi ? (
//                             <div>
//                                 <GaugeChart
//                                     id="bmi-gauge"
//                                     nrOfLevels={10}
//                                     percent={bmi.bmi / 50} // Adjust this value based on the expected BMI range
//                                     needleColor="#ff5722"
//                                     arcColor={getColor(bmi.category)}
//                                     textColor="#000000"
//                                     formatTextValue={() => `BMI: ${bmi.bmi.toFixed(2)}`}
//                                     style={{ height: '200px' }}
//                                 />
//                                 <p>Category: {bmi.category}</p>
//                             </div>
//                         ) : (
//                             <p>Loading BMI data...</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HealthDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavBar from '../../components/sidenav/SideNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faHeartbeat, faFireAlt, faChartPie, faWeight } from '@fortawesome/free-solid-svg-icons';
import GaugeChart from 'react-gauge-chart';
import './dashboard.css';
import { Gauge } from '@mui/x-charts/Gauge';// Import the CSS file

const HealthDashboard = (  ) => {
    const [waterIntake, setWaterIntake] = useState(null);
    const [heartRate, setHeartRate] = useState(null);
    const [dailyCalorie, setDailyCalorie] = useState(null);
    const [macronutrients, setMacronutrients] = useState(null);
    const [bmi, setBmi] = useState(null); // New state for BMI
    const [username, setUsername] = useState(''); // New state for Username
    const [error, setError] = useState(null);
    const [energy, setEnergy] = useState(null);
    const [calorieburned,setCalorieburned]=useState(null);
    useEffect(() => {
        const fetchHealthData = async () => {
            const userId = localStorage.getItem('userId');
            const storedEnergy = localStorage.getItem('energy');
            setEnergy(storedEnergy);
            const storedCaloriesBurned = localStorage.getItem('calorie');
            setCalorieburned(storedCaloriesBurned ? storedCaloriesBurned : 0);
            
            
            
            

            if (!userId) {
                setError('User ID missing');
                return;
            }

            try {
                // Fetch the user details
                const userResponse = await axios.get(`http://localhost:9999/user/${userId}`);
                const userData = userResponse.data;
                setUsername(userData.username); // Set the username

                // //Fetch other health data
                // const waterIntakeResponse = await axios.get(`http://localhost:9999/health/water-intake/${userId}`);
                // setWaterIntake(waterIntakeResponse.data);

                // const heartRateResponse = await axios.get(`http://localhost:9999/health/heart-rate/${userId}`);
                // setHeartRate(heartRateResponse.data);

                const dailyCalorieResponse = await axios.get(`http://localhost:9999/health/daily-caloric-intake/${userId}`);
                setDailyCalorie(dailyCalorieResponse.data);

                // console.log(dailyCalorieResponse);

                // const macronutrientResponse = await axios.get(`http://localhost:9999/health/macro-nutrients/${userId}`);
                // setMacronutrients(macronutrientResponse.data);

                // Fetch BMI data
                const bmiResponse = await axios.get(`http://localhost:9999/health/bmi/${userId}`);
                setBmi(bmiResponse.data);

            } catch (err) {
                console.error('Error fetching health data:', err);
                setError('Failed to fetch health data');
            }
        };

        fetchHealthData();
    }, []);

    // Determine the color based on BMI category
    const getColor = (category) => {
        switch (category) {
            case 'Underweight':
                return '#ff6f61';
            case 'Normal weight':
                return '#4caf50';
            case 'Overweight':
                return '#ff9800';
            case 'Obesity':
                return '#f44336';
            default:
                return '#2196f3';
        }
    };

    

    const calculateNetCaloriePercentage = () => {
        if (!dailyCalorie.caloric_needs.calories.split(' ')[0]) return 0;
        const netCalories = (energy || 0) - (calorieburned || 0);
        console.log(netCalories);
        console.log(dailyCalorie.caloric_needs.calories.split(' ')[0]);
        const percentage = (netCalories / dailyCalorie.caloric_needs.calories.split(' ')[0]) * 100;
        console.log(percentage);
        return Math.min(Math.max(percentage, 0), 100); // Ensure the percentage is between 0 and 100
    };
   

    return (
        <div className="dashboard-container">
            <SideNavBar />
            <div className="main-content4">
                <h1 className="dashboard-title">Hi {username}, Welcome to your Health Dashboard</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="dashboard-grid">
                    <div className="dashboard-card water-intake">
                        <FontAwesomeIcon icon={faTint} className='icon-water'/>
                        <h2>Water Intake</h2>
                        {waterIntake ? (
                            <p>Water Intake: {waterIntake.water_intake} {waterIntake.unit}</p>
                        ) : (
                            <p>Loading water intake data...</p>
                        )}
                    </div>
                    <div className="dashboard-card heart-rate">
                        <FontAwesomeIcon icon={faHeartbeat} className='icon-heart'/>
                        <h2>Target Heart Rate</h2>
                        {heartRate ? (
                            <div>
                                <p>Max Heart Rate: {heartRate.thr_max}</p>
                                <p>Min Heart Rate: {heartRate.thr_min}</p>
                            </div>
                        ) : (
                            <p>Loading target heart rate data...</p>
                        )}
                    </div>
                    <div className="dashboard-card daily-calorie">
                        <FontAwesomeIcon icon={faFireAlt} className='icon-calorie'/>
                        <h2>Daily Caloric Needs</h2>
                        {dailyCalorie ? (
                            <div>
                                <p>Calories: {dailyCalorie.caloric_needs.calories}</p>
                            </div>
                        ) : (
                            <p>Loading daily caloric needs data...</p>
                        )}
                    </div>
                    <div className="dashboard-card macronutrients">
                        <FontAwesomeIcon icon={faChartPie} className='icon-nutrients'/>
                        <h2>Macronutrient Distribution</h2>
                        {macronutrients ? (
                            <div>
                                <p>Carbohydrates: {macronutrients.carbohydrates}</p>
                                <p>Fats: {macronutrients.fats}</p>
                                <p>Proteins: {macronutrients.proteins}</p>
                            </div>
                        ) : (
                            <p>Loading macronutrient data...</p>
                        )}
                    </div>
                    <div className="dashboard-card bmi">
                        <FontAwesomeIcon icon={faWeight} className='icon-bmi' />
                        <h2>BMI</h2>
                        {bmi ? (
                            <div>
                                <GaugeChart
                                    id="bmi-gauge"
                                    nrOfLevels={10}
                                    percent={bmi.bmi / 50} // Adjust this value based on the expected BMI range
                                    needleColor="#ff5722"
                                    arcColor={getColor(bmi.category)}
                                    textColor="#000000"
                                    formatTextValue={() => `BMI: ${bmi.bmi.toFixed(2)}`}
                                    style={{ height: '200px' }}
                                />
                                <p>Category: {bmi.category}</p>
                            </div>
                        ) : (
                            <p>Loading BMI data...</p>
                        )}
                    </div>
                    <div className="dashboard-card calorie-gauge">
                    <h2>Net Calorie Consumption</h2>
                    {dailyCalorie && (
                        <>
                            <Gauge
                                width={200}
                                height={200}
                                min={0}
                                max={100} // Set max to 100 for percentage
                                value={calculateNetCaloriePercentage()}
                                valueFormatter={(value) => `${value.toFixed(2)}%`}
                            />
                            <p>Daily Goal: {dailyCalorie.caloric_needs.calories} calories</p>
                            <p>Gained: {energy || 0} calories</p>
                            <p>Burned: {calorieburned || 0} calories</p>
                            <p>Net: {((energy || 0) - (calorieburned || 0)).toFixed(2)} calories</p>
                        </>
                    )}
                    {!dailyCalorie && <p>Loading calorie data...</p>}
                </div>
                </div>
            </div>
        </div>
    );
};

export default HealthDashboard;
