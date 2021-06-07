import axios from 'axios';
 
const apiMain = axios.create({
    baseURL: 'https://c.iconnect.solucoes.me',
})

export default apiMain;