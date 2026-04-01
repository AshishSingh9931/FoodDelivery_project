import express from "express";
import {
  placeOrder,
  getOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/list", getOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;