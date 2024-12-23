import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const DashBoard = () => {
  const [plants, setPlants] = useState([]);
  const socket = io('http://localhost:8080');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('/api/plants');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();

    socket.on('newPlantData', (data) => {
      console.log('Real-time Data:', data);
      setPlants((prev) =>
        prev.map((plant) => (plant._id === data._id ? { ...plant, ...data } : plant))
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {plants.map((plant) => (
          <li key={plant._id}>
            {plant.name} - Temp: {plant.temperature}°C - Humidity: {plant.humidity}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashBoard;
