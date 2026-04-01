import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBox, FaPlus, FaList, FaTrash, FaEdit } from "react-icons/fa";

const API_URL = "https://fooddelivery-project-1.onrender.com";

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState("");
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    desc: "",
    image: "",
    rating: ""
  });

// FETCH

  const fetchFoods = async () => {
    const res = await axios.get(`${API_URL}/api/food/list`);
    setFoods(res.data.foods);
  };

  const fetchOrders = async () => {
    const res = await axios.get(`${API_URL}/api/order/list`);
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchFoods();
    fetchOrders();
  }, []);

  // FORM

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    if (editId) {
      await axios.post(`${API_URL}/api/food/update`, {
        id: editId,
        ...formData
      });
      alert("Updated");
    } else {
      await axios.post(`${API_URL}/api/food/add`, formData);
      alert("Added");
    }

    setFormData({
      name: "",
      price: "",
      category: "",
      desc: "",
      image: "",
      rating: ""
    });

    setEditId(null);
    setActiveTab("manage");
    fetchFoods();
  };

  // DELETE
  const deleteFood = async (id) => {
    await axios.post(`${API_URL}/api/food/delete`, { id });
    fetchFoods();
  };

  // EDIT
  const handleEdit = (food) => {
    setFormData(food);
    setEditId(food._id);
    setActiveTab("add");
  };

  // STATUS UPDATE
  const updateStatus = async (id, status) => {
    await axios.post(`${API_URL}/api/order/status`, { id, status });
    fetchOrders();
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-5xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-10">
          Admin Dashboard
        </h2>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div onClick={() => setActiveTab("manage")} className="border rounded-xl h-40 flex flex-col justify-center items-center cursor-pointer hover:shadow-md">
            <FaBox className="text-3xl text-blue-600 mb-2"/>
            <h3 className="font-semibold">Manage Products</h3>
          </div>

          <div onClick={() => setActiveTab("add")} className="border rounded-xl h-40 flex flex-col justify-center items-center cursor-pointer hover:shadow-md">
            <FaPlus className="text-3xl text-green-600 mb-2"/>
            <h3 className="font-semibold">Add Product</h3>
          </div>

          <div onClick={() => setActiveTab("orders")} className="border rounded-xl h-40 flex flex-col justify-center items-center cursor-pointer hover:shadow-md">
            <FaList className="text-3xl text-purple-600 mb-2"/>
            <h3 className="font-semibold">Orders</h3>
          </div>

        </div>

        {/* ADD */}
        {activeTab === "add" && (
          <div className="max-w-md mx-auto bg-white p-5 rounded-xl shadow">

            <h3 className="text-lg font-bold mb-4 text-center">
              {editId ? "Edit Product" : "Add Product"}
            </h3>

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full mb-2 rounded"/>
            <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 w-full mb-2 rounded"/>
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2 w-full mb-2 rounded"/>
            <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" className="border p-2 w-full mb-2 rounded"/>
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="border p-2 w-full mb-2 rounded"/>

            <input 
              name="rating" 
              value={formData.rating} 
              onChange={handleChange} 
              placeholder="Rating (1-5)" 
              className="border p-2 w-full mb-3 rounded"
            />

            <button onClick={handleSubmit} className="bg-green-600 text-white py-2 w-full rounded">
              {editId ? "Update" : "Add"}
            </button>

          </div>
        )}

        {/* MANAGE */}
        {activeTab === "manage" && (
          <div className="grid md:grid-cols-3 gap-6">

            {foods.map((food) => (
              <div key={food._id} className="bg-white p-3 rounded-xl shadow flex flex-col justify-between h-[200px]">

                <img src={food.image} className="w-full h-20 object-cover rounded"/>

                <div>
                  <h4 className="font-semibold text-sm">{food.name}</h4>
                  <p className="text-gray-500 text-sm">₹{food.price}</p>
                  <p className="text-yellow-500 text-xs">⭐ {food.rating || 4}</p>
                </div>

                <div className="flex justify-between">

                  <button onClick={() => handleEdit(food)} className="bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-1">
                    <FaEdit /> Edit
                  </button>

                  <button onClick={() => deleteFood(food._id)} className="bg-red-500 text-white px-2 py-1 text-xs rounded flex items-center gap-1">
                    <FaTrash /> Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div>

            <h3 className="text-xl font-bold mb-6 text-center">
              Order Management
            </h3>

            <div className="space-y-4">

              {orders.map((order) => (
                <div key={order._id} className="bg-white p-5 rounded-xl shadow border">

                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-sm">
                      #{order._id}
                    </p>

                    <span className={`px-3 py-1 text-xs rounded-full font-semibold
                      ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Preparing" ? "bg-yellow-100 text-yellow-700" :
                        order.status === "Out for delivery" ? "bg-blue-100 text-blue-700" :
                        "bg-red-100 text-red-700"}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* USER NAME */}
                  <p className="font-semibold mb-1">
                    👤 {order.userName || "Guest"}
                  </p>

                  {/* DETAILS */}
                  <div className="text-sm text-gray-600">
                    <p>Amount: ₹{order.amount}</p>
                    <p>{order.address?.city}</p>
                  </div>

                  {/* STATUS */}
                  <div className="mt-4">
                    <select
                      value={order.status}
                      onChange={(e)=>updateStatus(order._id, e.target.value)}
                      className="w-full border p-2 rounded"
                    >
                      <option>Pending</option>
                      <option>Preparing</option>
                      <option>Out for delivery</option>
                      <option>Delivered</option>
                    </select>
                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
