import axios from 'axios';
import { CONTEXT_PATH } from './constant';
import Cookie from './cookie';
import store from '../index';


axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// axios.defaults.headers.post.token = Cookie.getItem('token');
// axios.defaults.headers.common.Authorization = Cookie.getItem('token')

const fetch = (url, options) => {
  const { method = 'get', data } = options;
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data });
    case 'delete':
      return axios.delete(url, { data });
    case 'head':
      return axios.head(url, data);
    case 'post':
      return axios.post(url, JSON.stringify(data));
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

export function get(url, options) {
  return request(url, { ...options, method: 'get' });
}

export function post(url, options) {
  return request(url, { ...options, method: 'post' });
}

export function put(url, options) {
  return request(url, { ...options, method: 'put' });
}

export function deleted(url, options) {
  return request(url, { ...options, method: 'deleted' });
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function responseInterceptor({ data, errCode, msg }) {
  if (errCode === 0) {
    return data;
  } else if (errCode === 1000) {
    Cookie.removeItem('token');
    const { dispatch } = store;
    dispatch({
      type: 'login/logout',
    });
  }
  throw new Error(msg);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let requestUrl =  CONTEXT_PATH + url;

  if (url !== '/login') {
    requestUrl = `${requestUrl}?token=${Cookie.getItem('token')}`;
  }
  /**
   * Do something before send.
   */
  return fetch(requestUrl, options)
    .then(checkStatus)
    .then(handelData)
    .then(responseInterceptor)
}

function handelData(res) {
  return res.data;
}
