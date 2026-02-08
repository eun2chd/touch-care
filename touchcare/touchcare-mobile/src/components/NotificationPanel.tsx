import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface NotificationPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * 오른쪽 알림 패널 컴포넌트
 */
export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isVisible,
  onClose,
}) => {
  const slideAnim = React.useRef(new Animated.Value(SCREEN_WIDTH)).current;

  // 오버레이 투명도 애니메이션
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isVisible) {
      // 오른쪽에서 왼쪽으로 슬라이드 (열기)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      // 왼쪽에서 오른쪽으로 슬라이드 (닫기)
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 400,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  React.useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: isVisible ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isVisible, overlayOpacity]);

  return (
    <>
      {/* 오버레이 */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
            pointerEvents: isVisible ? 'auto' : 'none',
          },
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>
      {/* 알림 패널 */}
      <Animated.View
        style={[
          styles.panelContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>알림</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* 내용 */}
        <View style={styles.content}>
          <View style={styles.emptyContainer}>
            <MaterialIcons name="notifications-none" size={64} color={Colors.textLight} />
            <Text style={styles.emptyText}>새로운 알림이 아직 없습니다</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: Colors.background,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    ...Typography.text.h3,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    ...Typography.text.body,
    color: Colors.textLight,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default NotificationPanel;
