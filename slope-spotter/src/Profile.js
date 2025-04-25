import React, { useState } from 'react';
import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMapPin, FiBookmark, FiStar } from 'react-icons/fi';
import Header from './components/Header/Header';

function Profile() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: 'XXX-XXX-XXXX'
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveChanges = () => {
    setProfile({ ...editForm });
    setActiveTab("profile");
  };

  return (
    <div className="App">
      <div className="container">
        {/* View Profile Tab */}
        {activeTab === "profile" && (
          <>
            <Header title="Profile" />
            <div className="profile-content">
              <div className="profile-header">
                <h3>{`${profile.firstName} ${profile.lastName}`}</h3>

                <div className="profile-picture-container">
                  <div className="profile-picture-edit">
                    <img src="/john duo profile.png" alt="Profile" />
                  </div>
                  <div className="profile-label">Profile</div>
                </div>
              </div>

              <div className="profile-menu">
                <button className="menu-item" onClick={() => setActiveTab("edit")}>
                  <FiUser className="menu-icon" />
                  <span>Edit My Profile</span>
                </button>

                <button className="menu-item">
                  <FiMapPin className="menu-icon" />
                  <span>Share My Location</span>
                </button>

                <button className="menu-item" onClick={() => setActiveTab("saved")}>
                  <FiBookmark className="menu-icon" />
                  <span>My Saved Place</span>
                </button>

                <button className="menu-item">
                  <FiStar className="menu-icon" />
                  <span>My Reviews</span>
                </button>
              </div>

              <button className="sign-out-button">
                Sign Out
              </button>
            </div>
          </>
        )}

        {/* Edit Profile Tab */}
        {activeTab === "edit" && (
          <div className="edit-profile-container">
            <h2 className="page-title">Edit Profile</h2>

            <div className="profile-name">{`${editForm.firstName} ${editForm.lastName}`}</div>

            <div className="profile-picture-container">
              <div className="profile-picture-edit">
                <img src="/john duo profile.png" alt="Profile" />
              </div>
              <div className="profile-label">Profile</div>
            </div>

            <div className="edit-form">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={editForm.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className="save-changes-button" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        )}

        {/* Saved Tab Placeholder */}
        {activeTab === "saved" && (
          <>
            <h2 className="page-title">Saved Places</h2>
            <p>Coming soon...</p>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default Profile;
