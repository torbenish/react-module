import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://gamabackend-with-node.herokuapp.com/'
})