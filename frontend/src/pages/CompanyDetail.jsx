import axios from "axios";
import { Star, MapPin, Calendar } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constant";
import images from "../assets/images.png";
import AddReview from "../components/AddReviewModal";
import ReviewList from "../components/ReviewList";

const CompanyDetail = () => {
  const [companyDetail, setCompanieDetail] = useState();
  const [companyReviews, setCompanieReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);
  const { id } = useParams(); // Get 'id' from URL

  const fetchCompaniesDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/companies/details/${id}`);
      setCompanieDetail(response.data.company);
      setCompanieReviews(response.data.review);
    } catch (err) {
      toast.error("Error fetching company data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompaniesDetail();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Company Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src={images}
            alt={images}
            className="w-16 h-16 rounded-full mr-4"
          />

          {/* Details */}
          <div className="flex-grow">
            <h2 className="text-xl font-semibold">{companyDetail?.name}</h2>
            <p className="text-gray-500 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {companyDetail?.location}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(companyReviews?.length)
                        ? "fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </span>
              <span className="ml-2 text-gray-600">
                {companyReviews?.length} Reviews
              </span>
            </div>
          </div>

          {/* Founded Date & Add Review Button */}
          <div className="text-right">
            <p className="text-gray-500 flex items-center justify-end">
              <Calendar className="w-4 h-4 mr-1" />
              Founded on {moment(companyDetail?.foundedOn).format("DD-MM-YYYY")}
            </p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => setReviewModal(true)}
            >
              + Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <ReviewList companyReviews={companyReviews} />

      {reviewModal && (
        <AddReview
          onClose={() => setReviewModal(false)}
          companyId={companyDetail?._id}
          renderParent={() => fetchCompaniesDetail()}
        />
      )}
    </div>
  );
};

export default CompanyDetail;
