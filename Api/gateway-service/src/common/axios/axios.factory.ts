import { HttpException } from '@nestjs/common';
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from 'axios';

interface MicroserviceErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export function createServiceApi(
  baseURL: string | undefined,
  serviceName: string,
): AxiosInstance {
  if (!baseURL) {
    throw new Error(`[Gateway] ${serviceName} URL tidak terdefinisi di .env`);
  }

  const api = axios.create({
    baseURL,
    timeout: 5000,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (process.env.INTERNAL_SECRET) {
        config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
      }
      return config;
    },
    (error: unknown) =>
      Promise.reject(error instanceof Error ? error : new Error(String(error))),
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<MicroserviceErrorResponse | string>) => {
      const status = error.response?.status;
      const data = error.response?.data;

      let errorMessage: string | string[] =
        `Terjadi kesalahan pada ${serviceName}`;
      if (typeof data === 'string') {
        errorMessage = data;
      } else if (data?.message) {
        errorMessage = data.message;
      }

      if (status && data) {
        throw new HttpException(errorMessage, status);
      }

      console.error(
        `[Axios Error - ${serviceName}] (${error.code}):`,
        error.message,
      );
      throw new HttpException(
        `${serviceName} tidak dapat diakses saat ini.`,
        502,
      );
    },
  );

  return api;
}
