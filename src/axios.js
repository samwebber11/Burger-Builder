import axios from 'axios';

const instance  = axios.create({
    baseURL:'https://burger-builder-b9a7a.firebaseio.com/'
});

export default instance;