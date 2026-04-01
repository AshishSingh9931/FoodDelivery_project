import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCheckCircle } from "react-icons/fa";

const Receipt = () => {

const navigate = useNavigate();
const location = useLocation();

const { cartItems } = useContext(CartContext);

const { orderId, total, formData } = location.state || {};

const deliveryFee = 20;

const subtotal = cartItems.reduce(
(total, item) => total + item.price * item.qty,
0
);

return (

<div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

<div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">

{/* Header */}

<div className="text-center border-b pb-4">

<FaCheckCircle className="text-green-500 text-5xl mx-auto mb-2"/>

<h2 className="text-2xl font-bold text-gray-800">
Order Placed Successfully
</h2>

<p className="text-gray-500 text-sm">
Thank you for your order
</p>

</div>

{/* Order Info */}

<div className="flex justify-between mt-6 text-sm">

<div>
<p className="font-semibold">Order ID</p>
<p className="text-gray-600">{orderId}</p>
</div>

<div>
<p className="font-semibold">Order Date</p>
<p className="text-gray-600">
{new Date().toLocaleString()}
</p>
</div>

</div>

<hr className="my-6"/>

{/* Delivery Address */}

<div>

<h3 className="font-semibold mb-2">
Delivery Address
</h3>

<p className="text-gray-600 text-sm">

{formData?.firstName} {formData?.lastName} <br/>

{formData?.street} <br/>

{formData?.city}, {formData?.state} <br/>

{formData?.country} - {formData?.zip} <br/>

Phone: {formData?.phone}

</p>

</div>

<hr className="my-6"/>

{/* Items Table */}

<div>

<h3 className="font-semibold mb-3">
Order Summary
</h3>

<table className="w-full text-sm">

<thead className="border-b">

<tr className="text-left">

<th className="pb-2">Item</th>

<th className="pb-2">Qty</th>

<th className="pb-2 text-right">Price</th>

</tr>

</thead>

<tbody>

{cartItems.map((item,index)=>(

<tr key={index} className="border-b">

<td className="py-2">{item.name}</td>

<td>{item.qty}</td>

<td className="text-right">
₹{item.price * item.qty}
</td>

</tr>

))}

</tbody>

</table>

</div>

<hr className="my-6"/>

{/* Price Breakdown */}

<div className="text-sm">

<div className="flex justify-between mb-2">

<span>Subtotal</span>

<span>₹{subtotal}</span>

</div>

<div className="flex justify-between mb-2">

<span>Delivery Fee</span>

<span>₹{deliveryFee}</span>

</div>

<div className="flex justify-between font-bold text-lg border-t pt-3">

<span>Total Paid</span>

<span className="text-pink-600">
₹{total}
</span>

</div>

</div>

{/* Footer */}

<div className="text-center mt-8">

<p className="text-gray-500 text-sm mb-4">
You can track your order using the Order ID.
</p>

<button
onClick={()=>navigate("/")}
className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
>
Back To Home
</button>

</div>

</div>

</div>

);

};

export default Receipt;