// App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const SensorDisplay = () => {
  const [sensorData, setSensorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const EUIS = ['513F167B004A0024', '479196A500430032']; // Replace with your second EUI

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          EUIS.map((eui) =>
            axios.get(`https://ina.plovput.hr/api/data/${eui}`)
          )
        );

        const data = responses.reduce((acc, response, index) => {
          acc[EUIS[index]] = response.data;
          return acc;
        }, {});

        setSensorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading sensor data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      {Object.entries(sensorData).map(([eui, data]) => (
        <div key={eui} className="sensor-card">
          <h2>Sensor: {eui}</h2>

          <div className="status">
            <div className="battery">
              Battery: {data?.bat === 255 ? 'USB Power' : `${data?.bat ?? 'N/A'}%`}
            </div>
            <div>Last Update: {new Date(data?.received_at ?? '').toLocaleString()}</div>
          </div>

          <div className="data-section">
            <h3>Sensor Measurements</h3>
            <pre>Data to parse: {data?.data ?? 'No data available'}</pre>
          </div>

          <div className="gateways">
            <h3>Gateway Signals</h3>
            {data?.gws?.length > 0 ? (
              <ul>
                {data.gws.map((gw, index) => (
                  <li key={index}>
                    Gateway: {gw.gweui}, RSSI: {gw.rssi}, SNR: {gw.snr}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No gateway data available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SensorDisplay;
