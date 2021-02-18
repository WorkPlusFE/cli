import { apiGet } from '@/utils/http/https';

export const getUserDetail = () => apiGet('/mock/api/user');
export const getUsers = () => apiGet('/mock/api/list?limit=20&skip=0');
