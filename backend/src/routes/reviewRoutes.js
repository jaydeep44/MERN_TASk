import express from "express";
import {
  addReview,
  getReviewsByCompany,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/ceate_review", addReview);
router.get("/:companyId", getReviewsByCompany);

export default router;
