
import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: 'https://apimarketplace-pi.vercel.app/api'
    // baseURL: 'http://localhost:9000/api'
})