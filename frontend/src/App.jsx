import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Receipt from "./pages/Receipt";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// USER PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

// ADMIN SHORTCUT (Shift + A)
const AdminShortcut = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const handleKey = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === "a") {
        navigate("/admin");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };

  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <CartProvider>

      <BrowserRouter>

        {/* SECRET SHORTCUT */}
        <AdminShortcut />

        <Navbar />

        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />

          {/* ORDER */}
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          {/* MY ORDERS */}
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route path="/receipt" element={<Receipt />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>

        <Footer />

      </BrowserRouter>

    </CartProvider>
  );
};

export default App;