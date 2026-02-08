import React, { useState, useRef, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration, Animated, Dimensions } from 'react-native';
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
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const DeviceDashboardScreen: React.FC<DeviceDashboardScreenProps> = ({ navigation, route }) => {
  const device = route?.params?.device;
  const [totalTouches, setTotalTouches] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMentalStateExpanded, setIsMentalStateExpanded] = useState(true);
  const rippleTrigger = useRef(0);
  const widthAnim = useRef(new Animated.Value(1)).current; // 1 = 펼침, 0 = 접힘

  // 터치 횟수에 따른 심리상태 계산
  const mentalState = useMemo(() => {
    if (totalTouches >= 1000) {
      return {
        level: 'high',
        label: '매우 활발',
        color: Colors.success,
        icon: '😊',
        description: '1000회 이상 터치',
      };
    } else if (totalTouches >= 500) {
      return {
        level: 'medium',
        label: '활발',
        color: Colors.secondary,
        icon: '🙂',
        description: '500회 이상 터치',
      };
    } else if (totalTouches >= 100) {
      return {
        level: 'normal',
        label: '보통',
        color: Colors.primary,
        icon: '😐',
        description: '100회 이상 터치',
      };
    } else {
      return {
        level: 'low',
        label: '관찰 필요',
        color: Colors.textLight,
        icon: '😔',
        description: '100회 미만 터치',
      };
    }
  }, [totalTouches]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleReset = () => {
    setTotalTouches(0);
    setProgress(0);
  };

  const toggleMentalState = () => {
    const toValue = isMentalStateExpanded ? 0 : 1;
    setIsMentalStateExpanded(!isMentalStateExpanded);
    
    Animated.timing(widthAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false, // width는 useNativeDriver를 사용할 수 없음
    }).start();
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
      <Header onMenu={() => {}} onClose={() => {}} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.titleContent}>
          <Text style={styles.title}>{device.name}</Text>
          <Text style={styles.subtitle}>{device.macAddress}</Text>
        </View>
      </View>
      
      {/* 심리상태 배지 */}
      <View style={styles.mentalStateContainer}>
        <Animated.View
          style={[
            styles.mentalStateBadge,
            {
              backgroundColor: mentalState.color + '20',
              width: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [80, SCREEN_WIDTH - 40], // 접힘: 72px (이모지 + 패딩), 펼침: 전체 너비
              }),
              minHeight: 60,
              overflow: 'visible',
            },
          ]}
        >
          <TouchableOpacity
            style={styles.mentalStateBadgeContent}
            onPress={toggleMentalState}
            activeOpacity={0.7}
          >
            <Animated.View
              style={{
                marginRight: widthAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 12],
                }),
              }}
            >
              <Text style={styles.mentalStateIcon}>{mentalState.icon}</Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: widthAnim,
                width: widthAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, SCREEN_WIDTH - 140],
                }),
                overflow: 'visible',
                flex: 1,
              }}
            >
              {isMentalStateExpanded && (
                <View style={styles.mentalStateInfo}>
                  <Text style={[styles.mentalStateLabel, { color: mentalState.color }]}>
                    {mentalState.label}
                  </Text>
                  <Text style={styles.mentalStateDescription}>
                    {mentalState.description}
                  </Text>
                </View>
              )}
            </Animated.View>
            <Animated.View
              style={{
                opacity: widthAnim,
              }}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={20}
                color={mentalState.color}
                style={styles.expandIcon}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
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
            <Text style={styles.instructionText}>
              현재는 목업 디자인입니다{'\n'}실제는 기기 터치시 숫자가 올라가는 형태입니다
            </Text>
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
  mentalStateContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    position: 'relative',
  },
  collapsedBadge: {
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingLeft: 20,
    borderRadius: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: Colors.iceBlue,
    backgroundColor: Colors.background,
    zIndex: 5,
    marginTop: 16,
  },
  mentalStateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
    minWidth: 72,
    minHeight: 60,
  },
  mentalStateBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  mentalStateIcon: {
    fontSize: 32,
  },
  mentalStateInfo: {
    flex: 1,
  },
  mentalStateLabel: {
    ...Typography.text.h4,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mentalStateDescription: {
    ...Typography.text.caption,
    color: Colors.textLight,
  },
  expandIcon: {
    marginLeft: 8,
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
  instructionText: {
    ...Typography.text.body,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 20,
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
  edgeTouchArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: '100%',
    zIndex: 5,
  },
});

export default DeviceDashboardScreen;
