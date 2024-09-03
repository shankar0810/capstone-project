import React, { useState } from 'react';
import axios from 'axios';
import './nutrition.css';
import NutritionTable from './NutritionTable';
import SideNavbar from '../../components/sidenav/SideNavbar';
import { useNavigate } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { Dashboard } from '@mui/icons-material';

function Nutrition() {
    const [nutritionalData, setNutritionalData] = useState(null);
    const [ingredient, setIngredient] = useState('');
    const [loading, setLoading] = useState(false);
    const [energy, setEnergy] = useState(null);// Add loading state

    const navigate = useNavigate();

    const fetchNutritionData = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await axios.post('http://localhost:9999/nutrition', {
                ingredient: ingredient
            });
            setNutritionalData(response.data);
            const nutritionData = JSON.parse(response.data.nutritionInfo);
            const energyValue = nutritionData.totalNutrients.ENERC_KCAL.quantity;
            setEnergy(energyValue);
            let existingEnergy = localStorage.getItem('energy');
            if (existingEnergy) {
                existingEnergy = parseFloat(existingEnergy);
                // Add the new energy value to the existing one
                existingEnergy += energyValue;
            } else {
                // If no existing energy, use the new value
                existingEnergy = energyValue;
            }

            // Save the updated energy value to local storage
            localStorage.setItem('energy', existingEnergy);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const navigateToDietPlan = () => {
        navigate('/diet-plan'); // Navigate to Diet Plan page
    };

    return (
        <div className="nutriton-container">
            <SideNavbar />
            <div className="main-content1">
                <h1 className="nutrition-h1">Nutrition Analysis</h1>
                <div className="nutrition-form-group">
                    <input
                        type="text"
                        className="nutrition-form-control"
                        placeholder="Enter ingredient (eg. 2 idli, 1 chicken piece)"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                    /><br />
                    <button className="nutrition-btn" onClick={fetchNutritionData} disabled={loading}>
                        {loading ? 'Analyzing...' : 'Analyse'}
                    </button>
                    <h2 className="nutrition-h2">or</h2>
                    <button className="nutrition-btn1" onClick={navigateToDietPlan} disabled={loading}>
                        Recommend a Diet Plan
                    </button>
                </div>
                {/* Display the loader while data is being fetched */}
                {loading ? (
                    <div className="loader-container">
                        <BounceLoader color="#2850b2" size={60} />
                    </div>
                ) : (
                    nutritionalData && <NutritionTable data={nutritionalData} />
                )}
            </div>
            
        </div>
    );
}

export default Nutrition;
