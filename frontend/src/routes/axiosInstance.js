
import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: 'https://datarepo-official.onrender.com/api'
    // baseURL: 'http://localhost:9000/api'
})