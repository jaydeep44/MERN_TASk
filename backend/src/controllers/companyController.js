import Company from "../models/Company.js";
import Review from "../models/Review.js";

export const addCompany = async (req, res) => {
  const { name, location, foundedOn, city } = req.body;
  try {
    const company = new Company({ name, location, foundedOn, city });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const { location = "", sortBy = "name:asc" } = req.query;
    const query = location
      ? { city: { $regex: new RegExp(location, "i") } }
      : {};

    const validSortFields = ["name", "average", "rating", "location"];
    const [sortField, sortOrder] = sortBy.split(":");
    const order = sortOrder === "desc" ? -1 : 1;

    const sortOptions = validSortFields.includes(sortField)
      ? { [sortField]: order }
      : { name: 1 };

    const companies = await Company.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "companyId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          totalReviews: { $size: "$reviews" },
          averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] },
        },
      },
      { $project: { reviews: 0 } },
      { $sort: sortOptions },
    ]);

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);
    const review = await Review.find({ companyId: id });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ company, review });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
