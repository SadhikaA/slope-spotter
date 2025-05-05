import React, { useState, useEffect } from 'react';
import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMapPin, FiBookmark, FiStar, FiArrowLeft, FiShare2, FiCopy, FiCheck } from 'react-icons/fi';
import Header from './components/Header/Header';
import MapBox from './components/MapBox/MapBox';
import PlaceDetails from "./PlaceDetails";

function Profile() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Current Location");
  const [shareDuration, setShareDuration] = useState(30);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareOptions, setShareOptions] = useState([
    { id: 1, name: "Family", active: true },
    { id: 2, name: "Friends", active: false },
    { id: 3, name: "Emergency", active: false }
  ]);

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: 'XXX-XXX-XXXX'
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Get user location when the location tab is active
  useEffect(() => {
    if (activeTab === "location" && !userLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserLocation([coords.longitude, coords.latitude]);
        },
        err => {
          console.warn("Geolocation failed:", err);
        }
      );
    }
  }, [activeTab, userLocation]);

  // Sample data for saved places
  const [savedPlaces, setSavedPlaces] = useState([
    { 
      id: 1, 
      name: "Doe Library", 
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Doe_Library%2C_main_facade%2C_July_2018.jpg", 
      alt: "Front view of Doe Library", 
      hasIndoorMap: true, 
      hasParkingInfo: true 
    },
    { 
      id: 2, 
      name: "Cory Hall", 
      image: "https://engineering.berkeley.edu/wp-content/uploads/2020/01/1950cory_aerial.jpg", 
      alt: "Aerial view of Cory Hall", 
      hasIndoorMap: false, 
      hasParkingInfo: true 
    },
    { 
      id: 3, 
      name: "Dwinelle Hall", 
      image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/dwinelle_building.jpg?itok=Fm-XLnkq", 
      alt: "Outside of Dwinelle Hall", 
      hasIndoorMap: true, 
      hasParkingInfo: true 
    }
  ]);

  // Sample data for reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      placeName: "Doe Library",
      rating: 4.5,
      date: "April 12, 2025",
      text: "Great study space with lots of natural light. The quiet zones are perfect for focused work.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Doe_Library%2C_main_facade%2C_July_2018.jpg"
    },
    {
      id: 2,
      placeName: "Cory Hall",
      rating: 3.5,
      date: "March 23, 2025",
      text: "Good facilities but can get crowded during peak hours. The computer labs are well-equipped.",
      image: "https://engineering.berkeley.edu/wp-content/uploads/2020/01/1950cory_aerial.jpg"
    },
    {
      id: 3,
      placeName: "Café Strada",
      rating: 5,
      date: "April 5, 2025",
      text: "Best coffee on campus! Great outdoor seating area and friendly staff.",
      image: "https://media.timeout.com/images/105465983/750/422/image.jpg"
    }
  ]);

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

  // Function to remove a place from saved places
  const removePlace = (placeId) => {
    setSavedPlaces(savedPlaces.filter(place => place.id !== placeId));
  };

  // Function to remove a review
  const removeReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  // Function for location sharing
  const handleDurationChange = (e) => {
    setShareDuration(parseInt(e.target.value, 10));
  };

  const toggleShareOption = (id) => {
    setShareOptions(shareOptions.map(option => 
      option.id === id ? { ...option, active: !option.active } : option
    ));
  };

  const generateShareLink = () => {
    if (!userLocation) return "https://yourdomain.com/location";
    
    const [longitude, latitude] = userLocation;
    const baseUrl = window.location.origin || "https://yourdomain.com";
    return `${baseUrl}/location?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(locationName)}`;
  };

  const copyToClipboard = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  const handleShare = () => {
    const link = generateShareLink();
    
    // Get active share options
    const activeOptions = shareOptions.filter(option => option.active);
    
    if (activeOptions.length === 0) {
      alert("Please select at least one group to share with");
      return;
    }
    
    // In a real app, this would send the location to selected contacts
    alert(`Location shared with: ${activeOptions.map(o => o.name).join(", ")} for ${shareDuration} minutes`);
    
    // Native share if available
    if (navigator.share) {
      navigator.share({
        title: 'My Location',
        text: `Check my location: ${locationName}`,
        url: link,
      })
      .catch((error) => console.log('Error sharing', error));
    }
  };

  // Function to render star rating - fixed version
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star-filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star-half">★</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star-empty">☆</span>);
    }

    return stars;
  };

  // Create content for profile view
  const renderProfileContent = () => {
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
          <button className="menu-item" onClick={() => setActiveTab("edit")}>
            <FiUser className="menu-icon" />
            <span>Edit My Profile</span>
          </button>

          <button className="menu-item" onClick={() => setActiveTab("location")}>
            <FiMapPin className="menu-icon" />
            <span>Share My Location</span>
          </button>

          <button className="menu-item" onClick={() => setActiveTab("saved")}>
            <FiBookmark className="menu-icon" />
            <span>My Saved Places</span>
          </button>

          <button className="menu-item" onClick={() => setActiveTab("reviews")}>
            <FiStar className="menu-icon" />
            <span>My Reviews</span>
          </button>
        </div>

        <button className="button" onClick={()=> navigate('/')}>
          Sign Out
        </button>
      </>
    );
  };

  return (
    <div className="container">
        {/* View Profile Tab */}
        {activeTab === "profile" && (
          <>
            <Header title="Profile" />
            <div className="profile-content">
              {renderProfileContent()}
            </div>
          </>
        )}

        {/* Edit Profile Tab */}
        {activeTab === "edit" && (
          <>
            <div className="header">
              <button className="back-button" onClick={() => setActiveTab("profile")}>
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
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editForm.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <button className="save-button" onClick={saveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}

        {/* Share Location Tab */}
        {activeTab === "location" && (
          <>
            <div className="header">
              <button className="back-button" onClick={() => setActiveTab("profile")}>
                <FiArrowLeft />
              </button>
              <h2>Share My Location</h2>
            </div>
            
            <div className="location-scroll-container">
              {/* Map Container */}
              <div className="location-map-container">
                <MapBox />
                <div className="location-info">
                  <h3>{locationName}</h3>
                  {userLocation && (
                    <p className="location-coordinates">
                      {userLocation[1].toFixed(6)}, {userLocation[0].toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Share options */}
              <div className="share-options-container">
                <h3>Share with</h3>
                <div className="share-options">
                  {shareOptions.map(option => (
                    <button 
                      key={option.id}
                      className={`share-option-button ${option.active ? 'active' : ''}`}
                      onClick={() => toggleShareOption(option.id)}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
                
                {/* Duration slider */}
                <div className="duration-container">
                  <h3>Share for</h3>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="15"
                      value={shareDuration}
                      onChange={handleDurationChange}
                      className="duration-slider"
                    />
                    <div className="slider-labels">
                      <span>15m</span>
                      <span>1h</span>
                      <span>2h</span>
                    </div>
                    <p className="duration-value">{shareDuration} minutes</p>
                  </div>
                </div>
                
{/* Share link */}
<div className="share-link-container">
  <input
    type="text"
    value={generateShareLink()}
    readOnly
    className="share-link-input"
  />
  <button 
    className="copy-side-button"
    onClick={copyToClipboard}
  >
    {copySuccess ? <FiCheck /> : "Copy Link"}
  </button>
</div>
                
                {/* Share button */}
                <button 
                  className="share-button"
                  onClick={handleShare}
                >
                  <FiShare2 className="share-icon" />
                  Share My Location
                </button>
              </div>
            </div>
          </>
        )}

        {/* Saved Places Tab */}
        {activeTab === "saved" && (
          <>
            <div className="header">
              <button className="back-button" onClick={() => setActiveTab("profile")}>
                <FiArrowLeft />
              </button>
              <h2>My Saved Places</h2>
            </div>
            
            <div className="places-scroll-container">
              {savedPlaces.length > 0 ? (
                savedPlaces.map((place) => (
                  <div className="place-card" key={place.id} onClick={() => setSelectedPlace(place.id)}>
                    <div className="place-card-content">
                      <img 
                        src={place.image} 
                        alt={place.alt} 
                        className="saved-place-image"
                      />
                      
                      <h3 className="saved-place-name">{place.name}</h3>
                      
                      {place.hasIndoorMap && (
                        <button 
                          className="map-button" 
                          onClick={() => navigate("/indoor-map")}
                        >
                          View Indoor Map
                        </button>
                      )}
                      
                      {place.hasParkingInfo && (
                        <div className="parking-info">
                          🚗 Accessible Parking Available
                        </div>
                      )}
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      className="remove-button" 
                      onClick={() => removePlace(place.id)}
                      aria-label={`Remove ${place.name}`}
                    >
                      ✖️
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>You haven't saved any places yet.</p>
                  <button 
                    className="button" 
                    onClick={() => navigate('/places')}
                  >
                    Explore Places
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Place Details Modal */}
        {selectedPlace && (
          <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
            <PlaceDetails
              placeId={selectedPlace}
              onClose={() => setSelectedPlace(null)}
            />
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <>
            <div className="header">
              <button className="back-button" onClick={() => setActiveTab("profile")}>
                <FiArrowLeft />
              </button>
              <h2>My Reviews</h2>
            </div>
            
            <div className="reviews-scroll-container">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="review-card" key={review.id}>
                    <div className="review-card-content">
                      <div className="review-header">
                        <img 
                          src={review.image} 
                          alt={`${review.placeName}`} 
                          className="review-image"
                        />
                        <div className="review-place-info">
                          <h3 className="review-place-name">{review.placeName}</h3>
                          <div className="review-rating">
                            {renderStars(review.rating)}
                          </div>
                          <div className="review-date">{review.date}</div>
                        </div>
                      </div>
                      
                      <p className="review-text">{review.text}</p>
                      
                      <div className="review-actions">
                        <button className="edit-review-button">
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      className="remove-button" 
                      onClick={() => removeReview(review.id)}
                      aria-label={`Remove review for ${review.placeName}`}
                    >
                      ✖️
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>You haven't written any reviews yet.</p>
                  <button 
                    className="button" 
                    onClick={() => navigate('/places')}
                  >
                    Explore Places to Review
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      <BottomNav />
    </div>
  );
}

export default Profile;