import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://localhost:5194',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export default httpClient;