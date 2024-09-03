import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './userprofile.css';
import SideNavBar from '../../components/sidenav/SideNavbar';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const userId = localStorage.getItem('userId'); // Get userId from local storage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return; // No userId found, set loading to false and exit
      }

      try {
        const token = localStorage.getItem('authToken'); // Get token from local storage
        const userResponse = await axios.get(`http://localhost:9999/user/${userId}`);
        const userData = userResponse.data;
        setUsername(userData.username);
        
        const response = await axios.get(`http://localhost:9999/health/userdata/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract user data and add username field
        const { username, age, weight, height, gender, goal, activityLevel, fitnessLevel, climate, unit, bodyCompositionalGoal, dietaryPreferences, equation } = response.data;

        setUserData({
          username,
          age,
          weight,
          height,
          gender,
          goal,
          activityLevel,
          fitnessLevel,
          climate,
          unit,
          bodyCompositionalGoal,
          dietaryPreferences,
          equation,
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>; // Optionally show a loading message or spinner
  }

  return (
    <div className="user-container">
      <SideNavBar />
      <div className="user-main-sec">
        {userId ? (
          userData ? (
            <div className="profile-card">
              <div className="profile-left">
                <div className="u-name-sec">
                  <h2 className="i-name-head">{username}</h2>
                  <button onClick={() => navigate('/setup-profile')}>Edit Profile</button>
                </div>
              </div>
              <div className="profile-right">
                <h3 className="p-head">INFORMATION</h3>
                <hr className="line" />
                <div className="p-menu-item">
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Age</h4>
                    <p className="p-m-text">{userData.age}</p>
                  </div>
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Weight</h4>
                    <p className="p-m-text">{userData.weight} kg</p>
                  </div>
                </div>
                <div className="p-menu-item">
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Height</h4>
                    <p className="p-m-text">{userData.height} cm</p>
                  </div>
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Gender</h4>
                    <p className="p-m-text">{userData.gender}</p>
                  </div>
                </div>
                <div className="p-menu-item">
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Goal</h4>
                    <p className="p-m-text">{userData.goal}</p>
                  </div>
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Activity Level</h4>
                    <p className="p-m-text">{userData.activityLevel}</p>
                  </div>
                </div>
                <div className="p-menu-item">
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Fitness Level</h4>
                    <p className="p-m-text">{userData.fitnessLevel}</p>
                  </div>
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Climate</h4>
                    <p className="p-m-text">{userData.climate}</p>
                  </div>
                </div>
                <div className="p-menu-item">
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Unit</h4>
                    <p className="p-m-text">{userData.unit}</p>
                  </div>
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Body Compositional Goal</h4>
                    <p className="p-m-text">{userData.bodyCompositionalGoal}</p>
                  </div>
                </div>
                <div className="p-menu-item">
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Dietary Preferences</h4>
                    <p className="p-m-text">{userData.dietaryPreferences}</p>
                  </div>
                  <div className="p-menu-each-item">
                    <h4 className="p-m-head">Equation</h4>
                    <p className="p-m-text">{userData.equation}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Setup your user profile... <Link to="/setup-profile">Click here</Link></p>
          )
        ) : (
          <p>User ID not found. Please <Link to="/setup-profile">set up your profile</Link>.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
