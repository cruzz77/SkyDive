const API_BASE_URL = '/api';

const getHeaders = (role) => {
    const token = role === 'admin' ? localStorage.getItem('aToken') : localStorage.getItem('iToken');
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        if (role === 'admin') {
            headers['atoken'] = token;
        } else {
            headers['itoken'] = token;
        }
    }

    return headers;
};

export const api = {
    get: async (endpoint, role = 'admin') => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: getHeaders(role),
            });
            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },

    post: async (endpoint, data, role = 'admin') => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: getHeaders(role),
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },
};
