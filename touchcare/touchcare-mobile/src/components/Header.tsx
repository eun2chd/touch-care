import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { useUserStore } from '../store/useUserStore';
import { SideMenu } from './SideMenu';
import { NotificationPanel } from './NotificationPanel';

interface HeaderProps {
  title?: string; // 선택사항으로 변경
  navigation?: any; // 네비게이션 객체
  rightComponent?: React.ReactNode;
}

/**
 * 헤더 컴포넌트 (사이드 메뉴와 알림 패널 포함)
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  navigation,
  rightComponent,
}) => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleMenu = () => {
    setIsSideMenuVisible(true);
  };

  const handleClose = () => {
    setIsNotificationVisible(true);
  };

  const handleLogout = () => {
    clearUser();
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          {navigation ? (
            <View style={styles.leftButtons}>
              <TouchableOpacity onPress={handleMenu} style={styles.menuButton}>
                <MaterialIcons name="menu" size={24} color={Colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClose} style={[styles.closeButton, { marginLeft: 0}]}>
                <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.right}>
          {user ? (
            <Text style={styles.userGreeting}>{user.name}님! 반갑습니다.</Text>
          ) : (
            rightComponent
          )}
        </View>
      </View>
      {navigation && (
        <>
          <SideMenu
            isVisible={isSideMenuVisible}
            onClose={() => setIsSideMenuVisible(false)}
            onNavigate={navigation.navigate}
            onLogout={handleLogout}
          />
          <NotificationPanel
            isVisible={isNotificationVisible}
            onClose={() => setIsNotificationVisible(false)}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  leftButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    ...Typography.text.h4,
    color: Colors.primary,
    flex: 2,
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userGreeting: {
    ...Typography.text.body,
    color: Colors.text,
    fontSize: 14,
  },
});

export default Header;
