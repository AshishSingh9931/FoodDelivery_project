import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {

const navigate = useNavigate();

const scrollToHome = () => {
  const home = document.getElementById("home");
  if(home){
    home.scrollIntoView({ behavior:"smooth" });
  } else {
    navigate("/");
    setTimeout(() => {
      const homeSection = document.getElementById("home");
      if(homeSection){
        homeSection.scrollIntoView({ behavior:"smooth" });
      }
    }, 200);
  }
};

const scrollToMenu = () => {
  const menu = document.getElementById("menu");
  if(menu){
    menu.scrollIntoView({ behavior:"smooth" });
  } else {
    navigate("/");
    setTimeout(() => {
      const menuSection = document.getElementById("menu");
      if(menuSection){
        menuSection.scrollIntoView({ behavior:"smooth" });
      }
    }, 200);
  }
};

const scrollToContact = () => {
  const contact = document.getElementById("contact");
  if(contact){
    contact.scrollIntoView({ behavior:"smooth" });
  }
};

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 mt-16">

      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-pink-500 mb-3">
            FoodExpress
          </h2>

          <p className="text-sm">
            Enjoy delicious meals delivered straight to your door. 
            Fresh ingredients, fast delivery, and unforgettable taste.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">

            <li
              onClick={scrollToHome}
              className="hover:text-pink-500 cursor-pointer"
            >
              Home
            </li>

            <li
              onClick={scrollToMenu}
              className="hover:text-pink-500 cursor-pointer"
            >
              Menu
            </li>

            <li className="hover:text-pink-500 cursor-pointer">
              <Link to="/cart">Orders</Link>
            </li>

            <li
              onClick={scrollToContact}
              className="hover:text-pink-500 cursor-pointer"
            >
              Contact
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>

          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm hover:text-pink-500"
          >
            <FaPhone /> +91 9931343026
          </a>

          <a
            href="mailto:ashishktr9576@gmail.com"
            className="flex items-center gap-2 text-sm mt-2 hover:text-pink-500"
          >
            <FaEnvelope /> support@foodexpress.com
          </a>

        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-lg">

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="cursor-pointer hover:text-pink-500 transition"/>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="cursor-pointer hover:text-pink-500 transition"/>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="cursor-pointer hover:text-pink-500 transition"/>
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-sm border-t border-gray-700 py-4">
        © 2026 FoodExpress. All rights reserved. | Made by Ashish Singh Rathore
      </div>

    </footer>
  );
};

export default Footer;