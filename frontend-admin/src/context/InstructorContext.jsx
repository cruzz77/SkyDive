import React, { createContext, useState } from 'react';
import { api } from '../services/api';

export const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
    const [iToken, setIToken] = useState(localStorage.getItem('iToken'));

    const login = async (email, password) => {
        try {
            const data = await api.post('/doctor/login', { email, password }, 'instructor');
            if (data.success) {
                setIToken(data.token);
                localStorage.setItem('iToken', data.token);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setIToken(null);
        localStorage.removeItem('iToken');
    };

    return (
        <InstructorContext.Provider value={{ iToken, login, logout }}>
            {children}
        </InstructorContext.Provider>
    );
};

export const useInstructor = () => React.useContext(InstructorContext);
