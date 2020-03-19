import axios from 'axios';

import {config} from '../config/constants';

const instance = axios.create({
  baseURL: config.apiUrl,
});

export default instance;
