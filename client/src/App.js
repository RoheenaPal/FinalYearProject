import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './components/ProfileHeader';
import PublicationsList from './components/PublicationsList';
import Statistics from './components/Statistics';
import './App.css';
import CoAuthors from './components/CoAuthors';

function App() {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any errors

    // Fetch publications data on component mount
    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/publications');
                if (response && response.data) {
                    setPublications(response.data);
                } else {
                    setError("No data returned from the API.");
                }
            } catch (error) {
                setError('Error fetching publications: ' + error.message);
                console.error('Error fetching publications:', error);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchPublications();
    }, []); // Empty dependency array ensures it only runs once when component mounts

    // After publications are fetched, render the components
    return (
        <div className="app-container">
            <div className="left-panel">
                <ProfileHeader />
                <PublicationsList publications={publications} />
            </div>
            <div className="right-panel">
                <Statistics publications={publications} />
                <CoAuthors publications={publications} />
            </div>
        </div>
    );
}

export default App;
