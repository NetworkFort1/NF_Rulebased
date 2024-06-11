
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "../style/ddosPage.css";
import Navbar from "./Navbar"


const DDOSPage = () => {
  const [logs, setLogs] = useState([]);
  const [lineGraphData, setLineGraphData] = useState({ labels: [], datasets: [] });
  const [timestampStart, setTimestampStart] = useState(0);
  const [timestampEnd, setTimestampEnd] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DDOS/getAllDdos`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const startOfDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          8, // 8 am
          0,
          0
        );
        const endOfDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          16, // 4 pm
          0,
          0
        );

        const startTimestamp = Math.floor(startOfDay.getTime() / 1000);
        const endTimestamp = Math.floor(endOfDay.getTime() / 1000);
        const timeframe = endTimestamp - startTimestamp;

        setTimestampStart(startTimestamp);
        setTimestampEnd(endTimestamp);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/DDOS/getDdosLogs?timestampStart=${startTimestamp}&timeframe=${timeframe}`
        );

        const data = await response.json();
        setLogs(data.logs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 

 

  const processDataForLineGraph = (logs) => {
    const labels = logs.map((log) => log.ts);
    const data = logs.map((log) => (log.attack === 'DDoS' ? 1 : 0));

    return {
      labels,
      datasets: [
        {
          label: "DDoS Attacks Over Time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(239, 180, 90, 0.5)',
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data,
        },
      ],
    };
  };

 

  const generateChartData = () => {
    const protocolCounts = {};
    logs.forEach((log) => {
      const protocol = log.proto || "Unknown";
      protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1;
    });

    const numberOfAttacksByProtocolData = {
      labels: Object.keys(protocolCounts),
      datasets: [
        {
          label: "Number of Attacks by Protocol",
          backgroundColor: "rgba(239, 180, 90, 0.5)",
          borderColor: "rgba(127, 127, 127, 1.0)",
          borderWidth: 1,
          data: Object.values(protocolCounts),
        },
      ],
    };

    const combinedDurationData = {};
    logs.forEach((log) => {
      const destinationPort = log["id.resp_p"] || "Unknown";
      const duration = parseFloat(log.duration) || 0;

      if (!combinedDurationData[destinationPort]) {
        combinedDurationData[destinationPort] = { count: 1, totalDuration: duration };
      } else {
        combinedDurationData[destinationPort].count += 1;
        combinedDurationData[destinationPort].totalDuration += duration;
      }
    });

    const averageDurationData = {
      labels: Object.keys(combinedDurationData),
      datasets: [
        {
          label: "Average Duration of Attacks (Combined Timeframes)",
          backgroundColor: "rgba(127, 127, 127, 0.5)",
          borderColor: "rgba(127, 127, 127, 0.2)",
          borderWidth: 1,
          data: Object.values(combinedDurationData).map((data) => data.totalDuration / data.count),
        },
      ],
    };

    return { numberOfAttacksByProtocolData, averageDurationData };
  };

  const { numberOfAttacksByProtocolData, averageDurationData } = generateChartData();

  return (
    <div>
    <Navbar/>
    <div className="MainDiv">
      <h1>Inside Hosts DDOS</h1>

      <div className="secondBoxDiv">
        <div className="row1">
          <div className="NumberOfAttacksByProtocol">
            <h4>Number of Attacks by Protocol</h4>
            <Bar data={numberOfAttacksByProtocolData} />
          </div>

          <div className="AverageDurationOfAttacks">
            <h4>Average Duration of Attacks</h4>
            <Bar data={averageDurationData} />
          </div>
        </div>
        {/* <div className="row3">
          <div className="lineGraph">
            <h4>DDoS Attacks Over Time</h4>
            <Line data={lineGraphData} />
          </div>
        </div> */}
        <div className="row2">
          <div className="TodaysAlarm">
            <h4>DDOS Log</h4>
            <table>
              <thead>
                <tr>
                  {/* <th>Destination Port</th> */}
                  <th>Protocol</th>
                  <th>Duration</th>
                  <th>Missed Bytes</th>
                  <th>Original Packets</th>
                  <th>Original IP Bytes</th>
                  {/* <th>Timestamp</th>
                  <th>Attack Type</th> */}
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    {/* <td>{log['id.resp_p']}</td> */}
                    <td>{log['proto']}</td>
                    <td>{log['duration']}</td>
                    <td>{log['missed_bytes']}</td>
                    <td>{log['orig_pkts']}</td>
                    <td>{log['orig_ip_bytes']}</td>
                    {/* <td>{log['ts']}</td>
                    <td>{log['attack']}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DDOSPage;
