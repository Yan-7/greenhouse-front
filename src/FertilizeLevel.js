import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FertilizeLevel = () => {
    const [fLevel, setFLevel] = useState(null);
    const [newLevel, setNewLevel] = useState('');

    // const id = 1;  // Assume the id of the water level record is 1 for this example

    useEffect(() => {
        // Fetch the current water level on component mount
        axios.get(`/api/fertilize-Level/1`)
            .then(response => {
                // console.log("response axios: " + response.data);
                setFLevel(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the water level!', error);
            });
    }, []);

    const handleUpdate = () => {
        // Update the Fertilize level when the Update button is clicked
        axios.put(`/api/fertilize-Level/1?newLevel=${newLevel}`)
            .then(response => {
                setFLevel(response.data.fLevel);
            })
            .catch(error => {
                console.error('There was an error updating the Fertilize level!', error);
            });

    };

    return (
        <div>
            {fLevel ? (
                <div>
                    <h1>Current Water Level: {fLevel} mm</h1>
                    <input
                        type="number"
                        value={newLevel}
                        onChange={e => setNewLevel(e.target.value)}
                        placeholder="Enter new fertilize level"
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            ) : (
                <p>Loading Fertilize level...</p>
            )}
        </div>
    );
};

export default FertilizeLevel;
