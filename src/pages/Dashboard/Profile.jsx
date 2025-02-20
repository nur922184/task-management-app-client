import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const [users, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {user} = useAuth();
    const email = user?.email; // Replace with dynamic email as needed

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${email}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <p className="mt-1 text-lg text-gray-900">{users.fullName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <p className="mt-1 text-lg text-gray-900">{users.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio:</label>
                        <p className="mt-1 text-lg text-gray-900">{users.bio || 'No bio available'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;