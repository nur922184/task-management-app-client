import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // AuthContext থেকে createNewUser এবং UpdateUserProfile নিয়ে আসা
  const { createNewUser, UpdateUserProfile } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // নতুন ব্যবহারকারী তৈরি করুন
      const user = await createNewUser(email, password);
      
      // ইউজারের প্রোফাইল আপডেট করুন
      await UpdateUserProfile(fullName, photoUrl);

      // সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট করুন
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Sign up error:", error);
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* এরর মেসেজ */}
        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
