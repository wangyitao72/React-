import axios from 'axios'

//基础设置
const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
  timeout: 5000 
});
//请求拦截器
instance.interceptors.request.use((config) => {
  //config.headers.token = store.state.users.token;
  return config;
}, (error) => {
  return Promise.reject(error);
});
//响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

const http = {
  get(url, data){
    return instance.get(url, {
      params: data 
    })
  },
  post(url, data){
    return instance.post(url, data)
  },
  put(url, data){  //在resfulapi中整体更新
    return instance.put(url, data)
  },
  patch(url, data){  //在resfulapi中局部更新
    return instance.patch(url, data)
  },
  delete(url, data){
    return instance.delete(url, {
      data
    })
  }
};

export default http;