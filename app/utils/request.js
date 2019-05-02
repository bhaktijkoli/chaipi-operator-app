import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const host = '192.168.0.105';
const port = 3000;

module.exports.post = (url, data) => {
  return axios.post(route(url), data)
}

module.exports.get = (url) => {
  return axios.get(route(url))
}

module.exports.setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

const route = (url) => {
  // return `https://chaipaan.tk/api/v1${url}`;
  return `http://${host}:${port}/api/v1${url}`;
}

module.exports.route = route;
