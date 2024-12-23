import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './GreenHouse.css'; // Import custom CSS for styling the dashboard

const App = () => {
  const [plants, setPlants] = useState([]); // State to hold plant data
  const [socket, setSocket] = useState(null); // State to hold WebSocket connection
  const [error, setError] = useState(null); // State to manage errors

  /**
   * Fetch plant data from the backend API
   */
  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/plants', {
        withCredentials: true, // Allow CORS credentials
      });
      setPlants(response.data);
      console.log('Fetched plants:', response.data);
    } catch (err) {
      console.error('Error fetching plant data:', err.message);
      setError('Failed to fetch plant data. Please check the server.');
    }
  };

  /**
   * Update plant data and emit changes through WebSocket
   * @param {string} id - Plant ID
   * @param {object} updates - Data to update
   */
  const updatePlant = async (id, updates) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/plants/${id}`,
        updates,
        { withCredentials: true }
      );
      console.log('Plant updated:', response.data);

      // Notify all clients via WebSocket
      if (socket) {
        socket.emit('updatePlantData', response.data);
      }
    } catch (err) {
      console.error('Error updating plant data:', err.message);
      setError('Failed to update plant data.');
    }
  };

  /**
   * Set up WebSocket connection and real-time updates
   */
  useEffect(() => {
    fetchPlants(); // Fetch initial plant data

    const newSocket = io('http://localhost:8080', {
      transports: ['websocket', 'polling'], // Ensure fallback to polling
      withCredentials: true, // Allow cross-origin credentials
    });

    setSocket(newSocket);

    // Listen for real-time updates
    newSocket.on('newPlantData', (data) => {
      console.log('Real-time update received:', data);
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant._id === data._id ? { ...plant, ...data } : plant
        )
      );
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    // Clean up WebSocket connection on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className="greenhouse-wrapper">
      <h1>Greenhouse Plant Dashboard</h1>

      {/* Display Error Messages */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Plant Data */}
      <div className="dashboard">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant._id} className="greenhouse-container">
              <h2>{plant.name}</h2>
              <div className="data-display">
                <p>Temperature: {plant.temperature}°C</p>
                <p>Humidity: {plant.humidity}%</p>
                <p>pH Level: {plant.pH}</p>
                <p>Last Updated: {new Date(plant.lastUpdated).toLocaleString()}</p>
              </div>
              <div className="controls">
                <button
                  onClick={() =>
                    updatePlant(plant._id, { temperature: plant.temperature + 1 })
                  }
                >
                  Increase Temperature
                </button>
                <button
                  onClick={() =>
                    updatePlant(plant._id, { temperature: plant.temperature - 1 })
                  }
                >
                  Decrease Temperature
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading plant data... Please ensure the backend server is running.</p>
        )}
      </div>
    </div>
  );
};

export default App;
