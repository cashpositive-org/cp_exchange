function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:2000/api';
  }

  return 'https://cp-exchange-test.herokuapp.com/api';
}

export function fetchTestData() {
  return fetch(`${getBaseUrl()}/test`, {
    method: 'GET',
    credentials: 'include',
  }).then(raw => raw.json());
}
