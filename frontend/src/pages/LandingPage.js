// This is our landing page
import React from 'react'; // Import the React library - allows us to use JSX
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

// Define the LoginPage component
const LandingPage = () => {
  return (
    <div className="page">

      <div id="landingPageHeader">
        <h1>Adventure Awaits in the Land of Ooo!</h1>
        <p>Join all sorts of characters including Jake the dog and Finn the human as they document their travels and plan epic quests across the kingdoms.</p>
      </div>

      <div className="spotlights">

        <div className="spotlight-container">

          <Link to="/TravelLogs">
            <div id="travelCard" className="card">
              <div className="spotlightIcon">📝</div>
              <h3>Travel Logs</h3>
              <p>Share your epic quests, dungeon crawls, and princess rescues!</p>
            </div>
          </Link>
          
          <Link to="/JourneyPlans">
            <div id="journeyCard" className="card">
              <div className="spotlightIcon">🧭</div>
              <h3>Journey Plans</h3>
              <p>Post your next adventure and share your plan to explore new territory!</p>
            </div>
          </Link>
          
          <Link to="/Map">
            <div id="mapCard" className="card">
              <div className="spotlightIcon">🗺️</div>
              <h3>Kingdom Directory</h3>
              <p>--- UNDER CONSTRUCTION --- (*Interactive map*)</p>
            </div>
          </Link>

        </div>{/* end of spotlight container */}

      </div>{/* end of spotlight */}

    </div>
  );
};

export default LandingPage;