import axios from 'axios';
import { DWN_API_URL } from '../constants/constant';


const instance = axios.create({
  baseURL: DWN_API_URL
});

export default instance;