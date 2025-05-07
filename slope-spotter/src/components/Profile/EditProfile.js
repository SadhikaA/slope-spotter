// components/Profile/EditProfile.js
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const EditProfile = ({ editForm, handleInputChange, saveChanges, goBack }) => {
  return (
    <>
      <div className="header">
        <button className="back-button" onClick={goBack}>
          <FiArrowLeft />
        </button>
        <h2>Edit Profile</h2>
      </div>
      
      <div className="edit-profile-scroll-container">
        <div className="edit-profile-content">
          <h3 className="profile-name">{`${editForm.firstName} ${editForm.lastName}`}</h3>

          <div className="profile-picture-container">
            <div className="profile-picture-edit">
              <img src="/john duo profile.png" alt="Profile" />
            </div>
            <div className="profile-label">Profile</div>
          </div>

          <div className="edit-form">
            {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                  name={field}
                  value={editForm[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <button className="save-button" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
