import React, { createContext, useState } from 'react';
import { api } from '../services/api';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken'));

    const login = async (email, password) => {
        try {
            const data = await api.post('/admin/login', { email, password }, 'admin');
            if (data.success) {
                setAToken(data.token);
                localStorage.setItem('aToken', data.token);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setAToken(null);
        localStorage.removeItem('aToken');
    };

    return (
        <AdminContext.Provider value={{ aToken, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => React.useContext(AdminContext);
