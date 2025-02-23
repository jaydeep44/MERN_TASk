import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { API_URL } from "../constant";
import { toast } from "react-toastify";

const AddReview = ({ companyId, onClose, renderParent }) => {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/reviews/ceate_review`, {
        fullName: data.fullName,
        rating: data.rating,
        reviewText: data.review,
        subject: data.subject,
        companyId: companyId,
      });
      renderParent();
      toast.success("Add review success");
      reset();
      onClose();
    } catch (error) {
      // console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 font-medium">Subject</label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 font-medium">
              Enter your Review
            </label>
            <textarea
              {...register("review", { required: "Review is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.review && (
              <p className="text-red-500 text-sm">{errors.review.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 font-medium">Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => {
                    setRating(star);
                    setValue("rating", star); // Set value in React Hook Form
                  }}
                />
              ))}
              <span className="ml-2 text-gray-600">
                {rating >= 4 ? "Satisfied" : ""}
              </span>
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-md mt-2 hover:opacity-90 transition"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
