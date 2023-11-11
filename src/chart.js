// Import Chart.js components
import { Line } from 'react-chartjs-2';

const WaterLevelChart = ({ data }) => {
  const chartData = {
    labels: data.timestamps,
    datasets: [{
      label: 'Water Level',
      data: data.waterLevels,
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    }],
  };

  return <Line data={chartData} />;
};

// Use WaterLevelChart in your GreenHouse component
