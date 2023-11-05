// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';  // Updated import for STOMP client


const GreenHouse = () => {
    const [greenHouseData, setGreenHouseData] = useState(null);  // State to hold GreenHouse data
    const [newWaterLevel, setNewWaterLevel] = useState('');  // New state variable for the new water level
    const [newFertilizeLevel, setNewFertilizeLevel] =useState('');
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

        // // New WebSocket connection setup
        // const socket = new SockJS('/ws');
        // const stompClient = new Client({
        //     webSocketFactory: () => socket,  // Updated STOMP client setup
        // });

        // stompClient.onConnect = (frame) => {
        //     stompClient.subscribe('/topic/greenHouse', (update) => {
        //         setGreenHouseData(JSON.parse(update.body));
        //     });
        // };

        // stompClient.activate();  // Updated connection method

        // // Cleanup function to disconnect the STOMP client when the component is unmounted
        // return () => {
        //     stompClient.deactivate();  // Updated disconnection method
        // };
    }, []);

    const handleUpdateWaterLevel = () => {
        axios.put(`/api/green-house/1/water-level`, { newLevel: newWaterLevel })
            .then(response => {
                console.log('Water level updated: ', response.data);
                setGreenHouseData(response.data);
            })
            .catch(error => {
                console.error('There was an error updating the water level: ', error);
            });
    };

    const handleUpdateFertilizeLevel = () => {
        axios.put(`/api/green-house/1/fertilize-level`, { newLevel: newFertilizeLevel })
        .then(response => {
            setGreenHouseData(response.data);
            console.log("fertilizer level updated to: " + response.data);
        })
        .catch(error => {
            console.log("error fetching fertilize level: " , error );
        })
    }

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
