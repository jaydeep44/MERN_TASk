import { useState, useEffect } from "react";
import CompanyCard from "../components/CompanyCard";
import SelectBox from "../components/SelectBox";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import AddCompanyModal from "../components/AddCompanyModal";
import { API_URL, LOCATION, SORT_BY } from "../constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NoRecordsFound from "../components/RecordsNotFound";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortValue, setSort] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/companies`, {
        params: {
          sortBy: sortValue,
          location: locationFilter || undefined,
        },
      });
      setCompanies(response.data);
    } catch (err) {
      setLoading(false);
      toast.error("Error fetching company data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [sortValue, locationFilter]);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex m-10 ml-32 gap-10 items-center">
          <div className="flex flex-col">
            <SelectBox
              label="Select City"
              options={LOCATION}
              className="w-[400px]"
              onChange={setLocationFilter}
            />
          </div>
          <Button text="Find Company" />
          <Button
            text="+ Add Company"
            className="ml-10"
            onClick={() => setIsOpen(true)}
          />

          <div className="flex flex-col ml-10">
            <SelectBox
              label="Sort By"
              options={SORT_BY}
              className="w-40 ml-10"
              onChange={setSort}
            />
          </div>
        </div>
      </div>
      {!loading && !companies?.length && <NoRecordsFound />}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <CompanyCard companies={companies} />
      )}

      {isOpen && (
        <AddCompanyModal
          onClose={() => setIsOpen()}
          renderParent={() => fetchCompanies()}
        />
      )}
    </>
  );
}

export default Home;
