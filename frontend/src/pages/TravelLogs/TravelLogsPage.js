import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './TravelLogsPage.css';

const TravelLogsPage = () => {
    const [travelLogs, setTravelLogs] = useState([]);

    useEffect(() => {
        // Fetch travel logs from the backend
        const fetchTravelLogs = async () => {
            try {
                const response = await axios.get('/api/travelLog'); // Make GET request to the backend
                const logs = response.data.map(log => ({
                    ...log,
                    tags: log.tags.split(',').map(tag => tag.trim()) // Parse tags into an array
                }));
                setTravelLogs(logs); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching journey plans:', error); // Log any errors
            }
        };

        fetchTravelLogs(); // Call the function
    }, []);

    return (
        <div className="travelLogsPage">

            <h1>Travel Logs</h1>

            <div id="createLog" className="Card">
                <div id="text">
                    <h2>Create New Travel Log</h2>
                    <p>Share details from your last adventure!</p>
                </div>
                <div id="plusIcon">
                    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
                        <text x="25" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">+</text>
                    </svg>
                </div>
            </div>

            <div className="travelLogCardContainer">

                {travelLogs.map(log => (
                    <div key={log.id} id="travelLog" className="Card">

                        <div className="travelCardContent">
                            <h3>{log.title}</h3>
                            <p>{log.description}</p>
                            <p><strong>Start Date:</strong> {log.start_date}</p>
                            <p><strong>End Date:</strong> {log.end_date}</p>
                            <p><strong>Post Date:</strong> {log.post_date}</p>

                            <div className="tags">
                                {log.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="CRUDIcons">
                            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
                                <text x="25" y="25" textAnchor="middle" dominantBaseline="middle">✏️</text>
                            </svg>
                            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
                                <text x="25" y="25" textAnchor="middle" dominantBaseline="middle">🗑️</text>
                            </svg>

                        </div>

                    </div>
                ))}

            </div>{/* end of travel logs container */}

        </div>
    );
};

export default TravelLogsPage;