

import {Chart as ChartJS} from "chart.js/auto"


import React, { useState, useEffect } from "react";
import '../style/mainDash.css';
import Gauge from "../components/guageComp";
import { Bar } from "react-chartjs-2";
import NavBar  from "./Navbar";

const MainDashboard = () => {
  const [ddosCount, setDDOSCount] = useState(0);
  const [dnsCount, setDNSCount] = useState(0);
  const [dnsExfiltrationCount, setDNSExfiltrationCount] = useState(0);
  const [encryptedAttackCount, setEncryptedAttackCount] = useState(0);
  const [AnomlyAttackCount, setAnomlyAttackCount] = useState(0);
  const [MitreAttackCount, setMitreAttackCount] = useState(0);
  const [combinedLogs, setCombinedLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch counts for DDOS, DNS, DNS Exfiltration, and Encrypted Attack
        const ddosResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DDOS/DDOSAlertCount?timestamp=${Math.floor(Date.now() )}`);
        const ddosData = await ddosResponse.json();
        setDDOSCount(ddosData.numberOfAttacks);

        const dnsResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DNS/getDNSAlertCount?timestamp=${Math.floor(Date.now() )}`);
        const dnsData = await dnsResponse.json();
        setDNSCount(dnsData.numberOfAttacks);

        const dnsExfiltrationResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DNSExfilter/getDNSExfilterCount?timestamp=${Math.floor(Date.now() )}`);
        const dnsExfiltrationData = await dnsExfiltrationResponse.json();
        setDNSExfiltrationCount(dnsExfiltrationData.numberOfAttacks);

        const encryptedAttackResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/encrypted/EncryptAlertCount?timestamp=${Math.floor(Date.now() )}`);
        const encryptedAttackData = await encryptedAttackResponse.json();
        setEncryptedAttackCount(encryptedAttackData.numberOfAttacks);

        const AnomlyAttackResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/Anomly/AnomlyAlertCount?timestamp=${Math.floor(Date.now() )}`);
        const AnomlyAttackData = await AnomlyAttackResponse.json();
        setAnomlyAttackCount(AnomlyAttackData.numberOfAttacks);

        const MitreAttackResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/Mitre/getMitreAlertCount?timestamp=${Math.floor(Date.now() )}`);
        const MitreAttackData = await MitreAttackResponse.json();
        setMitreAttackCount(MitreAttackData.numberOfAttacks);

        // Fetch logs for DNS, DNS Exfiltration, and DDOS
        const dnsLogsResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DNS/getAllDNS`);
        const dnsLogsData = await dnsLogsResponse.json();

        const dnsExfiltrationLogsResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DNSExfilter/getAllDNSEx`);
        const dnsExfiltrationLogsData = await dnsExfiltrationLogsResponse.json();

        const ddosLogsResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/DDOS/getAllDdos`);
        const ddosLogsData = await ddosLogsResponse.json();

        const AnomlyLogsResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/Anomly/getAllAnomly`);
        const AnomlyLogsData = await AnomlyLogsResponse.json();

        const MitreLogsResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/Mitre/getAllMitre`);
        const MitreLogsData = await MitreLogsResponse.json();

        // Combine logs into a single array
        const combinedLogs = [
          ...dnsLogsData.logs.map(log => ({ ...log, type: "DNS" })),
          ...dnsExfiltrationLogsData.logs.map(log => ({ ...log, type: "DNS Exfiltration" })),
          ...ddosLogsData.logs.map(log => ({ ...log, type: "DDOS" })),
          ...AnomlyLogsData.logs.map(log => ({ ...log, type: "Anomly" })),
          ...MitreLogsData.logs.map(log => ({ ...log, type: "Mitre" }))
        ];

        setCombinedLogs(combinedLogs);
        console.log(combinedLogs)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const generateChartData = () => {
    const ipCounts = {};
    combinedLogs.forEach(log => {
      const ip = log['id.orig_h'] || "Unknown";
      const attackType = log.type;
      const key = `${ip}-${attackType}`;
      ipCounts[key] = (ipCounts[key] || 0) + 1;
    });

    const labels = Object.keys(ipCounts);
    const data = Object.values(ipCounts);

    return {
      labels,
      datasets: [
        {
          label: "Combined Attacks by IP",
          backgroundColor: "rgba(75,192,192,0.5)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          data,
        },
      ],
    };
  };

  const chartData = generateChartData();

  return (
    <div>
      {/* <NavBar/> */}
    
    <div className="MainDiv">
      <h1>Security Insight Dashboard</h1>
      <div className="secondBoxDiv">
        <div className="row1">
          <div className="AlarmByType">
            <h4>Count Alarm By Type</h4>
            <Bar data={chartData} />
          </div>
        </div>
        <div className="row2">
          <div className="ddosGuage">
            <h4>DDOS</h4>
            <Gauge value={ddosCount} />
          </div>
          <div className="dnsGuage">
            <h4>DNS</h4>
            <Gauge value={dnsCount} />
          </div>
          <div className="dnsExGuage">
            <h4>DNS Exfiltration</h4>
            <Gauge value={dnsExfiltrationCount} />
          </div>
          <div className="EncryptGuage">
            <h4>Encrypted Attack</h4>
            <Gauge value={encryptedAttackCount} />
          </div>
          <div className="EncryptGuage">
            <h4>Anomly Attack</h4>
            <Gauge value={AnomlyAttackCount} />
          </div>
          <div className="EncryptGuage">
            <h4>Mitre Attack</h4>
            <Gauge value={MitreAttackCount} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MainDashboard;
