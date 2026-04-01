import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// routes
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js"; 

// config
dotenv.config();

// database connect
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// user routes
app.use("/api/user", userRouter);

// food routes
app.use("/api/food", foodRouter);

// ORDER ROUTES
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});