import axios from 'axios';
 
const apiMain = axios.create({
    baseURL: 'http://localhost:3001/',

})

export default apiMain;