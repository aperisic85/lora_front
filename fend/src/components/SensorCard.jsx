// src/components/SensorCard.jsx
import GatewayList from './GatewayList';
const SensorCard = ({ eui, data }) => {
  return (
    <div className="sensor-card">
      <h2>Platforma: {eui === '513F167B004A0024' ? 'South' : 'North'}</h2>

      <div className="status">
        <div className="battery">
          Battery: {data?.bat ? '100% Power' : `${data?.bat ?? 'N/A'}%`}
        </div>
        <div>Last Update: {new Date(data?.received_at ?? '').toLocaleString()}</div>
      </div>

      <div className="data-section">
        <h3>Sensor Measurements</h3>
        <pre>Data to parse: {data?.data ?? 'No data available'}</pre>
      </div>

      <GatewayList gateways={data?.gws} />
    </div>
  );
};

export default SensorCard;
