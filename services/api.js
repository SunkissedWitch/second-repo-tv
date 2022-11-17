import axios from 'axios';
import { TV_TALK_API, TV_TALK_API_LOCAL } from '../util/constants';

const instance = axios.create({
  baseURL: process.env.API_ENV === 'development' ? TV_TALK_API_LOCAL : TV_TALK_API,
});

export default instance;