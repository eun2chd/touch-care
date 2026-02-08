import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView, Image, Easing } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { useUserStore } from '../store/useUserStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  screen: string;
}

const menuItems: MenuItem[] = [
  {
    key: 'home',
    label: '홈',
    icon: 'home',
    screen: 'Home',
  },
  {
    key: 'device',
    label: '디바이스 추가',
    icon: 'add-circle-outline',
    screen: 'Device',
  },
  {
    key: 'record',
    label: '기록',
    icon: 'history',
    screen: 'Record',
  },
  {
    key: 'report',
    label: '리포트',
    icon: 'assessment',
    screen: 'Report',
  },
  {
    key: 'mypage',
    label: '마이페이지',
    icon: 'person-outline',
    screen: 'MyPage',
  },
];

/**
 * 왼쪽 사이드 메뉴 컴포넌트
 */
export const SideMenu: React.FC<SideMenuProps> = ({
  isVisible,
  onClose,
  onNavigate,
  onLogout,
}) => {
  const slideAnim = React.useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const user = useUserStore((state) => state.user);

  React.useEffect(() => {
    if (isVisible) {
      // 왼쪽에서 오른쪽으로 슬라이드 (열기)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      // 오른쪽에서 왼쪽으로 슬라이드 (닫기)
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 400,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  // 오버레이 투명도 애니메이션
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

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
      {/* 사이드 메뉴 */}
      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* 상단: 로고와 사용자 이름 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.userName}>{user?.name || '사용자'}님 반갑습니다.!</Text>
          </View>
        </View>

        {/* 가운데: 메뉴 */}
        <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuItem}
              onPress={() => {
                onNavigate(item.screen);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons name={item.icon as any} size={24} color={Colors.text} />
              <Text style={styles.menuItemLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 하단: 설정과 로그아웃 */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => {
              // TODO: 설정 화면으로 이동
              onClose();
            }}
            activeOpacity={0.7}
          >
            <MaterialIcons name="settings" size={24} color={Colors.text} />
            <Text style={styles.footerItemLabel}>설정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => {
              onLogout();
              onClose();
            }}
            activeOpacity={0.7}
          >
            <MaterialIcons name="logout" size={24} color={Colors.warning} />
            <Text style={[styles.footerItemLabel, { color: Colors.warning }]}>로그아웃</Text>
          </TouchableOpacity>
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
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: Colors.background,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  userName: {
    ...Typography.text.h4,
    color: Colors.text,
    fontWeight: '600',
  },
  menuContent: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLabel: {
    ...Typography.text.body,
    color: Colors.text,
    marginLeft: 16,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerItemLabel: {
    ...Typography.text.body,
    color: Colors.text,
    marginLeft: 16,
  },
});

export default SideMenu;
