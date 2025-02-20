import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { FaEdit } from 'react-icons/fa';


const Profile = () => {
    const [users, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const email = user?.email;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://task-management-backend-ochre.vercel.app/users/${email}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [email]);

    const handleSave = async (updatedUser) => {
        try {
            const response = await axios.put(`https://task-management-backend-ochre.vercel.app/users/${email}`, updatedUser);
            setUser(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full text-center">
                <img
                    src={users.photoUrl}
                    alt="Avatar"
                    className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-gray-300"
                />
                <div className="absolute -mt-40">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='btn-ghost p-2 rounded-md flex flex-row gap-2 items-center text-blue-500'
                    >
                        <FaEdit></FaEdit> edit
                    </button>
                </div>
                <h1 className="text-2xl font-bold text-blue-800">About Me</h1>
                <h2 className="text-gray-900 text-2xl font-semibold">{users.fullName}</h2>
                <p className="text-gray-600 mt-2">
                    {users.About}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left text-gray-700">
                    <p><span className="font-semibold">Birthday:</span>{users.age}</p>
                    <p><span className="font-semibold">country:</span> {users.country}</p>
                    <p><span className="font-semibold">Address:</span> California, USA</p>
                    <p><span className="font-semibold">E-mail:</span> {users.email}</p>
                    <p><span className="font-semibold">Phone:</span>{users.phone}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-700">500</p>
                        <p className="text-sm text-gray-600">Happy Clients</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-700">150</p>
                        <p className="text-sm text-gray-600">Projects Completed</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-700">850</p>
                        <p className="text-sm text-gray-600">Photo Captures</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-700">190</p>
                        <p className="text-sm text-gray-600">Telephonic Talks</p>
                    </div>
                </div>
                
            </div>

            {isModalOpen && (
                <EditModal
                    user={users}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

const EditModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">PhotoUrl</label>
                            <input
                                type="url"
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="text"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                readOnly
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">About</label>
                            <textarea
                                type="ar"
                                name="About"
                                value={formData.About}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;