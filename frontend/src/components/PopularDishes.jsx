import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://fooddelivery-project-1.onrender.com";

const PopularDishes = ({ category }) => {

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/food/list`);
        setFoods(res.data.foods);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(
    (food) => !category || food.category === category
  );

  const handleBuyNow = (food) => {
    addToCart({ ...food, qty: 1 });
    navigate("/order");
  };

  return (
    <div className="px-10 py-16 bg-gradient-to-b from-gray-100 to-gray-300">

      <h2 className="text-3xl font-bold text-center text-pink-600 mb-3">
        Most Popular
      </h2>

      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Discover our most loved dishes chosen by food lovers.
      </p>

      {filteredFoods.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No items found in this category 😔
        </p>
      )}

      <div className="grid md:grid-cols-4 gap-6">

        {filteredFoods.map((food, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >

            <div className="relative overflow-hidden group h-44">

              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <button
                onClick={() => addToCart({ ...food, qty: 1 })}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-pink-600 hover:text-white transition"
              >
                <FaShoppingCart />
              </button>

            </div>

            {/* CONTENT */}
            <div className="p-4">

              <div className="flex justify-between items-center mb-1">

                <h3 className="font-semibold text-md">
                  {food.name}
                </h3>

                <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar />
                  <span className="ml-1 text-gray-700">
                    {food.rating || 4}
                  </span>
                </div>

              </div>

              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {food.desc}
              </p>

              <div className="mt-2">
                <span className="font-bold text-pink-600">
                  ₹{food.price}
                </span>
              </div>

              <button
                onClick={() => handleBuyNow(food)}
                className="mt-3 w-full border border-pink-600 text-pink-600 py-1.5 rounded-md flex items-center justify-center gap-2 hover:bg-pink-600 hover:text-white transition"
              >
                <FaBolt />
                Buy Now
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default PopularDishes;
