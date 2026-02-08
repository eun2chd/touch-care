import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { useDeviceStore } from '../store/useDeviceStore';

interface HomeScreenProps {
  navigation: any;
}

/**
 * 홈 화면
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const devices = useDeviceStore((state) => state.devices);
  const loadDevices = useDeviceStore((state) => state.loadDevices);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const handleAddDevice = () => {
    navigation.navigate('Device');
  };

  if (devices.length === 0) {
    return (
      <Screen showBottomTab={true} currentScreen="Home" onNavigate={navigation.navigate}>
        <Header navigation={navigation} />
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>연결된 디바이스 정보가 없습니다.</Text>
            <Text style={styles.emptyText}>
              터치 데이터를 수집하기 위해 디바이스를 추가해보세요.
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddDevice}
              activeOpacity={0.7}
            >
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addButtonText}>디바이스 추가하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen showBottomTab={true} currentScreen="Home" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.devicesContent}
      >
        <View style={styles.devicesHeader}>
          <Text style={styles.devicesTitle}>연결된 디바이스</Text>
          <TouchableOpacity
            style={styles.addButtonSmall}
            onPress={handleAddDevice}
            activeOpacity={0.7}
          >
            <MaterialIcons name="add" size={20} color={Colors.primary} />
            <Text style={styles.addButtonSmallText}>추가</Text>
          </TouchableOpacity>
        </View>
        {devices.map((device) => {
          return (
            <TouchableOpacity
              key={device.id}
              style={styles.deviceCard}
              onPress={() => {
                navigation.navigate('DeviceDashboard', { device });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.deviceCardLeft}>
                <View style={styles.deviceIconContainer}>
                  <MaterialIcons
                    name="devices"
                    size={32}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.deviceInfo}>
                  <Text style={styles.deviceName}>기기명 : {device.name}</Text>
                  <Text style={styles.deviceMac}>MAC : {device.macAddress}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: device.isConnected ? Colors.success : Colors.textLight }]}>
                    <Text style={styles.statusText}>
                      {device.isConnected ? '연결됨' : '연결 안 됨'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  emptyTitle: {
    ...Typography.text.h3,
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    ...Typography.text.body,
    color: Colors.textLight,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    minWidth: 200,
    gap: 8,
  },
  addButtonText: {
    ...Typography.text.bodyMedium,
    color: '#fff',
  },
  devicesContent: {
    padding: 20,
  },
  devicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  devicesTitle: {
    ...Typography.text.h4,
    color: Colors.primary,
  },
  addButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonSmallText: {
    ...Typography.text.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.iceBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...Typography.text.h4,
    color: Colors.text,
    marginBottom: 4,
  },
  deviceMac: {
    ...Typography.text.caption,
    color: Colors.textLight,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...Typography.text.caption,
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default HomeScreen;
