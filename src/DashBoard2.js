// Import necessary libraries
import React from 'react';
import GreenHouseComponent from './GreenHouseComponent';
import './GreenHouse.css';

const DashBoard = () => {
    const greenhouseIds = [1, 2, 3, 4, 5, 6]; // Example greenhouse IDs

    return (
        <div className="dashboard">
            {greenhouseIds.map(id => (
                <GreenHouseComponent key={id} greenhouseId={id} />
            ))}
        </div>
    );
};

export default DashBoard;
