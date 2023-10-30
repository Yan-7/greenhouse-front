import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WaterLevel = () => {
    const [waterLevel, setWaterLevel] = useState(null);
    const [newLevel, setNewLevel] = useState('');

    // const id = 1;  // Assume the id of the water level record is 1 for this example

    useEffect(() => {
        // Fetch the current water level on component mount
        axios.get(`/api/water-level/1`)
            .then(response => {
                // console.log("response axios: " + response.data);
                setWaterLevel(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the water level!', error);
            });
    }, []);

    const handleUpdate = () => {
        // Update the water level when the Update button is clicked
        axios.put(`/api/water-level/1?newLevel=${newLevel}`)
            .then(response => {
                console.log("reponse update: " + response.data.waterLevel);
                setWaterLevel(response.data.waterLevel);
            })
            .catch(error => {
                console.error('There was an error updating the water level!', error);
            });

    };

    return (
        <div>
            {waterLevel ? (
                <div>
                    <h1>Current Water Level: {waterLevel} mm</h1>
                    <input
                        type="number"
                        value={newLevel}
                        onChange={e => setNewLevel(e.target.value)}
                        placeholder="Enter new water level"
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            ) : (
                <p>Loading water level...</p>
            )}
        </div>
    );
};

export default WaterLevel;
