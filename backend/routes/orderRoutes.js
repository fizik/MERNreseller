import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
  getVendorOrders,
  addVendorOrder,
  getVendorOrderById,
  updateOrderToDeliveredVendor,
  updateOrderToPaidVendor,
} from "../controllers/orderController.js";
import { admin, protect, vendor } from "../middleware/authMiddleware.js";

router
  .route("/vendor")
  .get(protect, vendor, getVendorOrders)
  .post(protect, addVendorOrder);
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/vendor/:id").get(protect, vendor, getVendorOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/vendor/:id/pay").put(protect, vendor, updateOrderToPaidVendor);

router.route("/:id/deliver").put(protect, vendor, updateOrderToDelivered);
router
  .route("/vendor:id/deliver")
  .put(protect, vendor, updateOrderToDeliveredVendor);

export default router;
