import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://fooddelivery-project-1.onrender.com";

const Order = () => {

const { cartItems } = useContext(CartContext);
const navigate = useNavigate();

const [loadingLocation, setLoadingLocation] = useState(false);

const [formData, setFormData] = useState({
firstName:"",
lastName:"",
email:"",
street:"",
city:"",
state:"",
zip:"",
country:"",
phone:""
});

/* LOGIN PROTECTION */
useEffect(()=>{
const isLoggedIn = localStorage.getItem("isLoggedIn");
if(!isLoggedIn){
alert("Please login first");
navigate("/login");
}
},[]);

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

/* AUTO LOCATION  */

const detectLocation = () => {

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLoadingLocation(true);

  navigator.geolocation.getCurrentPosition(async (position) => {

    const { latitude, longitude } = position.coords;

    try {

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const data = await res.json();

      setFormData((prev)=>({
        ...prev,
        city: data.address.city || data.address.town || "",
        state: data.address.state || "",
        zip: data.address.postcode || "",
        country: data.address.country || ""
      }));

      alert("Location detected ✅");

    } catch (error) {
      alert("Failed to detect location");
    }

    setLoadingLocation(false);

  }, () => {
    alert("Location permission denied");
    setLoadingLocation(false);
  });
};

/* VALIDATION */

const checkDistance = () => {

  const allowedCities = ["katihar"];
  const allowedPincodes = ["854104","854105","854106","854107"];

  const userCity = formData.city.trim().toLowerCase();
  const userPincode = formData.zip.trim();

  if (!allowedCities.includes(userCity)) {
    alert("Delivery only available in Katihar district");
    return false;
  }

  if (!allowedPincodes.includes(userPincode)) {
    alert("Delivery not available in your area");
    return false;
  }

  return true;
};

const subtotal = cartItems.reduce(
(total, item) => total + item.price * item.qty,
0
);

const deliveryFee = 20;
const total = subtotal + deliveryFee;

/* PLACE ORDER*/

const placeOrder = async () => {

if (!checkDistance()) return;

const { firstName,lastName,email,street,city,state,zip,country,phone } = formData;

if(!firstName || !lastName || !email || !street || !city || !state || !zip || !country || !phone){
alert("Please fill all details");
return;
}

try {

const userName = localStorage.getItem("currentUser"); // ✅ ADD

const res = await axios.post(`${API_URL}/api/order/place`, {
items: cartItems,
amount: total,
address: formData,
userName   // ✅ ADD
});

if(res.data.success){

navigate("/receipt",{
state:{
orderId: res.data.order._id,
total,
formData
}
});

}

} catch (error) {
console.log(error);
alert("Order failed");
}

};

return (

<div className="px-10 py-16 bg-gray-50">

<div className="max-w-6xl mx-auto mb-6">
<button onClick={() => navigate("/")} className="flex items-center gap-2 text-pink-600">
<FaHome /> Back To Home
</button>
</div>

<div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

{/* FORM */}
<div>

<h2 className="text-2xl font-bold mb-6">Delivery Information</h2>

<button
onClick={detectLocation}
className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded mb-4"
>
<FaMapMarkerAlt />
{loadingLocation ? "Detecting..." : "Use Current Location"}
</button>

<div className="grid grid-cols-2 gap-4">
<input name="firstName" placeholder="First Name" className="border p-2" onChange={handleChange}/>
<input name="lastName" placeholder="Last Name" className="border p-2" onChange={handleChange}/>
</div>

<input name="email" placeholder="Email" className="border p-2 w-full mt-3" onChange={handleChange}/>
<input name="street" placeholder="Street" className="border p-2 w-full mt-3" onChange={handleChange}/>

<div className="grid grid-cols-2 gap-4 mt-3">
<input name="city" value={formData.city} placeholder="City" className="border p-2" onChange={handleChange}/>
<input name="state" value={formData.state} placeholder="State" className="border p-2" onChange={handleChange}/>
</div>

<div className="grid grid-cols-2 gap-4 mt-3">
<input name="zip" value={formData.zip} placeholder="Zip" className="border p-2" onChange={handleChange}/>
<input name="country" value={formData.country} placeholder="Country" className="border p-2" onChange={handleChange}/>
</div>

<input name="phone" placeholder="Phone" className="border p-2 w-full mt-3" onChange={handleChange}/>

</div>

{/* TOTAL */}
<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold mb-4">Cart Totals</h2>

<div className="flex justify-between mb-2">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="flex justify-between mb-2">
<span>Delivery</span>
<span>₹{deliveryFee}</span>
</div>

<hr className="my-3"/>

<div className="flex justify-between font-bold">
<span>Total</span>
<span>₹{total}</span>
</div>

<button
onClick={placeOrder}
className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
>
Place Order (Cash on Delivery)
</button>

</div>

</div>

</div>

);

};

export default Order;
