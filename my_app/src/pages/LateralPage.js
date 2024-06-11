import React, { useState, useEffect } from "react";
import { Bar ,Line} from "react-chartjs-2";
import '../style/dnsPage.css'
import Navbar from "./Navbar"

const LateralPage = () => {
  const [logs, setLogs] = useState([]);

  const [lineGraphData, setLineGraphData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Anomaly logs from your backend API
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/LateralMov/getAllLateral`);
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
    const labels = logs.map((log) => log.ts);
    const data = logs.map((log) => (log.attack === 'lateralmovement' ? 1 : 0));

    return {
      labels,
      datasets: [
        {
          label: "Anomaly Attacks Over Time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(127, 127, 127, 1.0)",
          borderColor: "rgba(127, 127, 127, 1.0)",
          borderWidth: 1,
          data,
        },
      ],
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for fetching DNS logs
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/LateralMov/getAllLateral`);
        const data = await response.json();
        setLogs(data.logs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const generateChartData = () => {
    // Logic to process logs and generate data for charts

    // Number of DNS Requests by Source IP
    const sourceIPCounts = {};
    logs.forEach((log) => {
      const sourceIP = log["id.orig_h"] || "Unknown";
      sourceIPCounts[sourceIP] = (sourceIPCounts[sourceIP] || 0) + 1;
    });

    const numberOfRequestsBySourceIPData = {
      labels: Object.keys(sourceIPCounts),
      datasets: [
        {
          label: "Number of Anomly Requests by Source IP",
          backgroundColor: "rgba(127, 127, 127, 1.0)",
          borderColor: "rgba(127, 127, 127, 1.0)",
          borderWidth: 1,
          data: Object.values(sourceIPCounts),
        },
      ],
    };

    // Response Code Distribution
    const responseCodeCounts = logs.reduce((counts, { rcode_name: responseCode = "Unknown" }) => {
        counts[responseCode] = (counts[responseCode] || 0) + 1;
        return counts;
      }, {});
      

    const responseCodeDistributionData = {
      labels: Object.keys(responseCodeCounts),
      datasets: [
        {
          label: "Response Code Distribution",
          backgroundColor: 'rgba(239, 180, 90, 0.5)',
          borderColor:  'rgba(239, 180, 90, 0.5)',
          borderWidth: 1,
          data: Object.values(responseCodeCounts),
        },
      ],
    };

    return { numberOfRequestsBySourceIPData, responseCodeDistributionData };
  };

  const { numberOfRequestsBySourceIPData, responseCodeDistributionData } = generateChartData();

  return (
    <div>
      <Navbar/>
    
    <div className="MainDiv">
      <h1>Lateral Detection Inside Hosts</h1>

      <div className="secondBoxDiv">
        <div className="row1">
          <div className="NumberOfRequestsBySourceIP">
            <h4>Number of Lateral Requests by Source IP</h4>
            <Bar data={numberOfRequestsBySourceIPData} />
          </div>

          <div className="ResponseCodeDistribution">
            <h4>Response Code Distribution</h4>
            <Bar data={responseCodeDistributionData} />
          </div>
        </div>
        <div className="row2">
          <div className="dnsAttackOverTime">
          <h4>Lateral Attacks Over Time</h4>
        <Line data={lineGraphData} />

          </div>

        </div>
        <div className="TodaysAlarm">
          <h4>Lateral Detection Log</h4>
          {/* <table>
            <thead>
              <tr>
                <th>Source IP</th>
                <th>Round-Trip Time (rtt)</th>
                <th>Response Code</th>
                <th>AA</th>
                <th>RA</th>
                <th>Timestamp</th>
                <th>Attack Type</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log['id.orig_h']}</td>
                  <td>{log['rtt']}</td>
                  <td>{log['rcode_name']}</td>
                  <td>{log['AA']}</td>
                  <td>{log['RA']}</td>
                  <td>{log['ts']}</td>
                  <td>{log['attack']}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <table>
  <thead>
    <tr>
    <th>Source IP</th>
      <th>Source Port</th>
      <th>Destination IP</th>
      <th>Destination Port</th>
      <th>Query</th>
      <th>Protocol</th>
     
      <th>Timestamp</th>
      <th>Attack Type</th>
    </tr>
  </thead>
  <tbody>
    {logs.map((log, index) => (
      <tr key={index}>
        <td>{log['id.orig_h']}</td>
        <td>{log['id.orig_p']}</td>
        <td>{log['id.resp_h']}</td>
        <td>{log['id.resp_p']}</td>
        <td>{log['query']}</td>
        <td>{log['proto']}</td>
       
        <td>{log['ts']}</td>
        <td>{log['label']}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>


        {/* Additional components for other charts */}
      </div>
    </div>
    </div>
  );
};

export default LateralPage;
