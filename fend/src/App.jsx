// src/App.jsx
import useSensorData from './hooks/useSensorData';
import SensorCard from './components/SensorCard';

const App = () => {
  const EUIS = ['513F167B004A0024', '479196A500430032']; // Replace with your second EUI
  const { sensorData, loading, error } = useSensorData(EUIS);

  if (loading) return <div className="loading">Loading sensor data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      {Object.entries(sensorData).map(([eui, data]) => (
        <SensorCard key={eui} eui={eui} data={data} />
      ))}
    </div>
  );
};

export default App;
