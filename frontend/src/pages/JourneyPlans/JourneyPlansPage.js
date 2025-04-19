import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './JourneyPlansPage.css';

const JourneyPlansPage = () => {
    const [journeyPlans, setJourneyPlans] = useState([]);

    useEffect(() => {
        // Fetch journey plans from the backend
        const fetchJourneyPlans = async () => {
            try {
                const response = await axios.get('/api/journeyPlan'); // Make GET request to the backend
                setJourneyPlans(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching journey plans:', error); // Log any errors
            }
        };

        fetchJourneyPlans(); // Call the function
    }, []);

    return (
        <div className="journeyPlansPage">

            <h1>Journey Plans</h1>

            <div id="createPlan" className="Card">
                <div id="text">
                    <h2>Create New Journey Plan</h2>
                    <p>Plan your next adventure!</p>
                </div>
                <div id="plusIcon">
                    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="5" width="40" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
                        <text x="25" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">+</text>
                    </svg>
                </div>
            </div>

            <div className="journeyPlanCardContainer">

                {journeyPlans.map(plan => (
                    <div key={plan.plan_id} id="journeyPlan" className="Card">

                        <div className="journeyCardContent">
                            <h3>{plan.journey_name}</h3>
                            <p><strong>Locations:</strong> {plan.locations}</p>
                            <p><strong>Start Date:</strong> {plan.start_date}</p>
                            <p><strong>End Date:</strong> {plan.end_date}</p>
                            <p><strong>Activities:</strong> {plan.activities}</p>
                            <p>{plan.description}</p>
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

            </div>{/* end of journey plans container */}

        </div>
    );
};

export default JourneyPlansPage;