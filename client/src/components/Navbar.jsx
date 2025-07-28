import React from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={()=> navigate('/')} className="cursor-pointer" src={logo} alt="" />
        <div className="flex gap-4 max-sm:text-xs">
          <button className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;