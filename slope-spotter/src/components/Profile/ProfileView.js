// components/Profile/ProfileView.js
import React from 'react';
import { FiUser, FiMapPin, FiBookmark, FiStar } from 'react-icons/fi';

const ProfileView = ({ profile, onTabChange, onSignOut }) => {
  return (
    <>
      <div className="profile-header">
        <h3>{`${profile.firstName} ${profile.lastName}`}</h3>

        <div className="profile-picture-container">
          <div className="profile-picture-edit">
            <img src="/john duo profile.png" alt="Profile" />
          </div>
        </div>
      </div>

      <div className="profile-menu">
        <button className="menu-item" onClick={() => onTabChange("edit")}>
          <FiUser className="menu-icon" />
          <span>Edit My Profile</span>
        </button>

        <button className="menu-item" onClick={() => onTabChange("location")}>
          <FiMapPin className="menu-icon" />
          <span>Share My Location</span>
        </button>

        <button className="menu-item" onClick={() => onTabChange("saved")}>
          <FiBookmark className="menu-icon" />
          <span>My Saved Places</span>
        </button>

        <button className="menu-item" onClick={() => onTabChange("reviews")}>
          <FiStar className="menu-icon" />
          <span>My Reviews</span>
        </button>
      </div>

      <button className="button" onClick={onSignOut}>
        Sign Out
      </button>
    </>
  );
};

export default ProfileView;
