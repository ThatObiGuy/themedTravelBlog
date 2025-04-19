import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import TravelLogsPage from './pages/TravelLogs/TravelLogsPage';
import JourneyPlansPage from './pages/JourneyPlans/JourneyPlansPage';
import MapPage from './pages/Map/MapPage';

const App = () => { // App component

  return (

    <div className="App"> {/* Main container for the application */}
    <BrowserRouter> {/* Router component wraps the entire application to enable routing */}
      <nav className="navbar">

        <div className="logo">
          <h1>Adventure Blog</h1>
          <h1 id="sword">*</h1>
        </div>

        <div className="nav-links">

          <Link to="/">
            <svg width="90" height="50" viewBox="0 0 90 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="80" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
              <text x="45" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">HOME</text>
            </svg>
          </Link>

          <Link to="/Login">
            <svg width="90" height="50" viewBox="0 0 90 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="80" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
              <text x="45" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">LOGIN</text>
            </svg>
          </Link>

          <Link to="/TravelLogs">
            <svg width="140" height="50" viewBox="0 0 140 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="130" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
              <text x="70" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">TRAVEL LOGS</text>
            </svg>
          </Link>

          <Link to="/JourneyPlans">
            <svg width="160" height="50" viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="150" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
              <text x="80" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">JOURNEY PLANS</text>
            </svg>
          </Link>

          <Link to="/Map">
            <svg width="60" height="50" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="50" height="40" rx="5" fill="#2A9D8F" stroke="#1E6D64" strokeWidth="3"/>
              <text x="30" y="25" fill="#184F50" fontSize="16" fontFamily="Arial" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">MAP</text>
            </svg>
          </Link>

        </div>
      </nav>

      <Routes> {/* Routes component contains all the Route definitions */}
        <Route path="/" element={<LandingPage />} /> {/* Specifying routes for the different pages */}
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/TravelLogs" element={<TravelLogsPage />} />
        <Route path="/JourneyPlans" element={<JourneyPlansPage />} />
        <Route path="/Map" element={<MapPage />} />
      </Routes>
      
    </BrowserRouter>
    </div>
    
  );
};

export default App; // called in index.js