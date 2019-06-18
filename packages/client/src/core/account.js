import { apiService, apiFailureHandler } from '../utils/api';

export function getAccountDetails() {
  return apiFailureHandler(() => apiService.get('/account'));
}

export function createAccount(name) {
  return apiFailureHandler(() => apiService.post('/account', { name }));
}
