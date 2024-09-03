import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileContainer.css'; // Updated CSS for styling
import SideNavBar from '../../components/sidenav/SideNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaUserPen } from "react-icons/fa6";

const ProfileContainer = () => {

  const showErrorToast = () => {
    toast.error("Please complete your profile setup!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="profile-container1">
      <SideNavBar />
      <div className="profile-flexbox1">
        <Link to="/profile" className="profile-link1">
          <div className="profile-card1">
            <FaUser className="profile-icon1" />
            <h2 className='h2-text'>Show Your Profile</h2>
          </div>
        </Link>
        <Link to="/setup-profile" className="profile-link1">
          <div className="profile-card1">
            <FaUserPen className="profile-icon1" />
            <h2 className='h2-text'>Setup/Edit Your Profile</h2>
          </div>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileContainer;
