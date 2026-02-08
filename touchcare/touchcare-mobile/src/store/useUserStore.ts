import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

// 하드코딩된 사용자 정보
export const DEFAULT_USER: User = {
  id: '1',
  name: 'NTP',
  email: 'NTP@ntpercent.ai',
  phone: '010-2211-2233',
};

/**
 * 사용자 상태 관리 (Zustand)
 */
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  clearUser: () => set({ user: null }),
}));
