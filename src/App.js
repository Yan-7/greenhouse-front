import './App.css';
import WaterLevel from './WaterLevel';
import FertilizeLevel from './FertilizeLevel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WaterLevel/>
        <FertilizeLevel/>
      </header>
    </div>
  );
}

export default App;
