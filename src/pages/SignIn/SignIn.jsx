import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const SignIn = () => {
    const { SignIn, continueToGoogle } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await SignIn(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError("Failed to login. Please check your email and password.");
            console.error("Login error:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await continueToGoogle();
            navigate("/dashboard");
        } catch (error) {
            setError("Failed to login with Google. Please try again.");
            console.error("Google login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {/* ইমেল/পাসওয়ার্ড ফর্ম */}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Google সাইন-ইন বাটন */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full mt-4 flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                    <img
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        alt="Google Logo"
                        className="w-6 h-6 mr-2"
                    />
                    Sign in with Google
                </button>
                <div className="mt-5">
                    <span className="py-5">
                        New here? <Link to='signup'> Create an Envato account</Link>
                    </span>
                </div>

                {/* এরর মেসেজ */}
                {error && (
                    <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
                )}
            </div>
        </div>
    );
};


export default SignIn;