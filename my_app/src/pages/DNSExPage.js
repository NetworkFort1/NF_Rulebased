// import React, { useState, useEffect } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import "../style/dnsExPage.css"
// import Navbar from "./Navbar"

// const DNSExfiltrationPage = () => {
//   const [logs, setLogs] = useState([]);
//   const [lineGraphData, setLineGraphData] = useState({ labels: [], datasets: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch DNS Exfiltration logs from your backend API
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DNSExfiltration/getAllDnsExfiltrationLogs`);
//         const data = await response.json();
//         setLogs(data.logs);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const processedData = processDataForLineGraph(logs);
//     setLineGraphData(processedData);
//   }, [logs]);

//   const processDataForLineGraph = (logs) => {
//     const labels = logs.map((log) => log.ts);
//     const data = logs.map((log) => (log.attack === 'DNSExfiltration' ? 1 : 0));

//     return {
//       labels,
//       datasets: [
//         {
//           label: "DNS Exfiltration Attacks Over Time",
//           fill: false,
//           lineTension: 0.1,
//           backgroundColor: "rgba(75,192,192,0.4)",
//           borderColor: "rgba(75,192,192,1)",
//           borderWidth: 1,
//           data,
//         },
//       ],
//     };
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for fetching DNS Exfiltration logs
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DNSExfilter/getAllDNSEx`);
//         const data = await response.json();
//         setLogs(data.logs);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

  
//   const generateChartData = () => {
//     // Logic to process logs and generate data for charts

//     // Number of DNS Exfiltration Events Over Time
//     const timeIntervalCounts = {};
//     logs.forEach((log) => {
//       const timestamp = log.ts || "Unknown";
//       const parsedTimestamp = parseInt(timestamp);
//       if (!isNaN(parsedTimestamp)) {
//         const date = new Date(parsedTimestamp * 1000);
//         const timeInterval = date.toISOString().slice(0, 10);
//         timeIntervalCounts[timeInterval] = (timeIntervalCounts[timeInterval] || 0) + 1;
//       }
//     });

//     const numberOfEventsOverTimeData = {
//       labels: Object.keys(timeIntervalCounts),
//       datasets: [
//         {
//           label: "Number of DNS Exfiltration Events Over Time",
//           backgroundColor: "rgba(75,192,192,0.5)",
//           borderColor: "rgba(75,192,192,1)",
//           borderWidth: 1,
//           data: Object.values(timeIntervalCounts),
//         },
//       ],
//     };

//     // Average Query Length for DNS Exfiltration
//     const queryLengthAverages = {};
//     logs.forEach((log) => {
//       const query = log.query || "Unknown";
//       const queryLength = log.length || 0;

//       if (!queryLengthAverages[query]) {
//         queryLengthAverages[query] = { totalLength: queryLength, count: 1 };
//       } else {
//         queryLengthAverages[query].totalLength += queryLength;
//         queryLengthAverages[query].count += 1;
//       }
//     });

//     const uniqueQueries = [...new Set(logs.map((log) => log.query))];
//     const averageQueryLengths = uniqueQueries.map((query) => {
//       const queryData = queryLengthAverages[query];
//       if (queryData) {
//         const averageLength = queryData.totalLength / queryData.count;
//         return isNaN(averageLength) ? 0 : averageLength;
//       } else {
//         return 0; // Return a default value if queryData is undefined
//       }
//     });
    

//     const averageQueryLengthData = {
//       labels: uniqueQueries,
//       datasets: [
//         {
//           label: "Average Query Length for DNS Exfiltration",
//           backgroundColor: "rgba(255,99,132,0.5)",
//           borderColor: "rgba(255,99,132,1)",
//           borderWidth: 1,
//           data: averageQueryLengths,
//         },
//       ],
//     };

//     return { numberOfEventsOverTimeData, averageQueryLengthData };
//   };


//   const { numberOfEventsOverTimeData, averageQueryLengthData } = generateChartData();

//   return (
//     <div>
//       <Navbar/>
//     <div className="MainDiv">
//       <h1>DNS Exfiltration Inside Hosts</h1>

//       <div className="secondBoxDiv">
//         <div className="row1">
//           <div className="NumberOfEventsOverTime">
//             <h4>Number of DNS Exfiltration Events Over Time</h4>
//             <Bar data={numberOfEventsOverTimeData} />
//           </div>

//           <div className="AverageQueryLength">
//             <h4>Average Query Length for DNS Exfiltration</h4>
//             <Line data={averageQueryLengthData} />
//           </div>
//         </div>
//         <div className="row2">
//           <div className="dnsExfilterAttackOverTime">
//           <h4>DNS Exfiltration Attacks Over Time</h4>
//         <Line data={lineGraphData} />

//           </div>
//         </div>
//         <div className="TodaysAlarm">
//           <h4>DNS Exfiltration Log</h4>
//           <table>
//             <thead>
//               <tr>
//                 <th>Index</th>
//                 <th>Timestamp</th>
//                 <th>Query</th>
//                 <th>Length</th>
//                 <th>Subdomains Count</th>
//                 <th>Word Count</th>
//                 <th>Word Max</th>
//                 <th>Entropy</th>
//                 <th>Word Max Ratio</th>
//                 <th>Word Count Ratio</th>
//                 <th>Digits Ratio</th>
//                 <th>Uppercase Ratio</th>
//                 <th>Time Average</th>
//                 <th>Time Standard Deviation</th>
//                 <th>Size Average</th>
//                 <th>Size Standard Deviation</th>
//                 <th>Unique</th>
//                 <th>Entropy Average</th>
//                 <th>Entropy Standard Deviation</th>
//                 <th>Attack Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logs.map((log, index) => (
//                 <tr key={index}>
//                   <td>{log['index']}</td>
//                   <td>{log['ts']}</td>
//                   <td>{log['query']}</td>
//                   <td>{log['length']}</td>
//                   <td>{log['subdomains_count']}</td>
//                   <td>{log['w_count']}</td>
//                   <td>{log['w_max']}</td>
//                   <td>{log['entropy']}</td>
//                   <td>{log['w_max_ratio']}</td>
//                   <td>{log['w_count_ratio']}</td>
//                   <td>{log['digits_ratio']}</td>
//                   <td>{log['uppercase_ratio']}</td>
//                   <td>{log['time_avg']}</td>
//                   <td>{log['time_stdev']}</td>
//                   <td>{log['size_avg']}</td>
//                   <td>{log['size_stdev']}</td>
//                   <td>{log['unique']}</td>
//                   <td>{log['entropy_avg']}</td>
//                   <td>{log['entropy_stdev']}</td>
//                   <td>{log['attack']}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>


//         {/* Additional components for other charts */}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default DNSExfiltrationPage;
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "../style/dnsExPage.css"
import Navbar from "./Navbar"

const DNSExfiltrationPage = () => {
  const [logs, setLogs] = useState([]);
  const [lineGraphData, setLineGraphData] = useState({ labels: [], datasets: [] });
  const [barGraphData, setBarGraphData] = useState({ labels: [], datasets: [] });
  const [lineGraphData2, setLineGraphData2] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DNSExfilter/getAllDNSEx`);
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
    const processedData = processDataForBarGraph(logs);
    setBarGraphData(processedData);
  }, [logs]);

  useEffect(() => {
    const processedData = processDataForLineGraph2(logs);
    setLineGraphData2(processedData);
  }, [logs]);

  const processDataForLineGraph = (logs) => {
    const labels = logs.map((log) => log.timestamp);
    const data = logs.map((log) => (log.label === 'attack' ? 1 : 0));

    return {
      labels,
      datasets: [
        {
          label: "DNS Exfiltration Attacks Over Time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(239, 180, 90, 0.5)",
          borderColor: "rgba(239, 180, 90, 0.5)",
          borderWidth: 1,
          data,
        },
      ],
    };
  };

  const processDataForBarGraph = (logs) => {
    const timeIntervalCounts = {};
    logs.forEach((log) => {
      const timestamp = log.timestamp || "Unknown";
      const parsedTimestamp = parseInt(timestamp);
      if (!isNaN(parsedTimestamp)) {
        const date = new Date(parsedTimestamp * 1000);
        const timeInterval = date.toISOString().slice(0, 10);
        timeIntervalCounts[timeInterval] = (timeIntervalCounts[timeInterval] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(timeIntervalCounts),
      datasets: [
        {
          label: "Number of DNS Exfiltration Events Over Time",
          backgroundColor: "rgba(239, 180, 90, 0.5)",
          borderColor: "rgba(239, 180, 90, 0.5)",
          borderWidth: 1,
          data: Object.values(timeIntervalCounts),
        },
      ],
    };
  };

  const processDataForLineGraph2 = (logs) => {
    const labels = logs.map((log) => log.timestamp);
    const data = logs.map((log) => log.length); // Assuming 'length' is the data for the second Line graph
  
    return {
      labels,
      datasets: [
        {
          label: "Length of DNS Queries Over Time", // Modify as needed
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(127, 127, 127, 0.5)",
          borderColor: "rgba(127, 127, 127, 0.5)",
          borderWidth: 1,
          data,
        },
      ],
    };
  };

  return (
    <div>
      <Navbar/>
      <div className="MainDiv">
        <h1>DNS Exfiltration Inside Hosts</h1>

        <div className="secondBoxDiv">
          <div className="row1">
            <div className="NumberOfEventsOverTime">
              <h4>Number of DNS Exfiltration Events Over Time</h4>
              <Bar data={barGraphData} />
            </div>

            <div className="AverageQueryLength">
              <h4>Average Query Length for DNS Exfiltration</h4>
              <Line data={lineGraphData} />
            </div>
          </div>
          <div className="row2">
            <div className="dnsExfilterAttackOverTime">
              <h4>DNS Exfiltration Attacks Over Time</h4>
              <Line data={lineGraphData2} />
            </div>
          </div>
          <div className="row3">
            <div className="TodaysAlarm">
              <h4>DNS Exfiltration Log</h4>
              <table>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Timestamp</th>
                    <th>Query</th>
                    <th>Length</th>
                    <th>Subdomains Count</th>
                    <th>Word Count</th>
                    <th>Word Max</th>
                    <th>Entropy</th>
                    <th>Word Max Ratio</th>
                    <th>Word Count Ratio</th>
                    <th>Digits Ratio</th>
                    <th>Uppercase Ratio</th>
                    <th>Time Average</th>
                    <th>Time Standard Deviation</th>
                    <th>Size Average</th>
                    <th>Size Standard Deviation</th>
                    <th>Unique</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{log['timestamp']}</td>
                      <td>{log['query']}</td>
                      <td>{log['length']}</td>
                      <td>{log['subdomains_count']}</td>
                      <td>{log['w_count']}</td>
                      <td>{log['w_max']}</td>
                      <td>{log['entropy']}</td>
                      <td>{log['w_max_ratio']}</td>
                      <td>{log['w_count_ratio']}</td>
                      <td>{log['digits_ratio']}</td>
                      <td>{log['uppercase_ratio']}</td>
                      <td>{log['time_avg']}</td>
                      <td>{log['time_stdev']}</td>
                      <td>{log['size_avg']}</td>
                      <td>{log['size_stdev']}</td>
                      <td>{log['unique']}</td>
                     
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

export default DNSExfiltrationPage;
