import axios from 'axios';

import { secureStorage } from './storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

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
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 전역 에러 처리
    if (error.response) {
      // 서버가 2xx 범위를 벗어나는 상태 코드로 응답함
      console.error('Response Error:', error.response.data);

      if (error.response.status === 401) {
        // 인증 실패 처리 (예: 로그인 리다이렉트, 토큰 갱신)
        // 현재는 로그만 출력
        console.warn('Unauthorized access - 401');
      }
    } else if (error.request) {
      // 요청은 전송되었으나 응답을 받지 못함
      console.error('Request Error:', error.request);
    } else {
      // 요청 설정 중 에러 발생
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
