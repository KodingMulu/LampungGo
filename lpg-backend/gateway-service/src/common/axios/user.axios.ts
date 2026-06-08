import { createServiceApi } from './axios.factory';

export const auth_api = createServiceApi(
  process.env.USER_SERVICE_URL,
  'Auth Service',
);
