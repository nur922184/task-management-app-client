import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false); // লোডিং স্টেট
    const navigate = useNavigate();
    const { SignIn } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true); // লোডিং শুরু
        SignIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Login has been successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setLoading(false); // লোডিং শেষ
                navigate("/dashboard/profile");
            })
            .catch(error => {
                console.error(error.message);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Login Failed",
                    text: "Incorrect email or password. Please try again.",
                    showConfirmButton: true,
                });
                setLoading(false); // লোডিং শেষ
            });
    };


    return (
        <div
            className="hero-content flex-col-reverse md:flex-row-reverse h-screen">
            <div
                className="card bg-base-75 bg-center bg-cover md:w-[40%] shadow-2xl">
                <div className='text-center px-5'>
                    <h1 className="text-5xl font-bold">Sign In now!</h1>
                    {/* <img className='w-36 h-24 mt-4 m-auto' src={logo || 'kj'} alt="" /> */}
                </div>
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input type="email" placeholder="email"
                            name="email"
                            className="input input-bordered dark:bg-gray-800 dark:text-white text-black" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input type={show ? 'text' : 'password'}
                            name="password"
                            placeholder="password" className="input input-bordered dark:bg-gray-800 dark:text-white text-black" required />
                        <div onClick={() => setShow(!show)} className='w-10 absolute right-6 top-[240px] text-orange-700 '>
                            {
                                show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover text-cyan-100">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-violet-300" type="submit" disabled={loading}>
                            {loading ? <span className="loading loading-spinner text-success ">Logging in...</span> : "Login"}
                        </button>
                    </div>
                    <SocialLogin></SocialLogin>
                    <p className='px-6 py-7 text-center'><small>Don't have an account? <Link className='text-blue-600 underline ml-2' to="/signup"> Create an account</Link></small></p>
                </form>
            </div>


        </div>
    );
};

export default SignIn;
