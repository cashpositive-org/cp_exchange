import { apiService, apiFailureHandler } from '../utils/api';

export function makeATransfer(body) {
  return apiFailureHandler(() => apiService.post('/api/transfer', body));
}
