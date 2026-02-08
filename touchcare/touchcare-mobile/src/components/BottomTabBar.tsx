import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface BottomTabBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

interface TabItem {
  key: string;
  label: string;
  icon: {
    name: string;
    type: 'MaterialIcons' | 'Ionicons';
  };
  screen: string;
}

const tabs: TabItem[] = [
  {
    key: 'home',
    label: '홈',
    icon: { name: 'home', type: 'MaterialIcons' },
    screen: 'Home',
  },
  {
    key: 'device',
    label: '디바이스',
    icon: { name: 'devices', type: 'MaterialIcons' },
    screen: 'Device',
  },
  {
    key: 'record',
    label: '기록',
    icon: { name: 'history', type: 'MaterialIcons' },
    screen: 'Record',
  },
  {
    key: 'report',
    label: '리포트',
    icon: { name: 'assessment', type: 'MaterialIcons' },
    screen: 'Report',
  },
  {
    key: 'mypage',
    label: '마이페이지',
    icon: { name: 'person-outline', type: 'Ionicons' },
    screen: 'MyPage',
  },
];

/**
 * 하단 네비게이션 바 컴포넌트
 */
export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentScreen,
  onNavigate,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.screen;
        const IconComponent = tab.icon.type === 'MaterialIcons' ? MaterialIcons : Ionicons;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onNavigate(tab.screen)}
            activeOpacity={0.7}
          >
            <IconComponent
              name={tab.icon.name as any}
              size={24}
              color={isActive ? Colors.primary : Colors.textLight}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    paddingTop: 8,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    ...Typography.text.caption,
    color: Colors.textLight,
    marginTop: 4,
    fontSize: 12,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default BottomTabBar;
