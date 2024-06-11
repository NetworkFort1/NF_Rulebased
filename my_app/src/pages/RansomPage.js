import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import '../style/RansomPage.css';
import Navbar from "./Navbar";

const RansomwPage = () => {
  const [logs, setLogs] = useState([]);
  const [lineGraphData, setLineGraphData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/Ransomware/getAllRansom`);
        const data = await response.json();
        setLogs(data.logs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  const processedData = processDataForLineGraph(logs);
    setLineGraphData(processedData);
  }, [logs]);

  const processDataForLineGraph = (logs) => {
    const labels = logs.map((log) => new Date(log.start_time * 1000).toLocaleString());
    const data = logs.map((log) => (log.prediction === 'ransomware' ? 1 : 0));

    return {
      labels,
      datasets: [
        {
          label: "Ransomware Attacks Over Time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          data,
        },
      ],
    };
  };

  const generateChartData = () => {
    const protocolCounts = {};
    const payloadSizeCounts = {};

    logs.forEach((log) => {
      const protocol = log.protocol_type;
      const payloadSize = log.total_payload_size;

      protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1;
      payloadSizeCounts[payloadSize] = (payloadSizeCounts[payloadSize] || 0) + 1;
    });

    const protocolData = {
      labels: Object.keys(protocolCounts),
      datasets: [
        {
          label: "Protocol Distribution",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: Object.values(protocolCounts),
        },
      ],
    };

    const payloadSizeData = {
      labels: Object.keys(payloadSizeCounts),
      datasets: [
        {
          label: "Payload Size Distribution",
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          data: Object.values(payloadSizeCounts),
        },
      ],
    };

    return { protocolData, payloadSizeData };
  };

  const { protocolData, payloadSizeData } = generateChartData();

  return (
    <div>
      <Navbar/>
      <div className="MainDiv">
        <h1>Ransomware Logs</h1>
        <div className="secondBoxDiv">
          <div className="row1">
            <div className="protocolDistribution">
              <h4>Protocol Distribution</h4>
              <Bar data={protocolData} />
            </div>
            <div className="payloadSizeDistribution">
              <h4>Payload Size Distribution</h4>
              <Bar data={payloadSizeData} />
            </div>
          </div>
          <div className="row2">
            <div className="ransomwareAttackOverTime">
              <h4>Ransomware Attacks Over Time</h4>
              <Line data={lineGraphData} />
            </div>
          </div>
          <div className="logDetails">
            <h4>Ransomware Log Details</h4>
            <table>
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Source Port</th>
                  <th>Destination Port</th>
                  <th>Protocol</th>
                  <th>Total Payload Size</th>
                  <th>Prediction</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td>{new Date(log.start_time * 1000).toLocaleString()}</td>
                    <td>{new Date(log.end_time * 1000).toLocaleString()}</td>
                    <td>{log.src_port}</td>
                    <td>{log.dst_port}</td>
                    <td>{log.protocol_type}</td>
                    <td>{log.total_payload_size}</td>
                    <td>{log.prediction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RansomwPage;
