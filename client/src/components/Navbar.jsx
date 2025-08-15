import React, { useContext, useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowLogin, userData, setUserData, setUserToken } = useContext(AppContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setUserData(null);
    setUserToken(null);
    localStorage.removeItem("userToken");
    navigate("/", { replace: true });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [userData]);


  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center relative">
        <img onClick={() => navigate('/')} className="cursor-pointer" src={logo} alt="Logo" />

        <div className="flex items-center gap-4 max-sm:text-xs">
          {userData ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <span className="font-medium max-sm:hidden">Welcome, {userData.name}</span>
                <img src={userData.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md w-40 z-50">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => {
                      navigate("/profile");
                      setIsDropdownOpen(false);
                    }}
                  >
                    My Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;