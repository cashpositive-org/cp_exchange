export function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:2000/api';
  }

  return 'https://cp-exchange-test.herokuapp.com/api';
}
