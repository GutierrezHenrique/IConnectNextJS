import axios from 'axios';
 
const apiMain = axios.create({
    baseURL: 'http://191.252.222.230:3001/',

})

export default apiMain;
