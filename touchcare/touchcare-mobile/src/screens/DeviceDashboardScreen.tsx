import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
// @ts-ignore - expo-haptics 타입 정의
import * as Haptics from 'expo-haptics';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { CircularProgress } from '../components/CircularProgress';
import { RippleEffect } from '../components/RippleEffect';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { Device } from '../store/useDeviceStore';

interface DeviceDashboardScreenProps {
  navigation: any;
  route?: {
    params?: {
      device: Device;
    };
  };
}

/**
 * 디바이스 대시보드 화면
 */
export const DeviceDashboardScreen: React.FC<DeviceDashboardScreenProps> = ({ navigation, route }) => {
  const device = route?.params?.device;
  const [totalTouches, setTotalTouches] = useState(0);
  const [progress, setProgress] = useState(0);
  const rippleTrigger = useRef(0);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleReset = () => {
    setTotalTouches(0);
    setProgress(0);
  };

  const handleTouch = async () => {
    // 햅틱 피드백 (진동)
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // expo-haptics가 지원되지 않는 경우 기본 진동 사용
      Vibration.vibrate(10);
    }

    // 터치 횟수 증가
    const newTouches = totalTouches + 1;
    setTotalTouches(newTouches);

    // 프로그레스 계산 (100 터치 = 100%)
    const newProgress = (newTouches % 100);
    setProgress(newProgress);

    // 파동 애니메이션 트리거
    rippleTrigger.current += 1;
  };

  if (!device) {
    return (
      <Screen>
        <Header onBack={handleBack} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>장치 정보를 찾을 수 없습니다.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen showBottomTab={true} currentScreen="Home" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.titleContent}>
          <Text style={styles.title}>{device.name}</Text>
          <Text style={styles.subtitle}>{device.macAddress}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.dashboardContainer}>
          {/* 메인 인디케이터 */}
          <View style={styles.indicatorContainer}>
            <View style={styles.progressWrapper}>
              <TouchableOpacity
                style={styles.touchArea}
                onPress={handleTouch}
                activeOpacity={0.9}
              >
                <RippleEffect trigger={rippleTrigger.current} size={220} />
                <CircularProgress
                  progress={progress}
                  totalTouches={totalTouches}
                  size={200}
                  strokeWidth={14}
                  colors={[
                    Colors.primary,      // Indigo
                    Colors.accent,       // Muted Coral
                    Colors.secondary,    // Sage Green
                    Colors.slateGray,    // Slate Gray
                    '#FF9800',          // Orange
                    '#9C27B0',          // Purple
                    '#00BCD4',          // Cyan
                  ]}
                />
              </TouchableOpacity>
              {totalTouches > 0 && (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleReset}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="refresh" size={20} color={Colors.textLight} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.mentalRecordTitle}>오늘의 마음기록</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </Text>
              <Text style={styles.recordingText}>기록중...</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...Typography.text.h3,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.text.caption,
    color: Colors.textLight,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
    gap: 8,
  },
  dateText: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  recordingText: {
    ...Typography.text.body,
    color: Colors.primary,
    fontWeight: '600',
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
  dashboardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  touchArea: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mentalRecordTitle: {
    ...Typography.text.h4,
    color: Colors.slateGray,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
});

export default DeviceDashboardScreen;
