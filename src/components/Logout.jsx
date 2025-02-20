import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const Logout = () => {
    const { Logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await Logout();
            navigate("/"); // লগআউটের পর লগইন পেজে পাঠাবে
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
            Logout
        </button>
    );
};

export default Logout;
