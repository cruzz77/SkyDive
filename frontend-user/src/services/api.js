let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://skydive-backend-qzsl.onrender.com/api';

// Ensure API_BASE_URL ends with /api
if (!API_BASE_URL.endsWith('/api')) {
    API_BASE_URL += '/api';
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['token'] = token;
    }

    return headers;
};

export const api = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: getHeaders(),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const fullUrl = `${API_BASE_URL}${endpoint}`;
            console.log('API Request:', fullUrl, data); // Debug logging
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error Response:', response.status, errorData);
                throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },

    // Add put, delete, etc.
};
