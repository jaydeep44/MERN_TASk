import React from "react";
import images from "../assets/images.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const CompanyCard = ({ companies }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col m-10 ml-32 mt-20">
          {companies.map((company) => (
            <div
              key={company._id}
              className="flex items-center bg-white shadow-lg p-4 rounded-lg mb-4"
            >
              <img
                src={images}
                alt={company.name}
                className="w-12 h-12 rounded-md mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{company.name}</h2>
                <p className="text-sm text-gray-600">{company.location}</p>
                <div className="flex items-center mt-1">
                  {/* Render Star Icons Based on Rating */}
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < company.averageRating
                            ? "fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Total Reviews */}
                  <span className="ml-2 text-gray-500">
                    {company.totalReviews} Reviews
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-7">
                <span className="text-gray-500 text-sm">
                  {moment(company.foundedOn).format("DD-MM-YYYY")}
                </span>
                <button
                  className="bg-black text-white px-4 h-7 rounded-md"
                  onClick={() => navigate(`/companyDetail/${company._id}`)}
                >
                  Detail Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
