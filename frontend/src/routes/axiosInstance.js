
import axios from 'axios'

export const AxiosInstance = axios.create({
    // baseURL: 'https://datarepo-official.onrender.com/api',
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

