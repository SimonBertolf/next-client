import axios from 'axios';
import { environment } from './config';

const { API_BASE_URL } = environment;

axios.defaults.baseURL = API_BASE_URL;

axios.defaults.withCredentials = false;
