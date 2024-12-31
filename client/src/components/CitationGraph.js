// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     BarElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// // Register the components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// function CitationGraph() {
//     const data = {
//         labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
//         datasets: [
//             {
//                 label: 'Citations per Year',
//                 data: [5, 10, 25, 50, 100, 120, 90, 70], // Sample data, replace with real values
//                 backgroundColor: '#777',
//                 borderRadius: 4,
//             },
//         ],
//     };

//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: false,
//             },
//         },
//     };

//     return (
//         <div style={{ marginTop: '20px', height: '120px' }}>
//             <Bar data={data} options={options} />
//         </div>
//     );
// }

// export default CitationGraph;

import React from 'react';
import { Bar } from 'react-chartjs-2';

function CitationGraph({ publications }) {
    const years = publications.map((pub) => pub.Year);
    const citationCounts = publications.map((pub) => parseInt(pub['Cited by']) || 0);

    const data = {
        labels: years,
        datasets: [
            {
                label: 'Citations per Year',
                data: citationCounts,
                backgroundColor: '#777',
            },
        ],
    };

    return (
        <div className="citation-graph">
            <Bar data={data} options={{ maintainAspectRatio: false }} />
        </div>
    );
}

export default CitationGraph;
