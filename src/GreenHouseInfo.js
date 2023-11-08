// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';  // Updated import for STOMP client


const GreenHouse = () => {

    // States for min and max  levels
    const [minWaterLevel, setMinWaterLevel] = useState('')
    const [maxWaterLevel, setMaxWaterLevel ] = useState('')

    const [minFertilizeLevel, setMinFertilizeLevel] = useState('')
    const [maxFertilizeLevel, setMaxFertilizeLevel] = useState('')

    const [greenHouseData, setGreenHouseData] = useState(null);  // State to hold GreenHouse data
    
    const [newLightLevel, setnewLightLevel] = useState('');

    useEffect(() => {
        // Existing Axios call to initially load GreenHouse data
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

        axios.put(`/api/green-house/1/water-level`, { min: minWaterLevel, max: maxWaterLevel }) //min + max --> names for the controller
            .then(response => {
                console.log('Water params updated: ', response.data);
                setGreenHouseData(response.data);
            })
            .catch(error => {
                console.error('There was an error updating the water level: ', error);
            });
    };

    const handleUpdateFertilizeLevel = () => {
        // Use state values for min and max fertilize levels
        axios.put(`/api/green-house/1/fertilize-level`, { min: minFertilizeLevel, max: maxFertilizeLevel })
            .then(response => {
                console.log("Fertilizer params updated: ", response.data);
                setGreenHouseData(response.data); // Update the state with the new greenhouse data
            })
            .catch(error => {
                console.error("There was an error updating the fertilize level: ", error);
            });
    };

    const handleUpdateLightLevel = () => {

        
        axios.put(`/api/green-house/1/light-level`, {newLevel: newLightLevel})
        .then(response => {
            setGreenHouseData(response.data);
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
                
                {/* Inputs for min and max water levels */}
                <input
                    type="number"
                    value={minWaterLevel}
                    onChange={e => setMinWaterLevel(e.target.value)}
                    placeholder="Enter min water level"
                />
                <input
                    type="number"
                    value={maxWaterLevel}
                    onChange={e => setMaxWaterLevel(e.target.value)}
                    placeholder="Enter max water level"
                />
                <button onClick={handleUpdateWaterLevel}>Set Water Level Range</button>
                <p></p>
                <input
                    type="number"
                    value={minFertilizeLevel}
                    onChange={e => setMinFertilizeLevel(e.target.value)}
                    placeholder="Enter min fertilize level"
                />
                <input
                    type="number"
                    value={maxFertilizeLevel}
                    onChange={e => setMaxFertilizeLevel(e.target.value)}
                    placeholder="Enter max fertilize level"
                />
                <button onClick={handleUpdateFertilizeLevel}>Set Fertilize Level Range</button>
                
                
            </div>
        ) : (
            <p>Loading GreenHouse...</p>
        )}
    </div>
    );
};

export default GreenHouse;
