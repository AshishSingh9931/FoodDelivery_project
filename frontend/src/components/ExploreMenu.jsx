import React, { useState } from "react";

const ExploreMenu = ({ setCategory }) => {

  const [active, setActive] = useState("");

  const handleClick = (cat) => {
    setCategory(cat);
    setActive(cat);
  };

  return (
    <div className="py-20 px-6 md:px-10 text-center bg-gradient-to-b from-gray-100 to-gray-300">

      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        Explore Our Menu
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Discover a variety of delicious dishes crafted with fresh ingredients.
      </p>

      <div className="flex md:flex-wrap gap-6 md:gap-10 overflow-x-auto md:overflow-visible justify-start md:justify-center px-2">

        {[
          { name: "Burger", img: "/assets/burger.jpg" },
          { name: "Pizza", img: "/assets/pizza.jpg" },
          { name: "Dessert", img: "/assets/deserts.jpg" },
          { name: "Veg", img: "/assets/veg.jpg" },
          { name: "Non Veg", img: "/assets/non.jpg" },
          { name: "Drinks", img: "/assets/drinks.jpg" },
          { name: "Snacks", img: "/assets/snacks.jpg" },
          { name: "South Indian", img: "/assets/south.jpg" },
        ].map((item, index) => (

          <div
            key={index}
            onClick={() => handleClick(item.name)}
            className="cursor-pointer group flex-shrink-0 active:scale-95 transition"
          >

            <img
              src={item.img}
              alt={item.name}
              className={`w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 transition duration-300
              ${
                active === item.name
                  ? "border-pink-600 scale-105"
                  : "border-transparent group-hover:border-pink-400 group-hover:scale-105"
              }`}
            />

            <p
              className={`mt-2 text-xs md:text-sm transition
              ${
                active === item.name
                  ? "text-pink-600 font-semibold"
                  : "group-hover:text-pink-500"
              }`}
            >
              {item.name}
            </p>

          </div>

        ))}

      </div>
    </div>
  );
};

export default ExploreMenu;