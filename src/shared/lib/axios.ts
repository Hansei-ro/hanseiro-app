import axios from 'axios';

import { secureStorage } from './storage';

import { env } from '@/shared/config/env';

const BASE_URL = env.EXPO_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await secureStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 전역 에러 처리
    if (error.response) {
      // 401 Unauthorized: 토큰 만료
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // TODO: [Backend] 토큰 갱신 API 구현 필요
          // API Spec Proposal:
          // POST /auth/refresh
          // Header: Authorization: Bearer {refreshToken}
          // Response: { accessToken: string, refreshToken: string }

          console.warn('⚠️ Access Token expired. Attempting to refresh...');

          // const refreshToken = await secureStorage.getItem('refreshToken');
          // if (!refreshToken) throw new Error('No refresh token available');

          // Mock Refresh Logic (Backend 구현 전까지 임시 사용)
          // const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
          // await secureStorage.setItem('accessToken', data.accessToken);
          // await secureStorage.setItem('refreshToken', data.refreshToken);

          // originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          // return axiosInstance(originalRequest);

          // 현재는 구현되지 않았으므로 로그아웃 처리 또는 에러 투척
          console.error('Refresh logic not implemented yet.');
          return Promise.reject(error);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // TODO: 로그아웃 처리 (스토어 초기화 및 로그인 화면 이동)
          // useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }

      console.error('Response Error:', error.response.data);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);
