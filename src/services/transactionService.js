import api from "./api";

export const getSummary = async () => {
    const response = await api.get('/transactions/summary');
    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get('/transactions');
    return response.data;
};