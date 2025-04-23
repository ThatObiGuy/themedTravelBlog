import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './TravelLogsPage.css';

const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

const TravelLogsPage = () => {
    const [travelLogs, setTravelLogs] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [refreshLogs, setRefreshLogs] = useState(0);
    const [editingLogId, setEditingLogId] = useState(null); // Track which log is being edited
    const [editedLog, setEditedLog] = useState({}); // Store the edited log details
    const [newLog, setNewLog] = useState({
        user_id: loggedInUser?.id || null,
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        tags: ''
    });

    useEffect(() => {
        const fetchTravelLogs = () => {
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            if (!loggedInUser || !loggedInUser.id) {
                alert("Please log in to access your logs");
                return;
            }
    
            axios.get(`/api/travelLog/${loggedInUser.id}`) // Pass user_id as a query parameter
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
        if (editingLogId) {
            setEditedLog({ ...editedLog, [name]: value });
        } else {
            setNewLog({ ...newLog, [name]: value });
        }
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

    const handleEditLog = (log) => {
        setEditingLogId(log.log_id);
        setEditedLog({ ...log });
    };

    const handleSaveEdit = (log_id) => {
        axios.put(`/api/travelLog/${log_id}`, editedLog)
            .then(() => {
                alert('Travel Log Updated!');
                setEditingLogId(null);
                setEditedLog({});
                setRefreshLogs(refreshLogs + 1);
            })
            .catch(error => {
                console.error('Error updating travel log:', error);
            });
    };

    const handleCancelEdit = () => {
        setEditingLogId(null);
        setEditedLog({});
    };

    const handleDeleteLog = (log_id) => {
        console.log('Deleting log with ID:', log_id); // Log the log ID to be deleted
        axios.delete(`/api/travelLog/${log_id}`, log_id) // Send DELETE request to backend
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
                    <div key={log.log_id} id="travelLog" className="Card">
                        {editingLogId === log.log_id ? (
                            <div className="editTravelCardContent">
                                <input
                                    type="text"
                                    name="title"
                                    value={editedLog.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={editedLog.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                />
                                <input
                                    type="text"
                                    name="start_date"
                                    value={editedLog.start_date}
                                    onChange={handleInputChange}
                                    placeholder="Start Date"
                                />
                                <input
                                    type="text"
                                    name="end_date"
                                    value={editedLog.end_date}
                                    onChange={handleInputChange}
                                    placeholder="End Date"
                                />
                                <input
                                    type="text"
                                    name="tags"
                                    value={editedLog.tags}
                                    onChange={handleInputChange}
                                    placeholder="Tags"
                                />
                                <button onClick={() => handleSaveEdit(log.log_id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div className="travelCardContent">
                                <h3>{log.title}</h3>
                                <p>{log.description}</p>
                                <p><strong>Start Date:</strong> {log.start_date}</p>
                                <p><strong>End Date:</strong> {log.end_date}</p>
                                <p><strong>Tags:</strong> {log.tags}</p>
                                <div className="CRUDIcons">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleEditLog(log)}
                                    >
                                        <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3" />
                                        <text x="25" y="25" textAnchor="middle" dominantBaseline="middle">✏️</text>
                                    </svg>
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleDeleteLog(log.log_id)}
                                    >
                                        <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3" />
                                        <text x="25" y="25" textAnchor="middle" dominantBaseline="middle">🗑️</text>
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>{/* end of travel logs container */}

        </div>
    );
};

export default TravelLogsPage;