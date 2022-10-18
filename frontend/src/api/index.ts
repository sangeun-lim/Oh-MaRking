import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getProduct = async (path: string) => {
  console.log(api);
  const res = await api.get(`${path}`);
  return res.data.description;
};
