import express from "express";
import {
  addFood,
  getFood,
  deleteFood,
  updateFood
} from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post("/add", addFood);
foodRouter.get("/list", getFood);
foodRouter.post("/delete", deleteFood);

foodRouter.post("/update", updateFood);

export default foodRouter;