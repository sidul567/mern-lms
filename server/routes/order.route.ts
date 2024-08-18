import express from "express";
import { authorizedRoles, isAuthenticate } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  getStripePublishableKey,
  newPayment,
} from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";

const orderRouter = express.Router();

// Create order
orderRouter.post(
  "/order/create",
  updateAccessToken,
  isAuthenticate,
  createOrder
);

// Get all orders -- admin
orderRouter.get(
  "/orders",
  updateAccessToken,
  isAuthenticate,
  authorizedRoles("admin"),
  getAllOrders
);

// send stripe publishable key
orderRouter.get("/stripe-publishable-key", getStripePublishableKey);

// create payment
orderRouter.post("/payment", isAuthenticate, newPayment);

export default orderRouter;
