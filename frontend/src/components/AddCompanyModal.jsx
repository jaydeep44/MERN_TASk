import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Button from "./Button";
import InputField from "./InputField";
import { X } from "lucide-react";
import { MapPin } from "lucide-react";

const schema = yup.object().shape({
  name: yup.string().required("Company name is required"),
  location: yup.string().required("Location is required"),
  foundedOn: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Founded on is required"),
  city: yup.string().required("City is required"),
});

const AddCompanyModal = ({ onClose, renderParent }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/companies/createCompany",
        data
      );

      if (response.status === 201) {
        setMessage({ type: "success", text: "Company added successfully!" });
        reset();
        setTimeout(() => {
          setMessage({ type: "", text: "" });
          onClose();
        }, 1500);
        renderParent();
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add company. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add New Company</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {message.text && (
          <p
            className={
              message.type === "success" ? "text-green-600" : "text-red-600"
            }
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Company Name"
            {...register("name")}
            error={errors.name}
          />
          <InputField
            label="Location"
            {...register("location")}
            error={errors.location}
            icon={<MapPin size={18} />}
          />
          <InputField
            label="Founded On"
            type="date"
            {...register("foundedOn")}
            error={errors.foundedOn}
          />
          <InputField label="City" {...register("city")} error={errors.city} />

          <Button
            type="submit"
            text={loading ? "Submitting..." : "Submit"}
            className="w-full"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
