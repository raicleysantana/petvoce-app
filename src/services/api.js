import axios from 'axios';

const api = axios.create({
    baseURL: 'https://petvoce-api.herokuapp.com/',
    //baseURL: 'http://10.0.0.115:3333/',
});

export default api;