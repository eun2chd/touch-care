import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * 인증 관련 커스텀 훅
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // TODO: 실제 인증 로직 구현
    // 예: AsyncStorage에서 토큰 확인, API 호출 등
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // 임시: 로딩 시뮬레이션
    setTimeout(() => {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }, 1000);
  };

  const login = async (email: string, password: string) => {
    // TODO: 실제 로그인 로직 구현
    setAuthState({
      user: { id: '1', name: '사용자', email },
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    // TODO: 실제 로그아웃 로직 구현
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};
