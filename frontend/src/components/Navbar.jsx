import React, { useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.png"; 

const Navbar = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");

    if (isLoggedIn && currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleUserClick = () => {

    if (user) {
      const confirmLogout = window.confirm("Logout?");

      if (confirmLogout) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        window.location.reload();
      }

    } else {
      navigate("/login");
    }

  };

  return (

    <div className="bg-black/60 backdrop-blur-lg text-white flex justify-between items-center px-4 md:px-8 py-3 sticky top-0 z-50 shadow-lg">

      {/*LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-lg md:text-xl font-semibold cursor-pointer group"
      >
        <img 
          src={logo} 
          alt="logo" 
          className="w-8 h-8 md:w-9 md:h-9 rounded-full shadow-md group-hover:scale-110 transition duration-300"
        />

        <span className="tracking-wide">
          Food <span className="text-pink-500">Express</span>
        </span>
      </div>

      {/*ICONS */}
      <div className="flex items-center gap-4 md:gap-6 text-base md:text-lg">

        {/* ORDERS */}
        <FaClipboardList
          onClick={() => navigate("/my-orders")}
          className="cursor-pointer hover:text-pink-500 hover:scale-110 transition duration-200"
        />

        {/* USER */}
        <div
          onClick={handleUserClick}
          className="flex items-center gap-1 cursor-pointer hover:text-pink-500 transition duration-200"
        >
          <FaUser />
          <span className="hidden md:block text-sm">
            {user}
          </span>
        </div>

        {/* CART */}
        <FaShoppingCart
          onClick={() => navigate("/cart")}
          className="cursor-pointer hover:text-pink-500 hover:scale-110 transition duration-200"
        />

      </div>

    </div>

  );

};

export default Navbar;