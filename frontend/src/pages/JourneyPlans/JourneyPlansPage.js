import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './JourneyPlansPage.css';

const JourneyPlansPage = () => {
    const [journeyPlans, setJourneyPlans] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [refreshPlans, setRefreshPlans] = useState(0);
    const [editingPlanId, setEditingPlanId] = useState(null); // Track which plan is being edited
    const [editedPlan, setEditedPlan] = useState({}); // Store the edited plan details
    const [newPlan, setNewPlan] = useState({
        user_id: 1, // hardcoded for now, will be replaced with user_id from context
        journey_name: '',
        locations: '',
        start_date: '',
        end_date: '',
        activities: '',
        description: ''
    });

    useEffect(() => {
        // Fetch journey plans from the backend
        const fetchJourneyPlans = () => {
            axios.get('/api/journeyPlan') // Make GET request to the backend
                .then(response => {
                    setJourneyPlans(response.data); // Update state with fetched data
                })
                .catch(error => {
                    console.error('Error fetching journey plans:', error); // Log any errors
                });
        };

        fetchJourneyPlans(); // Call the function
    }, [refreshPlans]); // Dependency array to re-fetch plans when needed

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingPlanId) {
            setEditedPlan({ ...editedPlan, [name]: value }); // Update the edited plan's details
        } else {
            setNewPlan({ ...newPlan, [name]: value });
        }
    };

    const handleCreatePlan = () => {
        axios.post('/api/journeyPlan', newPlan) // Send new plan to backend
            .then(() => {
                alert('Journey Plan Created!'); // Alert user of success
                setShowCreateForm(false); // Hide the form after submission
                setNewPlan({
                    user_id: 1, // hardcoded for now, will be replaced with user_id from context
                    journey_name: '',
                    locations: '',
                    start_date: '',
                    end_date: '',
                    activities: '',
                    description: ''
                });
                setRefreshPlans(refreshPlans + 1);
            })
            .catch(error => {
                console.error('Error creating journey plan:', error);
            });
    };

    const handleEditPlan = (plan) => {
        setEditingPlanId(plan.plan_id); // Set the ID of the plan being edited
        setEditedPlan({ ...plan }); // Populate the editedPlan state with the plan's details
    };

    const handleSaveEdit = (plan_id) => {
        axios.put(`/api/journeyPlan/${plan_id}`, editedPlan)
            .then(() => {
                alert('Journey Plan Updated!');
                setEditingPlanId(null); // Exit edit mode
                setEditedPlan({});
                setRefreshPlans(refreshPlans + 1); // Refresh the plans after editing
            })
            .catch(error => {
                console.error('Error updating journey plan:', error);
            });
    };

    const handleCancelEdit = () => {
        setEditingPlanId(null); // Exit edit mode without saving
        setEditedPlan({});
    };

    const handleDeletePlan = (plan_id) => {
        console.log('Deleting plan with ID:', plan_id); // Log the plan ID to be deleted
        axios.delete(`/api/journeyPlan/${plan_id}`) // Send DELETE request to backend
            .then(() => {
                alert('Journey Plan Deleted!'); // Alert user of success
                // Update state to remove the deleted plan
                setRefreshPlans(refreshPlans + 1);
            })
            .catch(error => {
                console.error('Error deleting journey plan:', error); // Log any errors
            });
    };

    return (
        <div className="journeyPlansPage">

            <h1>Journey Plans</h1>

            <div id="createPlan" className="Card">

                <div id="text">
                    <h2>Create New Journey Plan</h2>
                    <p>Plan your next adventure!</p>
                </div>

                <div id="plusIcon" onClick={() => setShowCreateForm(!showCreateForm)}>
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
                                name="journey_name"
                                className="formInput"
                                placeholder="Journey Name"
                                value={newPlan.journey_name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <select
                                name="locations"
                                value={newPlan.locations}
                                onChange={handleInputChange}
                                required>
                                <option value="" disabled>Select a location in Ooo</option>
                                <option value="candy-kingdom">Candy Kingdom</option>
                                <option value="ice-kingdom">Ice Kingdom</option>
                                <option value="fire-kingdom">Fire Kingdom</option>
                                <option value="lumpy-space">Lumpy Space</option>
                                <option value="nightosphere">Nightosphere</option>
                                <option value="cloud-kingdom">Cloud Kingdom</option>
                                <option value="mystery-mountains">Mystery Mountains</option>
                                <option value="evil-forest">Evil Forest</option>
                                <option value="tree-fort">Tree Fort</option>
                            </select>
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="start_date"
                                className="formInput"
                                placeholder="When will you start your journey? - (YYYY-MM-DD) if possible"
                                value={newPlan.start_date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="end_date"
                                className="formInput"
                                placeholder="When will you end your journey? - (YYYY-MM-DD) if possible"
                                value={newPlan.end_date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="activities"
                                className="formInput"
                                placeholder="What activities will you get up to on your journey?"
                                value={newPlan.activities}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="formGroup">
                            <input
                                type="text"
                                name="description"
                                className="formInput"
                                placeholder="Tell us more about what you plan to do on your journey in the land of Ooo!"
                                value={newPlan.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button onClick={handleCreatePlan} className="submitBtn">Create Plan</button>

                    </form>

                </div>
            )}

            <div className="journeyPlanCardContainer">

                {journeyPlans.map(plan => (
                    <div key={plan.plan_id} id="journeyPlan" className="Card">

                        {editingPlanId === plan.plan_id ? (
                            // Edit mode
                            <div className="editJourneyCardContent">

                                <input
                                    type="text"
                                    name="journey_name"
                                    value={editedPlan.journey_name}
                                    onChange={handleInputChange}
                                    placeholder="Journey Name"
                                />

                                <select
                                    name="locations"
                                    value={editedPlan.locations}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>Select a location in Ooo</option>
                                    <option value="candy-kingdom">Candy Kingdom</option>
                                    <option value="ice-kingdom">Ice Kingdom</option>
                                    <option value="fire-kingdom">Fire Kingdom</option>
                                    <option value="lumpy-space">Lumpy Space</option>
                                    <option value="nightosphere">Nightosphere</option>
                                    <option value="cloud-kingdom">Cloud Kingdom</option>
                                    <option value="mystery-mountains">Mystery Mountains</option>
                                    <option value="evil-forest">Evil Forest</option>
                                    <option value="tree-fort">Tree Fort</option>
                                </select>

                                <input
                                    type="text"
                                    name="start_date"
                                    value={editedPlan.start_date}
                                    onChange={handleInputChange}
                                    placeholder="Start Date"
                                />

                                <input
                                    type="text"
                                    name="end_date"
                                    value={editedPlan.end_date}
                                    onChange={handleInputChange}
                                    placeholder="End Date"
                                />

                                <input
                                    type="text"
                                    name="activities"
                                    value={editedPlan.activities}
                                    onChange={handleInputChange}
                                    placeholder="Activities"
                                />

                                <textarea
                                    name="description"
                                    value={editedPlan.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                />

                                <button onClick={() => handleSaveEdit(plan.plan_id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>

                        ) : (

                            // Display mode
                            <div className="journeyCardContent">
                                <h3>{plan.journey_name}</h3>
                                <p><strong>Locations:</strong> {plan.locations}</p>
                                <p><strong>Start Date:</strong> {plan.start_date}</p>
                                <p><strong>End Date:</strong> {plan.end_date}</p>
                                <p><strong>Activities:</strong> {plan.activities}</p>
                                <p>{plan.description}</p>
                                <div className="CRUDIcons">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleEditPlan(plan)}
                                    >
                                        <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3" />
                                        <text x="25" y="25" textAnchor="middle" dominantBaseline="middle">✏️</text>
                                    </svg>
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleDeletePlan(plan.plan_id)}
                                    >
                                        <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3" />
                                        <text x="25" y="25" textAnchor="middle" dominantBaseline="middle">🗑️</text>
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                ))} 

            </div>{/* end of journey plans container */}

        </div>
    );
};

export default JourneyPlansPage;