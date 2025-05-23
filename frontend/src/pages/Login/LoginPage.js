import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig'; // Import axios instance
import './LoginPage.css';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [details, setDetails] = useState({});

    useEffect(() => {

        // Animation for Jake's eyes
        const pupils = document.querySelectorAll('.jakePupil');

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            pupils.forEach((pupil) => {
                const rect = pupil.getBoundingClientRect();
                const pupilCenterX = rect.left + rect.width / 2;
                const pupilCenterY = rect.top + rect.height / 2;

                const deltaX = mouseX - pupilCenterX;
                const deltaY = mouseY - pupilCenterY;

                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = 5;

                const moveX = (deltaX / distance) * Math.min(maxDistance, distance);
                const moveY = (deltaY / distance) * Math.min(maxDistance, distance);

                pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            });
        }; // inspired by How to make Eyeballs that Follow You Around - https://www.youtube.com/watch?v=TGe3pS5LqEw&ab_channel=BeyondFireship

        document.addEventListener('mousemove', handleMouseMove);

    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        axios.post('/api/login', credentials)
            .then((response) => {
                alert(response.data.message); // Alert success message
                const user = response.data.user;
                sessionStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user details
                setLoggedInUser(user);
                fetchUserDetails(user.id); // Fetch user details immediately after login
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Login failed'); // Alert error message
            });
    };

    const fetchUserDetails = (id) => {
        axios.get(`/api/login/${id}`) // Use the correct API endpoint
            .then((response) => {
                setDetails(response.data.user); // Set user details
            })
            .catch((error) => {
                console.error(error); // Log error
            });
    };
    
    return (
        <div className="loginPage">

            <h1>Login</h1>

            

            <div className="container">
        
        
                <div className="jakeContainer">

                <div className="lock">
                    <div className="lockHole"></div>
                </div>
                
                    
                    <div className="jakeHead">
                        <div className="jakeEyesContainer">
                            <div className="jakeEye">
                                <div className="jakePupil"></div>
                            </div>
                            <div className="jakeEye">
                                <div className="jakePupil"></div>
                            </div>
                        </div>
                        
                        <div className="jakeMouthLeft"></div>
                        <div className="jakeMouthRight"></div>
                        <div className="jakeMouthTop"></div>
                        <div className="jakeNose"></div>
                        
                        <div className="loginForm">
                        {loggedInUser ? (
                                <div className="userInfo">
                                    <h2>Welcome, {details.username}!</h2>
                                    <p>Email: {details.email}</p>
                                    <p>Address: {details.address || 'N/A'}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="formGroup">
                                        <input
                                            type="text"
                                            name="username"
                                            className="formInput"
                                            placeholder="Username"
                                            value={credentials.username}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <input
                                            type="password"
                                            name="password"
                                            className="formInput"
                                            placeholder="Password"
                                            value={credentials.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="submitBtn">Adventure Time!</button>
                                </form>
                            )}
                        </div> {/* end of login form */}

                    </div>{/* end of jake head */}

                </div>{/* end of jake container */}

            </div>{/* end of container */}

        </div>

    );

};

export default LoginPage;