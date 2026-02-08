import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { useDeviceStore, AVAILABLE_DEVICES, Device } from '../store/useDeviceStore';

interface AddDeviceScreenProps {
  navigation: any;
}

type Step = 'guide' | 'bluetooth' | 'devices';

/**
 * 디바이스 추가 화면
 */
export const AddDeviceScreen: React.FC<AddDeviceScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState<Step>('guide');
  const [isBluetoothActivated, setIsBluetoothActivated] = useState(false);
  const addDevice = useDeviceStore((state) => state.addDevice);
  const devices = useDeviceStore((state) => state.devices);
  const loadDevices = useDeviceStore((state) => state.loadDevices);

  // 장치 목록 로드
  React.useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  // 이미 추가된 장치를 제외한 사용 가능한 장치 목록
  const availableDevices = React.useMemo(() => {
    const addedDeviceIds = new Set(devices.map((d) => d.id));
    return AVAILABLE_DEVICES.filter((device) => !addedDeviceIds.has(device.id));
  }, [devices]);

  const handleBack = () => {
    if (currentStep === 'guide') {
      navigation.goBack();
    } else if (currentStep === 'bluetooth') {
      setCurrentStep('guide');
    } else if (currentStep === 'devices') {
      setCurrentStep('bluetooth');
    }
  };

  const handleNext = () => {
    if (currentStep === 'guide') {
      setCurrentStep('bluetooth');
    } else if (currentStep === 'bluetooth' && isBluetoothActivated) {
      setCurrentStep('devices');
    }
  };

  const handlePrev = () => {
    if (currentStep === 'bluetooth') {
      setCurrentStep('guide');
      setIsBluetoothActivated(false);
    } else if (currentStep === 'devices') {
      setCurrentStep('bluetooth');
    }
  };

  const handleBluetoothActivate = () => {
    setIsBluetoothActivated(true);
  };

  const handleAddDevice = async (device: Device) => {
    await addDevice(device);
    Alert.alert('알림', '성공적으로 장치가 추가되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  // Step 1: 설치 가이드
  const renderGuideStep = () => (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.guideContainer}>
        <Text style={styles.guideTitle}>설치 가이드에 따라 진행해주세요</Text>
        <View style={styles.guideBox}>
          <Text style={styles.guideText}>
            터치 디바이스 가운데를 3초 이상{'\n'}눌러 초기화를 진행해주세요
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <Button
            title="이전"
            onPress={handleBack}
            variant="outline"
            style={styles.navButton}
            disabled={true}
          />
          <Button
            title="다음"
            onPress={handleNext}
            variant="primary"
            style={styles.navButton}
          />
        </View>
      </View>
    </ScrollView>
  );

  // Step 2: 블루투스 활성화
  const renderBluetoothStep = () => (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.bluetoothContainer}>
        <Image
          source={require('../../assets/images/bluetooth-symbol.png')}
          style={styles.bluetoothImage}
          resizeMode="contain"
        />
        <Text style={styles.bluetoothTitle}>블루투스를 활성화 해주세요</Text>
        <Button
          title="활성화 완료"
          onPress={handleBluetoothActivate}
          variant="primary"
          style={styles.activateButton}
          disabled={isBluetoothActivated}
        />
        <View style={styles.buttonRow}>
          <Button
            title="이전"
            onPress={handlePrev}
            variant="outline"
            style={styles.navButton}
          />
          <Button
            title="다음"
            onPress={handleNext}
            variant="primary"
            style={styles.navButton}
            disabled={!isBluetoothActivated}
          />
        </View>
      </View>
    </ScrollView>
  );

  // Step 3: 장치 목록
  const renderDevicesStep = () => {
    if (availableDevices.length === 0) {
      return (
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>추가할 수 있는 장치가 없습니다</Text>
            <Text style={styles.emptyText}>
              모든 장치가 이미 추가되었습니다.
            </Text>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.devicesContent}
      >
        <View style={styles.devicesContainer}>
          <Text style={styles.devicesTitle}>사용 가능한 장치</Text>
          {availableDevices.map((device) => {
          const IconComponent = device.iconType === 'MaterialIcons' ? MaterialIcons : Ionicons;
          return (
            <TouchableOpacity
              key={device.id}
              style={styles.deviceCard}
              onPress={() => handleAddDevice(device)}
              activeOpacity={0.7}
            >
              <View style={styles.deviceCardLeft}>
                <View style={styles.deviceIconContainer}>
                  <IconComponent
                    name={device.icon as any}
                    size={32}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.deviceInfo}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Text style={styles.deviceMac}>{device.macAddress}</Text>
                </View>
              </View>
              <MaterialIcons name="add-circle" size={32} color={Colors.primary} />
            </TouchableOpacity>
          );
        })}
        </View>
      </ScrollView>
    );
  };

  return (
    <Screen>
      <Header
        onBack={handleBack}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>디바이스 추가</Text>
      </View>
      {currentStep === 'guide' && renderGuideStep()}
      {currentStep === 'bluetooth' && renderBluetoothStep()}
      {currentStep === 'devices' && renderDevicesStep()}
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    ...Typography.text.h3,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  guideContainer: {
    width: '100%',
    alignItems: 'center',
  },
  guideTitle: {
    ...Typography.text.h3,
    color: Colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  guideBox: {
    backgroundColor: Colors.iceBlue,
    borderRadius: 12,
    padding: 24,
    marginBottom: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  guideText: {
    ...Typography.text.body,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  bluetoothContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bluetoothImage: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  bluetoothTitle: {
    ...Typography.text.h3,
    color: Colors.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  activateButton: {
    minWidth: 200,
    marginBottom: 40,
  },
  devicesContent: {
    padding: 20,
  },
  devicesContainer: {
    width: '100%',
  },
  devicesTitle: {
    ...Typography.text.h4,
    color: Colors.primary,
    marginBottom: 20,
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
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  navButton: {
    flex: 1,
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
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AddDeviceScreen;
