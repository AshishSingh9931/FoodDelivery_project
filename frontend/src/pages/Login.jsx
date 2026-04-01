import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

const navigate = useNavigate();

const [loginData,setLoginData] = useState({
username:"",
password:""
});

const handleChange = (e)=>{
setLoginData({
...loginData,
[e.target.name]:e.target.value
});
};

const handleLogin = () => {

const savedUser = JSON.parse(localStorage.getItem("user"));

if(!savedUser){
alert("Please register first");
navigate("/register");
return;
}

if(
loginData.username === savedUser.username &&
loginData.password === savedUser.password
){

localStorage.setItem("isLoggedIn","true");
localStorage.setItem("currentUser", savedUser.username);

alert("Login successful");

navigate("/");
window.location.reload();

}else{

alert("Invalid username or password");

}

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
Login
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
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
className="w-full px-10 py-2 rounded-full bg-white/20 border border-white/30 placeholder-white"
/>

<FaLock className="absolute left-3 top-3 text-white"/>

</div>

<button
onClick={handleLogin}
className="w-full bg-white text-purple-700 py-2 rounded-full font-semibold hover:bg-gray-200"
>
Login
</button>

<p className="text-center text-sm mt-4">
Don't have an account?{" "}
<Link to="/register" className="font-semibold underline">
Register
</Link>
</p>

</div>

</div>

);

};

export default Login;