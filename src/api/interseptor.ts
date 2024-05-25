import axios from 'axios';
import {API_URL} from "./api.constants";

export const getContentType = () => ({
    'Content-Type': 'application/json'
});

export const axiosClassic = axios.create({
    baseURL: API_URL,
    headers: getContentType(),
    withCredentials: true,
});
