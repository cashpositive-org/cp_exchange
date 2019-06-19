import axios from 'axios';

export function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:2000';
  }

  return 'https://cp-exchange-test.herokuapp.com';
}

export const apiService = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export const apiFailureHandler = async request => {
  try {
    const response = await request();

    return response.data;
  } catch (error) {
    console.error(error);

    return null;
  }
};
