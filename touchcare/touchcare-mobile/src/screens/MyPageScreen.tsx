import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { useUserStore } from '../store/useUserStore';

interface MyPageScreenProps {
  navigation: any;
}

/**
 * 마이페이지 화면
 */
export const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation }) => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    navigation.navigate('Login');
  };

  return (
    <Screen showBottomTab={true} currentScreen="MyPage" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={styles.profileName}>{user?.name || '사용자'}</Text>
          <Text style={styles.profileEmail}>{user?.email || ''}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정 정보</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>이름</Text>
            <Text style={styles.infoValue}>{user?.name || '-'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>이메일</Text>
            <Text style={styles.infoValue}>{user?.email || '-'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>전화번호</Text>
            <Text style={styles.infoValue}>{user?.phone || '-'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>설정</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>알림 설정</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>도움말</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 24,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    ...Typography.text.h2,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileName: {
    ...Typography.text.h3,
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.text.h4,
    color: Colors.primary,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  infoValue: {
    ...Typography.text.body,
    color: Colors.text,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    ...Typography.text.body,
    color: Colors.text,
  },
  menuArrow: {
    fontSize: 24,
    color: Colors.textLight,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.warning,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutText: {
    ...Typography.text.body,
    color: Colors.warning,
    fontWeight: '600',
  },
});

export default MyPageScreen;
