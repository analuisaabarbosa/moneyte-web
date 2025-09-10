import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post('/users/login', { email, password });

        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }

        return response.data;
    } catch (error) {
        localStorage.removeItem('userToken');
        delete api.defaults.headers.common['Authorization'];
        throw error;
    }
};