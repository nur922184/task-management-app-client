import React, { createContext, useState, useEffect } from "react";
import app from "../utils/Firebase.init";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // নতুন ব্যবহারকারী তৈরি করুন (ইমেল/পাসওয়ার্ড দিয়ে)
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // ইমেল/পাসওয়ার্ড দিয়ে লগইন করুন
    const SignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google দিয়ে লগইন করুন
    const continueToGoogle = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // ব্যবহারকারীর প্রোফাইল আপডেট করুন
    const UpdateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        });
    };

    // লগআউট করুন
    const Logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // ব্যবহারকারীর অথেন্টিকেশন স্টেট ট্র্যাক করুন
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])

    // অথেন্টিকেশন ডেটা প্রোভাইড করুন
    const AuthInfo = {
        user,
        createNewUser,
        SignIn,
        continueToGoogle,
        Logout,
        UpdateUserProfile,
        loading,
        setLoading,
    };

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;