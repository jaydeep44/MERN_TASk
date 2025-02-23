import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  foundedOn: { type: String, required: true },
  city: { type: String, required: true },
});

export default mongoose.model("Company", companySchema);
