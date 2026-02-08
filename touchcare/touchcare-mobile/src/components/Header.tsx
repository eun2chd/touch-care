import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { useUserStore } from '../store/useUserStore';

interface HeaderProps {
  title?: string; // 선택사항으로 변경
  onBack?: () => void;
  onMenu?: () => void; // 햄버거 메뉴 클릭
  onClose?: () => void; // 종 아이콘 클릭
  rightComponent?: React.ReactNode;
}

/**
 * 헤더 컴포넌트
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onMenu,
  onClose,
  rightComponent,
}) => {
  const user = useUserStore((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onMenu ? (
          <View style={styles.leftButtons}>
            <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
              <MaterialIcons name="menu" size={24} color={Colors.primary} />
            </TouchableOpacity>
            {onClose && (
              <TouchableOpacity onPress={onClose} style={[styles.closeButton, { marginLeft: 0}]}>
                <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        ) : onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
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
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
