import axios from 'axios';

function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:2000/api';
  }

  return 'https://cp-exchange-test.herokuapp.com/api';
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
