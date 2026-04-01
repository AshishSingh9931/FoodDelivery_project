import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const increaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].qty += 1;
    setCartItems(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      setCartItems(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  /* LOGIN CHECK */

  const handleOrder = () => {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {

      alert("Please login first");

      navigate("/login");

      return;

    }

    navigate("/order");

  };

  return (
    <div className="px-10 py-16 bg-gray-50">

      <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">
        Your Cart
      </h2>

      {cartItems.length === 0 && (
        <p className="text-center text-gray-500">
          Your cart is empty
        </p>
      )}

      {cartItems.map((item, index) => {

        const discount = Math.round(
          ((item.oldPrice - item.price) / item.oldPrice) * 100
        );

        return (
          <div
            key={index}
            className="flex gap-8 bg-white shadow-md p-6 rounded-xl mb-6 relative max-w-5xl mx-auto"
          >

            {/* Remove Button */}
            <button
              onClick={() => removeItem(index)}
              className="absolute top-4 right-4 text-red-500"
            >
              <FaTrash />
            </button>

            {/* Image */}
            <img
              src={item.img}
              className="w-64 h-40 object-cover rounded-lg"
              alt={item.name}
            />

            {/* Details */}
            <div className="flex flex-col justify-center">

              <h2 className="text-xl font-bold mb-2">
                {item.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center text-yellow-500 mb-2">
                <FaStar />
                <span className="ml-1">{item.rating}</span>
              </div>

              <p className="text-gray-500 mb-3">
                {item.desc}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-pink-600 font-bold">
                  ₹{item.price}
                </span>

                <span className="line-through text-gray-400">
                  ₹{item.oldPrice}
                </span>

                <span className="text-green-600 text-sm">
                  ({discount}% off)
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mt-4">

                <button
                  onClick={() => decreaseQty(index)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increaseQty(index)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>

              </div>

            </div>

          </div>
        );
      })}

      {/* Cart Total Section */}

      {cartItems.length > 0 && (

        <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <hr className="my-3"/>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-pink-600">₹{total}</span>
          </div>

          <div className="flex justify-end mt-6">

            <button
              onClick={handleOrder}
              className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700"
            >
              Order Now
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;