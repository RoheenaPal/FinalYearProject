import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import './Statistics.css';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Statistics({ publications }) {
    // Calculate total citations
    const totalCitations = useMemo(() => {
        return publications.reduce((sum, pub) => sum + Number(pub['Cited by'] || 0), 0);
    }, [publications]);

    // Calculate h-index
    const hIndex = useMemo(() => {
        const sortedCitations = publications
            .map(pub => pub['Cited by'] || 0)
            .sort((a, b) => b - a);

        let h = 0;
        while (h < sortedCitations.length && sortedCitations[h] >= h + 1) {
            h++;
        }
        return h;
    }, [publications]);

    // Calculate i10-index
    const i10Index = useMemo(() => {
        return publications.filter(pub => (pub['Cited by'] || 0) >= 10).length;
    }, [publications]);

    // Prepare data for citation graph
    const citationData = useMemo(() => {
        const dataByYear = {};
        publications.forEach(pub => {
            const year = pub['Year'];
            const citations = Number(pub['Cited by'] || 0);
            if (year) {
                dataByYear[year] = (dataByYear[year] || 0) + citations;
            }
        });

        const years = Object.keys(dataByYear).sort();
        return {
            labels: years,
            datasets: [
                {
                    label: 'Citations per Year',
                    data: years.map(year => dataByYear[year]),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        };
    }, [publications]);

    return (
        <div className="statistics">
            <div className="statistics-title">Cited by</div>
            <div className="stat-item">
                <span>Citations</span>
                <span>{totalCitations}</span>
            </div>
            <div className="stat-item">
                <span>h-index</span>
                <span>{hIndex}</span>
            </div>
            <div className="stat-item">
                <span>i10-index</span>
                <span>{i10Index}</span>
            </div>

            {/* Citation graph */}
            <div className="citation-graph">
                <h4>Citations by Year</h4>
                <Bar data={citationData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
}

export default Statistics;
