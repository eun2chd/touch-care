import { create } from 'zustand';
// @ts-ignore - @react-native-async-storage/async-storage 타입 정의
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Device {
  id: string;
  name: string;
  macAddress: string;
  icon: string; // 아이콘 이름
  iconType: 'MaterialIcons' | 'Ionicons';
  isConnected: boolean;
  addedAt: string;
}

interface DeviceState {
  devices: Device[];
  addDevice: (device: Device) => Promise<void>;
  loadDevices: () => Promise<void>;
  removeDevice: (deviceId: string) => Promise<void>;
}

const STORAGE_KEY = '@touchcare_devices';

// 하드코딩된 장치 목록
export const AVAILABLE_DEVICES: Device[] = [
  {
    id: 'device-1',
    name: '터치미니+ #001',
    macAddress: 'AA:BB:CC:DD:EE:01',
    icon: 'bluetooth',
    iconType: 'MaterialIcons',
    isConnected: false,
    addedAt: '',
  },
];

/**
 * 디바이스 상태 관리 (Zustand + AsyncStorage)
 */
export const useDeviceStore = create<DeviceState>((set, get) => ({
  devices: [],

  addDevice: async (device: Device) => {
    const newDevice = {
      ...device,
      isConnected: true, // 장치 추가 시 연결됨으로 설정
      addedAt: new Date().toISOString(),
    };
    const updatedDevices = [...get().devices, newDevice];
    set({ devices: updatedDevices });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices));
  },

  loadDevices: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const devices = JSON.parse(stored);
        set({ devices });
      }
    } catch (error) {
      console.error('디바이스 로드 실패:', error);
    }
  },

  removeDevice: async (deviceId: string) => {
    const updatedDevices = get().devices.filter((d) => d.id !== deviceId);
    set({ devices: updatedDevices });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices));
  },
}));
