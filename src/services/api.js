import axios from "axios";

const apiUrl = "https://moneyte-api.onrender.com/api"

const api = axios.create({
    baseURL: apiUrl,
});

export default api;