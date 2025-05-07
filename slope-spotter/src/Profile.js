import React, { useState, useEffect } from "react";
import "./App.css";
import BottomNav from "./components/BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import PlaceDetails from "./PlaceDetails";
import EditProfile from "./components/Profile/EditProfile";
import LocationShare from "./components/Profile/LocationShare";
import SavedPlaces from "./components/Profile/SavedPlaces";
import Reviews from "./components/Profile/Reviews";
import ProfileView from "./components/Profile/ProfileView";
import { allPlaces } from "./data/placesData";
import { initialReviews } from "./data/reviewsData";

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
    { id: 3, name: "Emergency", active: false },
  ]);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    phoneNumber: "XXX-XXX-XXXX",
  });

  const [savedPlaces, setSavedPlaces] = useState(allPlaces.slice(0, 4));
  const [reviews, setReviews] = useState(initialReviews);

  const [editForm, setEditForm] = useState({ ...profile });
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Get user location when the location tab is active
  useEffect(() => {
    if (activeTab === "location" && !userLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserLocation([coords.longitude, coords.latitude]);
        },
        (err) => {
          console.warn("Geolocation failed:", err);
        }
      );
    }
  }, [activeTab, userLocation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    setProfile({ ...editForm });
    setActiveTab("profile");
  };

  // Function to remove a place from saved places
  const removePlace = (placeId) => {
    setSavedPlaces(savedPlaces.filter((place) => place.id !== placeId));
  };

  // Function to remove a review
  const removeReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  // Function for location sharing
  const handleDurationChange = (e) => {
    setShareDuration(parseInt(e.target.value, 10));
  };

  const toggleShareOption = (id) => {
    setShareOptions(
      shareOptions.map((option) =>
        option.id === id ? { ...option, active: !option.active } : option
      )
    );
  };

  const generateShareLink = () => {
    if (!userLocation) return "https://yourdomain.com/location";

    const [longitude, latitude] = userLocation;
    const baseUrl = window.location.origin || "https://yourdomain.com";
    return `${baseUrl}/location?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(
      locationName
    )}`;
  };

  const copyToClipboard = () => {
    const link = generateShareLink();
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const handleShare = () => {
    const link = generateShareLink();

    // Get active share options
    const activeOptions = shareOptions.filter((option) => option.active);

    if (activeOptions.length === 0) {
      alert("Please select at least one group to share with");
      return;
    }

    // In a real app, this would send the location to selected contacts
    alert(
      `Location shared with: ${activeOptions
        .map((o) => o.name)
        .join(", ")} for ${shareDuration} minutes`
    );

    // Native share if available
    if (navigator.share) {
      navigator
        .share({
          title: "My Location",
          text: `Check my location: ${locationName}`,
          url: link,
        })
        .catch((error) => console.log("Error sharing", error));
    }
  };

  // Function to render star rating - fixed version
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="star-filled">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="star-half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star-empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="container">
      {/* View Profile Tab */}
      {activeTab === "profile" && (
        <>
          <Header title="Profile" />
          <div className="profile-content">
            <ProfileView
              profile={profile}
              onTabChange={setActiveTab}
              onSignOut={() => navigate("/")}
            />
          </div>
        </>
      )}

      {/* Edit Profile Tab */}
      {activeTab === "edit" && (
        <EditProfile
          editForm={editForm}
          handleInputChange={handleInputChange}
          saveChanges={saveChanges}
          goBack={() => setActiveTab("profile")}
        />
      )}

      {/* Share Location Tab */}
      {activeTab === "location" && (
        <LocationShare
          locationName={locationName}
          userLocation={userLocation}
          shareOptions={shareOptions}
          shareDuration={shareDuration}
          copySuccess={copySuccess}
          handleDurationChange={handleDurationChange}
          toggleShareOption={toggleShareOption}
          generateShareLink={generateShareLink}
          copyToClipboard={copyToClipboard}
          handleShare={handleShare}
          goBack={() => setActiveTab("profile")}
        />
      )}

      {/* Saved Places Tab */}
      {activeTab === "saved" && (
        <SavedPlaces
          savedPlaces={savedPlaces}
          onRemove={removePlace}
          onSelect={setSelectedPlace}
          goBack={() => setActiveTab("profile")}
          navigate={navigate}
        />
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
        <Reviews
          reviews={reviews}
          onRemove={removeReview}
          renderStars={renderStars}
          goBack={() => setActiveTab("profile")}
          navigate={navigate}
        />
      )}
      <BottomNav />
    </div>
  );
}

export default Profile;
