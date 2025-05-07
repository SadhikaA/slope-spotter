// components/Profile/Reviews.js
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const Reviews = ({ reviews, onRemove, renderStars, goBack, navigate }) => {
  return (
    <>
      <div className="header">
        <button className="back-button" onClick={goBack}>
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
                    alt={review.placeName} 
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

              <button 
                className="remove-button" 
                onClick={() => onRemove(review.id)}
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
  );
};

export default Reviews;
