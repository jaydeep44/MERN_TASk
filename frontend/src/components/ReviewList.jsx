import React from "react";
import deaultReviewImage from "../assets/logo.png";
import { Star } from "lucide-react";
import moment from "moment";

const ReviewList = ({ companyReviews }) => {
  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">
        Result Found: {companyReviews?.length}
      </h3>
      {companyReviews.map((review) => (
        <div key={review.id} className="flex items-start justify-between mb-4">
          {/* Left Section: User Avatar & Review Content */}
          <div className="flex items-start">
            {/* User Avatar */}
            <img
              src={deaultReviewImage}
              alt={deaultReviewImage}
              className="w-10 h-10 rounded-full mr-4"
            />

            {/* Review Content */}
            <div>
              <h4 className="text-md font-medium">{review.fullName}</h4>
              <p className="text-gray-500 text-sm">
                {moment(review.createdAt).format("DD-MM-YYYY, HH:mm")}
              </p>
              <p className="text-gray-700 mt-2">{review.reviewText}</p>
            </div>
          </div>

          {/* Right Section: Star Ratings */}
          <div className="flex text-yellow-500 ml-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? "fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
