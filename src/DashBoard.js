// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GreenHouse.css';


const DashBoard = () => {

    const [greenHouseData, setGreenHouseData] = useState(null);  // State to hold GreenHouse data
    // States for min and max  levels
    const [minWaterLevel, setMinWaterLevel] = useState('')
    const [maxWaterLevel, setMaxWaterLevel ] = useState('')

    const [minFertilizeLevel, setMinFertilizeLevel] = useState('')
    const [maxFertilizeLevel, setMaxFertilizeLevel] = useState('')
    
    const [lightLevel, setLightLevel] = useState('');
    const [lightOn, setLightOn] = useState('');
    const [lightOff, setLightOff] = useState('')
    
    const fetchData = () => {
        axios.get(`/api/green-house/1`)
            .then(response => {
                console.log("response axios green-house: ", response.data);
                setGreenHouseData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the Green House', error);
            });
    }

    useEffect(() => {
        fetchData(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchData(); // Fetch data every 10 seconds
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
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
        // Convert HH:mm format into seconds since midnight
        const converToSeconds = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 3600 + minutes * 60;
        }
        axios.put(`/api/green-house/1/light-level`, {
        on: converToSeconds(lightOn),
        off: converToSeconds(lightOff),
        level: parseInt(lightLevel,10) // Ensure lightLevel is sent as a number
        })
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
                
        <div className="greenhouse-container">
            {greenHouseData ? (
                <div>
                    <h1>Green House Info</h1>
                    <div className="data-display">
                        <p><strong>Water Level:</strong> {greenHouseData.waterLevel} mm</p>
                        <p><strong>Min/Max Water:</strong> {greenHouseData.minWater} / {greenHouseData.maxWater} mm</p>
                        <p><strong>Fertilize Level:</strong> {greenHouseData.fertilizeLevel} units</p>
                        <p><strong>Min/Max Fertilize:</strong> {greenHouseData.minFertilize} / {greenHouseData.maxFertilize} units</p>
                        <p><strong>Light Level:</strong> {greenHouseData.lightLevel} lux</p>
                        <p><strong>Light On/Off:</strong> {greenHouseData.lightonTime} / {greenHouseData.lightOffTime}</p>
                    </div>
                    <div className="controls">
                        {/* Inputs for min and max water levels */}
                    
                    </div>
                </div>
            ) : (
                <p>Loading GreenHouse...</p>
            )}
        </div>
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
                
                <p></p>
                light on:
                <input
                    type="time"
                    value={lightOn}
                    onChange={e => setLightOn(e.target.value)}
                    placeholder='turn on time'
                />
                light off:
                <input
                    type='time'
                    value={lightOff}
                    onChange={e => setLightOff(e.target.value)}
                    placeholder='turn off time'
                />
                <input
                    type='number'
                    value={lightLevel}
                    onChange={e => setLightLevel(e.target.value)}
                    placeholder='enter light level'
                />
                <button onClick={handleUpdateLightLevel}>Set light parameters</button>
            </div>
        ) : (
            <p>Loading GreenHouse...</p>
        )}
    </div>
    );
};

export default DashBoard;
