import axios from 'axios';

function api() {
  return axios.create({
    baseURL: 'http://localhost:8100/api',
  });
}

export { api };
