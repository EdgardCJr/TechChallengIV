import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://192.168.68.119:3000/', 
});

export default Api;