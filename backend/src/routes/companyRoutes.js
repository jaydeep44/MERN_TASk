import express from "express";
import {
  addCompany,
  getCompanies,
  getCompanyById,
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/createCompany", addCompany);
router.get("/", getCompanies);
router.get("/details/:id", getCompanyById);

export default router;
