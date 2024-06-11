// import React from 'react';
// import Heatmap from 'react-heatmap-grid';

// const MyHeatmap = ({ data }) => {
//   const xLabels = new Array(24).fill(0).map((_, i) => `${i}:00`);
//   const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   return (
//     <div>
//       <Heatmap
//         xLabels={xLabels}
//         yLabels={yLabels}
//         data={data}
//         height={yLabels.length * 30 + 30}
//         cellRender={(value, x, y) => (
//           <div style={{ background: `rgba(0, 128, 255, ${1 - value})` }}>
//             {value > 0 && <span>{value}</span>}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default MyHeatmap;
import React from 'react';
import { Line } from 'react-chartjs-2';

const DDoSHeatmap = ({ data }) => {
    console.log(data)
  // Assuming data is an array of DDoS attack objects
  // Each object has properties: id, time, packetCount, byteCount

  const uniqueAttackIds = [...new Set(data.map((attack) => attack.id))];
  const timeLabels = [...new Set(data.map((attack) => attack.time))];

  // Prepare data for the heatmap
  const heatmapData = uniqueAttackIds.map((attackId) => {
    const attackData = data.filter((attack) => attack.id === attackId);
    const packetCounts = new Array(timeLabels.length).fill(0);
    const byteCounts = new Array(timeLabels.length).fill(0);

    attackData.forEach((attack) => {
      const timeIndex = timeLabels.indexOf(attack.time);
      packetCounts[timeIndex] += parseInt(attack.packetCount, 10);
      byteCounts[timeIndex] += parseInt(attack.byteCount, 10);
    });

    return {
      label: `Attack ${attackId}`,
      data: byteCounts, // or packetCounts if you want to show packet count
      fill: false,
      borderColor: getRandomColor(), // Implement a function to get random colors
    };
  });

  const chartData = {
    labels: timeLabels,
    datasets: heatmapData,
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

// Helper function to generate random colors
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default DDoSHeatmap;
