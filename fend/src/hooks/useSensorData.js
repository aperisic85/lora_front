// src/hooks/useSensorData.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useSensorData = (EUIS) => {
  const [sensorData, setSensorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [EUIS]);

  return { sensorData, loading, error };
};

export default useSensorData;
