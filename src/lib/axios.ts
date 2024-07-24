import rawAxios from 'axios';

const axios = rawAxios.create({
  method: 'GET',
  baseURL: process.env.NEXT_PUBLIC_DIR + '/api'
});

export default axios;
