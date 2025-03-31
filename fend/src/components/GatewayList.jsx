// src/components/GatewayList.jsx
const GatewayList = ({ gateways }) => {
    if (!gateways || gateways.length === 0) {
      return <p>No gateway data available</p>;
    }
  
    return (
      <div className="gateways">
        <h3>Gateway Signals</h3>
        <ul>
          {gateways.map((gw, index) => (
            <li key={index}>
              Gateway: {gw.gweui}, RSSI: {gw.rssi}, SNR: {gw.snr}, position: {gw.lat}, {gw.lon}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default GatewayList;
  