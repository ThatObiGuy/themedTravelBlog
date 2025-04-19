import './TravelLogsPage.css';

const travelLogs = [
    {
        id: 1,
        title: 'Dungeon Crawling in the Ice Kingdom',
        description: 'Jake and I explored a mysterious dungeon under the Ice King\'s castle. Found some sweet loot and battled ice creatures!',
        startDate: '2024-05-10',
        endDate: '2024-05-12',
        tags: ['adventure', 'dungeon', 'ice kingdom', 'treasure']
    },
    {
        id: 2,
        title: 'Journey to the Nightosphere',
        description: 'Used Hunson Abadeer\'s amulet to travel to the Nightosphere. That place is bananas! Had to save some souls and jam with Marceline.',
        startDate: '2024-03-21',
        endDate: '2024-03-22',
        tags: ['nightosphere', 'demons', 'marceline', 'dangerous']
    },
    // Sample data for now, will read in from the database later
];

const TravelLogsPage = () => {
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
                            <p><strong>Start Date:</strong> {log.startDate}</p>
                            <p><strong>End Date:</strong> {log.endDate}</p>

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