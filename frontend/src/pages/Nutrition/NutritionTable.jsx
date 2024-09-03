import React from 'react';

function NutritionTable({ data }) {
    const nutritionInfo = JSON.parse(data.nutritionInfo);  // Parse the JSON string
    const { totalNutrients, totalDaily } = nutritionInfo;

    return (
        <div className="nutritiontb-container">
            <h2 className="nutritiontb-h2">Nutrition Information</h2>
            {totalNutrients ? (
                <table className="nutritiontb-table table-striped">
                    <thead>
                        <tr>
                            <th>Nutrient</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(totalNutrients).map(([key, nutrient]) => (
                            <tr key={key}>
                                <td>{nutrient.label}</td>
                                <td>{nutrient.quantity}</td>
                                <td>{nutrient.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No nutrient data available.</p>
            )}
            
            <h3 className="nutritiontb-h3 mt-4">Daily Values</h3>
            {totalDaily ? (
                <table className="nutritiontb-table table-striped">
                    <thead>
                        <tr>
                            <th>Nutrient</th>
                            <th>Daily Value</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(totalDaily).map(([key, nutrient]) => (
                            <tr key={key}>
                                <td>{nutrient.label}</td>
                                <td>{nutrient.quantity}</td>
                                <td>{nutrient.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No daily values data available.</p>
            )}
        </div>
    );
}

export default NutritionTable;
