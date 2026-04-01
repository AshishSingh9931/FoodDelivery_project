import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

const navigate = useNavigate();

const [user,setUser] = useState({
username:"",
email:"",
password:""
});

const handleChange = (e)=>{
setUser({
...user,
[e.target.name]:e.target.value
});
};

const handleRegister = () => {

if(!user.username || !user.email || !user.password){
alert("Please fill all fields");
return;
}

localStorage.setItem("user",JSON.stringify(user));

alert("Registration Successful");

navigate("/login");

};

return (

<div
className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')", 
}}
>

{/* Background Blur Overlay */}
<div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

<div className="relative backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-10 w-[350px] shadow-xl text-white">

<h2 className="text-3xl font-bold text-center mb-6">
Register
</h2>

<div className="relative mb-4">

<input
type="text"
name="username"
placeholder="Username"
onChange={handleChange}
className="w-full px-10 py-2 rounded-full bg-white/20 border border-white/30 placeholder-white"
/>

<FaUser className="absolute left-3 top-3 text-white"/>

</div>

<div className="relative mb-4">

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
className="w-full px-10 py-2 rounded-full bg-white/20 border border-white/30 placeholder-white"
/>

<FaEnvelope className="absolute left-3 top-3 text-white"/>

</div>

<div className="relative mb-4">

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
className="w-full px-10 py-2 rounded-full bg-white/20 border border-white/30 placeholder-white"
/>

<FaLock className="absolute left-3 top-3 text-white"/>

</div>

<button
onClick={handleRegister}
className="w-full bg-white text-purple-700 py-2 rounded-full font-semibold hover:bg-gray-200"
>
Register
</button>

<p className="text-center text-sm mt-4">
Already have an account?{" "}
<Link to="/login" className="font-semibold underline">
Login
</Link>
</p>

</div>

</div>

);

};

export default Register;