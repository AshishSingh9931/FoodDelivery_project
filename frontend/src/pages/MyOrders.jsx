import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://fooddelivery-project-1.onrender.com";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/order/list`);
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // STATUS MESSAGE
  const getStatusMessage = (status) => {
    if (status === "Pending") {
      return "⏳ Your order is placed and waiting for confirmation.";
    }
    if (status === "Preparing") {
      return "👨‍🍳 Your food is being prepared with care.";
    }
    if (status === "Delivered") {
      return "🎉 Order delivered successfully! Enjoy your meal.";
    }
    return "";
  };

  // TIME FORMAT
  const formatTime = (date) => {
    return new Date(date).toLocaleString();
  };

  // STEP
  const getStep = (status) => {
    if (status === "Pending") return 1;
    if (status === "Preparing") return 2;
    if (status === "Delivered") return 3;
    return 1;
  };

  return (

    <div className="px-10 py-16 bg-gray-50 min-h-screen">

      <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">
        My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-center text-gray-500">
          No orders yet
        </p>
      )}

      <div className="max-w-5xl mx-auto space-y-6">

        {orders.map((order, index) => {

          const step = getStep(order.status);

          return (
            <div key={index} className="bg-white p-6 rounded shadow">

              {/* HEADER */}
              <div className="flex justify-between mb-3">
                <span className="font-semibold">
                  Order ID: {order._id}
                </span>

                <span className={`font-bold 
                  ${order.status === "Delivered" ? "text-green-600" :
                    order.status === "Preparing" ? "text-yellow-600" :
                    "text-red-500"}`}>
                  {order.status}
                </span>
              </div>

              {/* TIME */}
              <p className="text-sm text-gray-500 mb-2">
                Ordered at: {formatTime(order.createdAt)}
              </p>

              {/* MESSAGE */}
              <p className="text-sm mb-4">
                {getStatusMessage(order.status)}
              </p>

              {/* TIMELINE */}
              <div className="flex justify-between items-center mt-4">

                <div className="flex flex-col items-center w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${step >= 1 ? "bg-green-500 text-white" : "bg-gray-300"}`}>
                    1
                  </div>
                  <p className="text-xs mt-1">Ordered</p>
                </div>

                <div className="flex-1 h-1 bg-gray-300"></div>

                <div className="flex flex-col items-center w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${step >= 2 ? "bg-green-500 text-white" : "bg-gray-300"}`}>
                    2
                  </div>
                  <p className="text-xs mt-1">Preparing</p>
                </div>

                <div className="flex-1 h-1 bg-gray-300"></div>

                <div className="flex flex-col items-center w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${step >= 3 ? "bg-green-500 text-white" : "bg-gray-300"}`}>
                    3
                  </div>
                  <p className="text-xs mt-1">Delivered</p>
                </div>

              </div>

              {/* DETAILS */}
              <div className="mt-4 text-sm text-gray-600">
                <p>Amount: ₹{order.amount}</p>
                <p>{order.address?.city}, {order.address?.state}</p>
              </div>

            </div>
          );

        })}

      </div>

    </div>

  );

};

export default MyOrders;
