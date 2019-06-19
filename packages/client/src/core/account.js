import { apiService, apiFailureHandler } from '../utils/api';

export function getAccountDetails() {
  return apiFailureHandler(() => apiService.get('/api/account'));
}

export function createAccount(name) {
  return apiFailureHandler(() => apiService.post('/api/account', { name }));
}
