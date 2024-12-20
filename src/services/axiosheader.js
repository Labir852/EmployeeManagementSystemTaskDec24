// import axios from 'axios'

  
// export default instance;
import axios from 'axios';

 const baseURL = process.env.REACT_APP_BACKEND_API; 
//const baseURL = process.env.REACT_APP_BACKEND_API;


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
      "Content-Type":  "application/json"
    },
    

  });


// instance.interceptors.request.use(function (config) {
//  config.headers.post['Content-Type'] = 'application/json';
//  config.headers.get['Content-Type'] = 'application/json';
//   return config;
// });


export default instance;
