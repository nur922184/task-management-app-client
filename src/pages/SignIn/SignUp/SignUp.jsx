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
    const navigate = useNavigate();

    // AuthContext থেকে createNewUser এবং UpdateUserProfile নিয়ে আসা
    const { createNewUser, UpdateUserProfile } = useContext(AuthContext);


    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password should be at least 6 characters long!");
            alert("Password should be at least 6 characters long!");
            return;
        }

        try {
            // ✅ Firebase/Auth দিয়ে ইউজার তৈরি করা
            const user = await createNewUser(email, password);

            if (!user) {
                setError("Failed to create an account. Please try again!");
                alert("Failed to create an account. Please try again!");
                return;
            }

            // ✅ ইউজারের প্রোফাইল আপডেট করা
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
            
                const data = await response.json();
                console.log("User data saved to MongoDB:", data);
            } catch (error) {
                console.error("Error saving user data to MongoDB:", error);
                setError("Failed to save user data. Please try again!");
            }
             toast.success('sign-up successfully! 🎉');
            navigate("/dashboard/profile");
        } catch (error) {
            console.error("Sign up error:", error);
            setError(error.message || "An unexpected error occurred!");
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
                    <div>
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <div onClick={() => setShow(!show)} className='w-10 absolute ml-[355px] -mt-11 items-end text-end text-orange-700 '>
                            {
                                show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <SocialLogin></SocialLogin>
                <div className="mt-5 ">
                    <span className="py-5 flex flex-row">
                        Already have an Account?  <Link to='/'> <p className="text-blue-600 underline ml-3"> Sign in here.</p></Link>
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

export default SignUp;
