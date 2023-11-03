import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GreenHouse = () => {
    const [greenHouseData, setGreenHouseData] = useState(null);
    const [newWaterLevel, setNewWaterLevel] = useState('');  // New state variable for the new water level
    const [newFertilizeLevel, setNewFertilizeLevel] =useState('');
    const [newLightLevel, setnewLightLevel] = useState('');

    useEffect(() => {
        axios.get(`/api/green-house/1`)
            .then(response => {
                console.log("response axios green-house: ", response.data);
                setGreenHouseData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the Green House', error);
            });
    }, []);

    const handleUpdateWaterLevel = () => {
        axios.put(`/api/green-house/1/water-level`, { newLevel: newWaterLevel })  // Assuming newLevel is the parameter name expected by the backend
            .then(response => {
                console.log('Water level updated: ', response.data);
                setGreenHouseData(response.data);  // Update the state with the new GreenHouse data
            })
            .catch(error => {
                console.error('There was an error updating the water level: ', error);
            });
    };
    const handleUpdateFertilizeLevel = () => {
        axios.put(`/api/green-house/1/fertilize-level`, { newLevel: newFertilizeLevel })
        .then(response => {
            setNewFertilizeLevel(response.data);
            console.log("fertilizer level updated to: " + response.data);
        })
        .catch(error => {
            console.log("error fetching fertilize level: " , error );
        })
    }

    const handleUpdateLightLevel = () => {
        axios.put(`/api/green-house/1/light-level`)
        .then(response => {
            setnewLightLevel(response.data)
            console.log("light level updated to: " + response.data);
        })
        .catch(error => {
            console.log("error fetching data: " , error);
        })
    }

    return (
        <div>
            {greenHouseData ? (
                <div>
                    <h1>Current Green House Info:</h1>
                    <p>Water Level: {greenHouseData.waterLevel} mm</p>
                    <p>Fertilize Level: {greenHouseData.fertilizeLevel} units</p>
                    <p>Light Level: {greenHouseData.lightLevel} lux</p>
                    <input
                        type="number"
                        value={newWaterLevel}
                        onChange={e => setNewWaterLevel(e.target.value)}
                        placeholder="Enter new water level"
                    />
                    <button onClick={handleUpdateWaterLevel}>Update Water Level</button>
                    <p></p>
                    <input
                        type="number"
                        value={newFertilizeLevel}
                        onChange={e => setNewFertilizeLevel(e.target.value)}
                        placeholder="Enter new fertilizer level"
                    />
                    <button onClick={handleUpdateFertilizeLevel}>Update Fertilize Level</button>
                    <p></p>
                    <input
                        type="number"
                        value={newLightLevel}
                        onChange={e => setnewLightLevel(e.target.value)}
                        placeholder="Enter new light level"
                    />
                    <button onClick={handleUpdateLightLevel}>Update light Level</button>
                    
                </div>
            ) : (
                <p>Loading GreenHouse...</p>
            )}
        </div>
    );
};

export default GreenHouse;
