import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import SocialLogin from "../../../components/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // ✅ লোডিং স্টেট
    const navigate = useNavigate();

    const { createNewUser, UpdateUserProfile } = useContext(AuthContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // ✅ লোডিং শুরু

        if (password.length < 6) {
            setLoading(false);
            toast.error("Password should be at least 6 characters long! ❌");
            return;
        }

        try {
            const user = await createNewUser(email, password);

            if (!user) {
                setLoading(false);
                toast.error("Failed to create an account! ❌");
                return;
            }

            await UpdateUserProfile(fullName, photoUrl);

            // ✅ **MongoDB-তে ইউজারের ডাটা পাঠানো**
            try {
                const response = await fetch("https://task-management-backend-ochre.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ fullName, email, photoUrl }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                toast.success("Sign-up successful! 🎉");
                navigate("/dashboard/profile");
            } catch (error) {
                toast.error("Failed to save user data. Please try again! ❌");
            }
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred! ❌");
        } finally {
            setLoading(false); // ✅ লোডিং বন্ধ
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />
                    <input
                        type="url"
                        placeholder="Photo URL"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />
                    <div className="relative">
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <div onClick={() => setShow(!show)} className="absolute right-3 top-3 text-orange-700 cursor-pointer">
                            {show ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                        disabled={loading} // ✅ লোডিং হলে বাটন ডিজেবল
                    >
                        {loading ? (
                            <span className="border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"></span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
                <SocialLogin />
                <div className="mt-5 text-center">
                    <span>
                        Already have an account?
                        <Link to="/" className="text-blue-600 underline ml-2">Sign in here.</Link>
                    </span>
                </div>
                {error && <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;
