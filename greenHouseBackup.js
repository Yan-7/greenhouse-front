import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GreenHouse.css';

// GreenHouseComponent receives greenhouseId as a prop
const GreenHouseComponent = ({ greenhouseId }) => {
        // State hooks for various greenhouse parameters
    const [greenHouseData, setGreenHouseData] = useState(null);
    const [minWaterLevel, setMinWaterLevel] = useState('');
    const [maxWaterLevel, setMaxWaterLevel] = useState('');
    const [minFertilizeLevel, setMinFertilizeLevel] = useState('');
    const [maxFertilizeLevel, setMaxFertilizeLevel] = useState('');
    const [lightLevel, setLightLevel] = useState('');
    const [lightOn, setLightOn] = useState('');
    const [lightOff, setLightOff] = useState('');
    // useEffect hook to fetch and periodically update greenhouse data
    useEffect(() => {

        if (greenhouseId === 0) {
            console.error('Invalid Greenhouse ID: 0');
            return; // Exit early if the greenhouse ID is 0
        }
        // Function to fetch data from the server
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/green-house/${greenhouseId}`);
                setGreenHouseData(response.data);
            } catch (error) {
                console.error(`There was an error fetching Green House ${greenhouseId}:`, error);
            }
        };

        fetchData();
        // Setting up a timer to periodically fetch data
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, [greenhouseId]);
        // Handlers for updating greenhouse settings
    const handleUpdateWaterLevel = () => {
        axios.put(`/api/green-house/${greenhouseId}/water-level`, { min: minWaterLevel, max: maxWaterLevel })
            .then(response => {
                console.log('Water params updated: ', response.data);
                setGreenHouseData(response.data);
            })
            .catch(error => {
                console.error('There was an error updating the water level: ', error);
            });
    };

    const handleUpdateFertilizeLevel = () => {
        axios.put(`/api/green-house/${greenhouseId}/fertilize-level`, { min: minFertilizeLevel, max: maxFertilizeLevel })
            .then(response => {
                console.log("Fertilizer params updated: ", response.data);
                setGreenHouseData(response.data);
            })
            .catch(error => {
                console.error("There was an error updating the fertilize level: ", error);
            });
    };

    const handleUpdateLightLevel = () => {
        const converToSeconds = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 3600 + minutes * 60;
        };

        axios.put(`/api/green-house/${greenhouseId}/light-level`, {
            on: converToSeconds(lightOn),
            off: converToSeconds(lightOff),
            level: parseInt(lightLevel, 10)
        })
        .then(response => {
            setGreenHouseData(response.data);
            console.log("Light level updated: ", response.data);
        })
        .catch(error => {
            console.error("Error updating light level: ", error);
        });
    };
    return (
        <div className="greenhouse-container">
            {greenHouseData ? (
                <div>
                    <h1>Green House {greenhouseId} Info</h1>
                    <div className="data-display">
                        <p><strong>Water Level:</strong> {greenHouseData.waterLevel} mm</p>
                        <p><strong>Min/Max Water:</strong> {greenHouseData.minWater} / {greenHouseData.maxWater} mm</p>
                        <p><strong>Fertilize Level:</strong> {greenHouseData.fertilizeLevel} units</p>
                        <p><strong>Min/Max Fertilize:</strong> {greenHouseData.minFertilize} / {greenHouseData.maxFertilize} units</p>
                        <p><strong>Light Level:</strong> {greenHouseData.lightLevel} lux</p>
                        <p><strong>Light On/Off:</strong> {greenHouseData.lightonTime} / {greenHouseData.lightOffTime}</p>
                    </div>
                    <div className="controls">
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

                        <div className="light-controls">
                            <label>Light On:</label>
                            <input
                                type="time"
                                value={lightOn}
                                onChange={e => setLightOn(e.target.value)}
                            />
                            <label>Light Off:</label>
                            <input
                                type='time'
                                value={lightOff}
                                onChange={e => setLightOff(e.target.value)}
                            />
                            <input
                                type='number'
                                value={lightLevel}
                                onChange={e => setLightLevel(e.target.value)}
                                placeholder='Enter light level'
                            />
                            <button onClick={handleUpdateLightLevel}>Set Light Parameters</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading GreenHouse {greenhouseId} Data...</p>
            )}
        </div>
    );
};

export default GreenHouseComponent;
