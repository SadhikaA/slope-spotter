import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import ReloadingHeader from "../Header/ReloadingHeader";
import { ReactComponent as DeleteIcon } from "../../assets/deleta.svg"; // Adjust the path as needed

const Reviews = ({ reviews, onRemove, renderStars, goBack, navigate }) => {
  return (
    <div className="w-full max-w-md px-4 pt-4 pb-[5.5rem] mx-auto space-y-6 overflow-y-auto navigation-scroll-container">
      <ReloadingHeader title="My Reviews" goBack={goBack} />

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            className="relative bg-white p-4 rounded-2xl shadow-sm border border-gray-200 space-y-3"
          >
            {/* Header */}
            <div className="flex gap-4 items-start">
              <img
                src={review.image}
                alt={review.placeName}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-[#010133] text-xl">
                  {review.placeName}
                </h3>
                <div className="flex items-center text-yellow-500">
                  {renderStars(review.rating)}
                </div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
            </div>

            {/* Body */}
            <p className="text-gray-800 text-base">{review.text}</p>

            {/* Actions */}
            <div className="flex justify-end">
              <button className="px-4 py-2 text-sm rounded-xl bg-gray-100 hover:bg-gray-200 text-[#004aae] font-medium transition">
                Edit
              </button>
            </div>

            {/* Custom Delete Button */}
            <button
              onClick={() => onRemove(review.id)}
              className="absolute bottom-3 left-3"
              aria-label={`Remove review for ${review.placeName}`}
            >
              <DeleteIcon className="w-5 h-5 fill-gray-700 hover:fill-red-600 transition" />
            </button>
          </div>
        ))
      ) : (
        <div className="text-center mt-20">
          <p className="text-gray-600 text-lg mb-4">
            You haven't written any reviews yet.
          </p>
          <button
            className="px-6 py-3 bg-[#004aae] text-white text:lg font-semibold rounded-xl text-base hover:bg-[#00367a] transition"
            onClick={() => navigate("/places")}
          >
            Explore Places to Review
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
