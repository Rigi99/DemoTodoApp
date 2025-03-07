import axios from "axios";
import { BACKEND_BASE_API_URL } from "../constants";

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_API_URL,
    withCredentials: true,
});

export default axiosInstance;
