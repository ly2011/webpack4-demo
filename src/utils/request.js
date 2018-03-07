import axios from 'axios';
import querystring from 'querystring';
import { BASE_API } from '@/config';

const CancelToken = axios.CancelToken;
//设置默认请求头
axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';
// 发送请求前处理request的数据
axios.defaults.transformRequest = [
  function(data) {
    return querystring.stringify(data);
  }
];
// 带cookie请求 axios.defaults.withCredentials = true;

window.cancelToken && window.cancelToken(); // 根据标记取消对应的请求
// 创建axios实例
const service = axios.create({
  baseURL: BASE_API, // api的base_url
  // baseURL: 'http://localhost:8081', // api的base_url
  timeout: 15000, // 请求超时时间
  transformRequest: [
    function(data) {
      // Do whatever you want to transform the data
      return querystring.stringify(data);
    }
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  cancelToken: new CancelToken(function executor(c) {
    // 为每个请求做一个标记
    window.cancelToken = c;
  })
});

// request拦截器
service.interceptors.request.use(
  config => {
    const token = '';
    if (!config.data) {
      config.data = {};
    }
    config.data.token = token || '';
    // if (config.method === 'post') {   // 序列化   config.data =
    // querystring.stringify(config.data); }
    return config;
  },
  error => {
    // Do something with request error console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    // store.dispatch('HideListLoading');
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    const errMsgs = {
      1000: 'token错误',
      1002: 'token冲突被重置为无效',
      1003: '登录失败',
      1005: '用户被禁用'
    };
    if (res.code !== 200) {
      // 1000: token错误; 1002: token冲突被重置为无效; 1003: 登录失败; 1004: 验证码错误; 1005: 用户被禁用
      if (
        res.code === 1000 ||
        res.code === 1002 ||
        res.code === 1003 ||
        res.code === 1005
      ) {
        // MessageBox.confirm(   '你已被登出，可以取消继续留在该页面，或者重新登录',   '确定出',   {
        // confirmButtonText: '重新登录',     cancelButtonText: '取消',     type: 'warning' }
        // ).then(() => { store.dispatch('FedLogOut').then(() => {   router.push({
        // name: 'login' }); }); });
      }
      // Message({   message: errMsgs[res.code] || res.message,   type: 'error' });
      if (res.code === 500) {
        return Promise.reject(res);
      }
      return Promise.reject(res);
    } else {
      return response.data;
    }
  },
  error => {
    // store.dispatch('HideListLoading');
    if (window.cancelToken) {
      // 如果该请求被取消就会进入这个判断
      console.log('Request canceled');
    }
    // Message({   message: error.message,   type: 'error' });

    return Promise.reject(error);
  }
);

// get 方法请求
export const get = (url, data) => {
  return axios
    .get(url, { params: data })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

//post请求
function post(url, data) {
  return axios
    .post(url, querystring(data))
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export default service;
