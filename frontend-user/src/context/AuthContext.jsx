import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const loadUserProfile = async () => {
        try {
            const data = await api.get('/user/get-profile');
            if (data.success) {
                setUser(data.userData);
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    useEffect(() => {
        if (token) {
            loadUserProfile();
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const data = await api.post('/user/login', { email, password });
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                await loadUserProfile(); // Load full profile immediately
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signup = async (userData) => {
        try {
            const data = await api.post('/user/register', userData);
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setUser({ email: userData.email, name: userData.name }); // Set initial data
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const updateUser = (data) => {
        setUser({ ...user, ...data });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, updateUser, loading, loadUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
