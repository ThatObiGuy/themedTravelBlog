import './JourneyPlansPage.css';

const journeyPlans = [
    {
        plan_id: 1,
        journey_name: 'Exploring the Candy Kingdom',
        locations: 'Candy Castle, Peppermint Fields, Gumball Gardens',
        start_date: '2024-06-01',
        end_date: '2024-06-05',
        activities: 'Meeting Princess Bubblegum, Candy Science Experiments, Candy Tasting',
        description: 'A sweet adventure through the Candy Kingdom, filled with fun and sugary delights!'
    },
    {
        plan_id: 2,
        journey_name: 'Adventure in the Fire Kingdom',
        locations: 'Flame Castle, Lava Pits, Ember Forest',
        start_date: '2024-07-10',
        end_date: '2024-07-15',
        activities: 'Battling Flame Monsters, Exploring Lava Caves, Fireproof Training',
        description: 'A fiery journey through the Fire Kingdom, full of heat and excitement!'
    },
    // Sample data for now, will read in from the database later
];

const JourneyPlansPage = () => {
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