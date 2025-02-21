import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
   const { continueToGoogle } = useContext(AuthContext);
   const navigate = useNavigate();
   const handleGoogleLogin = async () => {
    try {
        const result = await continueToGoogle(); // Firebase Google Login
        
        if (result) {
            const user = {
                fullName: result.user.displayName,
                email: result.user.email,
                photoUrl: result.user.photoURL
            };

            // ✅ ইউজারের ডাটা MongoDB-তে পাঠানো
            await fetch("https://task-management-backend-ochre.vercel.app/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            navigate("/dashboard/profile");
        }
    } catch (error) {
        setError("Failed to login with Google. Please try again.");
        console.error("Google login error:", error);
    }
};

    return (
        <div>
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
        </div>
    );
};

export default SocialLogin;