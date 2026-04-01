import React, { useState } from "react";
import ExploreMenu from "../components/ExploreMenu";
import PopularDishes from "../components/PopularDishes";

const Home = () => {

  const [category, setCategory] = useState("");

  /* Scroll to Contact */
  const scrollToContact = () => {
    const footer = document.getElementById("contact");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Scroll to Menu */
  const scrollToMenu = () => {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>

      {/* HERO SECTION (SAME FILE) */}
      <div className="relative h-[75vh] flex items-center justify-center">

        {/* BACKGROUND IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="hero"
          className="absolute w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6 text-white">

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh & Delicious Food Delivered 🍔
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-8">
            Enjoy tasty meals from the best restaurants near you.
            Fast delivery, great flavors, and convenience anytime.
          </p>

          {/* BUTTONS */}
          <div className="flex justify-center gap-5 flex-wrap">

            <button
              onClick={scrollToMenu}
              className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition shadow-lg"
            >
              Explore Menu
            </button>

            <button
              onClick={scrollToContact}
              className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition"
            >
              Contact Us
            </button>

          </div>

        </div>

      </div>

      {/* MENU */}
      <div id="menu">
        <ExploreMenu setCategory={setCategory} />
      </div>

      {/* DISHES */}
      <PopularDishes category={category} />

    </div>
  );
};

export default Home;