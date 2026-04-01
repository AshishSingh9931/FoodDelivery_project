import Food from "../models/foodModel.js";

// ADD FOOD
export const addFood = async (req, res) => {
  try {
    const { name, price, category, desc, image, rating } = req.body;

    const food = await Food.create({
      name,
      price,
      category,
      desc,
      image,
      rating
    });

    res.json({ success: true, food });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// GET ALL FOOD
export const getFood = async (req, res) => {
  try {

    const foods = await Food.find();

    res.json({ success: true, foods });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// DELETE FOOD
export const deleteFood = async (req, res) => {
  try {

    const { id } = req.body;

    await Food.findByIdAndDelete(id);

    res.json({ success: true, message: "Food deleted" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// UPDATE FOOD
export const updateFood = async (req, res) => {
  try {

    const { id, name, price, category, desc, image, rating } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      { name, price, category, desc, image, rating },
      { returnDocument: "after" }   
    );

    res.json({ success: true, updatedFood });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};