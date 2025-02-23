import Review from "../models/Review.js";
import Company from "../models/Company.js";

export const addReview = async (req, res) => {
  const { companyId, fullName, subject, reviewText, rating } = req.body;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const review = new Review({
      companyId,
      fullName,
      subject,
      reviewText,
      rating,
    });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getReviewsByCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const reviews = await Review.find({ companyId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
