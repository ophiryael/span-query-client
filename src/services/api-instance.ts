import axios from 'axios';

export const serverApi = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
