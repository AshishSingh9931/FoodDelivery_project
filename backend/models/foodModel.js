import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  image: {
    type: String,
    required: true
  },

  rating: {   
    type: Number,
    default: 4
  }

}, { timestamps: true });

const Food = mongoose.model("Food", foodSchema);

export default Food;