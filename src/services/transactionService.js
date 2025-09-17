import api from "./api";

export const getSummary = async () => {
    const response = await api.get('/transactions/summary');
    return response.data;
};

export const getTransactions = async (limit) => {
    let url = '/transactions';

    if (limit) {
        url += `?limit=${limit}`;
    }

    const response = await api.get(url);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
};

export const createTransaction = async (transactionData) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
};

export const updateTransaction = async (id, transactionData) => {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
};