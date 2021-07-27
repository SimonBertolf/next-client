import axios from 'axios';
import qs from 'qs';
import { environment } from './config';

const { API_BASE_URL } = environment;

axios.defaults.baseURL = API_BASE_URL;

axios.defaults.paramsSerializer = (params) => qs.stringify(params);

axios.defaults.withCredentials = false;
