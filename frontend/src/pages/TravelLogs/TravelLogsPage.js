import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './TravelLogsPage.css';

const TravelLogsPage = () => {
    const [travelLogs, setTravelLogs] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [refreshLogs, setRefreshLogs] = useState(0);
    const [newLog, setNewLog] = useState({
        user_id: 1, // hardcoded for now, will be replaced with user_id from context
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        tags: ''
    });

    useEffect(() => {
        // Fetch journey plans from the backend
        const fetchTravelLogs = () => {
            axios.get('/api/travelLog') // Make GET request to the backend
                .then(response => {
                    setTravelLogs(response.data); // Update state with fetched data
                })
                .catch(error => {
                    console.error('Error fetching travel logs:', error); // Log any errors
                });
        };

        fetchTravelLogs(); // Call the function
    }, [refreshLogs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLog({ ...newLog, [name]: value });
    };

    const handleCreateLog = () => {
        axios.post('/api/travelLog', newLog) // Send new plan to backend
            .then(() => {
                alert('Travel Log Created!'); // Alert user of success
                setShowCreateForm(false); // Hide the form after submission
                setNewLog({
                    user_id: 1, // hardcoded for now, will be replaced with user_id from context
                    title: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    tags: ''
                });
                setRefreshLogs(refreshLogs + 1);
            })
            .catch(error => {
                console.error('Error creating travel log:', error);
            });
    };

    const handleDeleteLog = (log_id) => {
        console.log('Deleting log with ID:', log_id); // Log the log ID to be deleted
        axios.delete(`/api/travelLog/${log_id}`) // Send DELETE request to backend
            .then(() => {
                alert('Travel Log Deleted!'); // Alert user of success
                // Update state to remove the deleted plan
                setRefreshLogs(refreshLogs + 1);
            })
            .catch(error => {
                console.error('Error deleting travel log:', error); // Log any errors
            });
    };

    return (
        <div className="travelLogsPage">

            <h1>Travel Logs</h1>

            <div id="createLog" className="Card">
                <div id="text">
                    <h2>Create New Travel Log</h2>
                    <p>Share details from your last adventure!</p>
                </div>
                <div id="plusIcon" onClick={() => setShowCreateForm(!showCreateForm)}>{/* Toggle form visibility */}
                    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
                        <text x="25" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">+</text>
                    </svg>
                </div>
            </div>

            {showCreateForm && (
                <div className="createForm">

                    <form>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="title"
                                className="formInput"
                                placeholder="title"
                                value={newLog.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="description"
                                className="formInput"
                                placeholder="Tell us more about what you did on your journey in the land of Ooo!"
                                value={newLog.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="start_date"
                                className="formInput"
                                placeholder="When will you start your journey? - (YYYY-MM-DD) if possible"
                                value={newLog.start_date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="end_date"
                                className="formInput"
                                placeholder="When will you end your journey? - (YYYY-MM-DD) if possible"
                                value={newLog.end_date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="tags"
                                className="formInput"
                                placeholder="Enter tags for your travel log (comma separated)"
                                value={newLog.tags}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button onClick={handleCreateLog} className="submitBtn">Create Log</button>

                    </form>

                </div>
            )}

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
                                {(log.tags ? log.tags.split(',') : []).map(tag => (
                                    <span key={tag.trim()} className="tag">{tag.trim()}</span>
                                ))}
                            </div>
                        </div>

                        <div className="CRUDIcons">
                            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
                                <text x="25" y="25" textAnchor="middle" dominantBaseline="middle">✏️</text>
                            </svg>
                            <svg
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleDeleteLog(log.log_id)} // Call delete function on click
                            >
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