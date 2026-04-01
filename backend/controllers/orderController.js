import Order from "../models/orderModel.js";

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {

    const { items, amount, address, userName } = req.body; 

    const order = await Order.create({
      items,
      amount,
      address,
      userName   
    });

    res.json({ success: true, order });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// GET ALL ORDERS (ADMIN)
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find();

    res.json({ success: true, orders });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// UPDATE STATUS
export const updateStatus = async (req, res) => {
  try {

    const { id, status } = req.body;

    await Order.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" } 
    );

    res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};