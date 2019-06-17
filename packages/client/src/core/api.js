import { getBaseUrl } from '../utils/config';

export function fetchTestData() {
  return fetch(`${getBaseUrl()}/test`, {
    method: 'GET',
    credentials: 'include',
  }).then(raw => raw.json());
}
