import express from "express";
const router = express.Router();
import { protect, admin, vendor } from "../middleware/authMiddleware.js";
import {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProduct,
  getProductsVendor,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, vendor, createProduct);
router.route("/vendor/:id").get(protect, vendor, getProductsVendor);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, vendor, deleteProduct)
  .put(protect, vendor, updateProduct);

export default router;
