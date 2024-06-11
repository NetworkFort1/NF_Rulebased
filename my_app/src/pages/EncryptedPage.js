
import React, { useState, useEffect } from "react";
import axios from "axios"
import { Bar, Box, Scatter } from "react-chartjs-2";
import "../style/encryptedPage.css";
import Chart from 'chart.js';
import 'chartjs-chart-box-and-violin-plot';
import Navbar from "./Navbar"



const EncryptedPage = () => {
    const [logs, setLogs] = useState([]);

    // useEffect(() => {
    //     // Fetch encrypted attack logs from the API
    //     axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/encrypted/getAllEncrypted`)
    //         .then(response => {
    //             setLogs(response.data.logs);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching logs:', error);
    //         });
    // }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/encrypted/getAllEncrypted`);
            setLogs(response.data.logs);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
       
        fetchData();

        // Polling function to fetch data every 1 minute
        const pollingInterval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(pollingInterval);
    }, []);

    const createHistogramData = (feature) => {
        const data = {
            labels: logs.map(log => log.Traffic_sequence),
            datasets: [{
                label: feature,
                data: logs.map(log => parseFloat(log[feature])),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        };
        return data;
    };

    const createBoxPlotData = (feature) => {
        const data = {
            labels: [feature],
            datasets: [{
                data: [logs.map(log => parseFloat(log[feature]))],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        };
        return data;
    };

    const createScatterPlotData = (xFeature, yFeature) => {
        const data = {
            datasets: [{
                label: `${xFeature} vs ${yFeature}`,
                data: logs.map(log => ({ x: parseFloat(log[xFeature]), y: parseFloat(log[yFeature]) })),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        };
        return data;
    };

    const createBarChartData = () => {
        const attackCount = logs.filter(log => log.attack === '1').length;
        const nonAttackCount = logs.filter(log => log.attack !== '1').length;

        const data = {
            labels: ['Attack', 'Non-Attack'],
            datasets: [{
                label: 'Attack vs. Non-Attack Count',
                data: [attackCount, nonAttackCount],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            }]
        };
        return data;
    };



    return (
        <div>
            <Navbar/>
        
        <div className="MainDiv">
            <h1>Inside Hosts Encrypted</h1>

            <div className="secondBoxDiv">
                <div className="row1">
                    <div className="NumberOfAttacksByProtocol">
                        <h3>Length of IP Packets</h3>
                        <Bar data={createHistogramData('Length_of_IP_packets')} />

                    </div>

                    <div className="AverageDurationOfAttacks">
                        <h3>Length of TCP Payload</h3>
                        <Bar
                            data={createBoxPlotData('Length_of_TCP_payload')}
                            options={{
                                plugins: {
                                    boxplot: {
                                        whiskerWidth: 0,
                                    },
                                },
                            }}
                        />

                    </div>
                    <div className="NumberOfAttacksByProtocol">
                        <h3>TCP Window Size Value</h3>
                        <Bar data={createHistogramData('TCP_windows_size_value')} />
                    </div>

                </div>
                <div className="row2">
                    <div className="lineGraph">
                        <h3>Length of IP Packets vs. Length of TCP Payload</h3>
                        <Scatter data={createScatterPlotData('Length_of_IP_packets', 'Length_of_TCP_payload')} />


                    </div>

                    <div className="lineGraph">
                        <h3>Attack vs. Non-Attack Count</h3>
                        <Bar data={createBarChartData()} />

                    </div>
                    <div className="lineGraph">

                        <h3>Length of TCP Payload vs. TCP Window Size</h3>
                        <Scatter data={createScatterPlotData('Length_of_TCP_payload', 'TCP_windows_size_value')} />

                    </div>
                </div>
                <div className="row3">
                    <div className="TodaysAlarm">
                        <h2>Log Data</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Traffic Sequence</th>
                                    <th>Length of IP Packets</th>
                                    <th>Length of TCP Payload</th>
                                    <th>Total Length of IP Packet per Session</th>
                                    <th>Total Time to Live per Session</th>
                                    <th>Mean Length of IP Packets</th>
                                    <th>Median Length of IP Packets</th>
                                    <th>Max Length of IP Packets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, index) => (
                                    <tr key={index}>
                                        <td>{log.Traffic_sequence}</td>
                                        <td>{log.Length_of_IP_packets}</td>
                                        <td>{log.Length_of_TCP_payload}</td>
                                        <td>{log.Total_length_of_IP_packet_per_session}</td>
                                        <td>{log.Total_Time_to_live_per_session}</td>
                                        <td>{log.mean_Length_of_IP_packets}</td>
                                        <td>{log.median_Length_of_IP_packets}</td>
                                        <td>{log.max_Length_of_IP_packets}</td>
                                        {/* Add more cells based on your log data */}
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

export default EncryptedPage;