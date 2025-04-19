import React, { useEffect } from 'react';
import './LoginPage.css';

const LoginPage = () => {

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
    
    return (
        <div className="loginPage">

            <h1>Login</h1>

            <div className="container">
        
        
                <div className="jakeContainer">
                    
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
                            <form>
                                <div className="formGroup">
                                    <input type="text" className="formInput" placeholder="Username" required></input>
                                </div>
                                <div className="formGroup">
                                    <input type="password" className="formInput" placeholder="Password" required></input>
                                </div>
                                <button type="submit" className="submitBtn">Adventure Time!</button>
                            </form>
                        </div> {/* end of login form */}

                    </div>{/* end of jake head */}

                </div>{/* end of jake container */}

            </div>{/* end of container */}

        </div>

    );

};

export default LoginPage;