import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface DeviceScreenProps {
  navigation: any;
}

/**
 * 디바이스 화면
 */
export const DeviceScreen: React.FC<DeviceScreenProps> = ({ navigation }) => {
  const handleMenu = () => {
    // TODO: 메뉴 열기
    console.log('메뉴 열기');
  };

  const handleClose = () => {
    // TODO: 종 아이콘 클릭 처리 (알림 등)
    console.log('종 아이콘 클릭');
  };

  return (
    <Screen showBottomTab={true} currentScreen="Device" onNavigate={navigation.navigate}>
      <Header
        onMenu={handleMenu}
        onClose={handleClose}
      />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>연결된 디바이스</Text>
          <Text style={styles.sectionText}>
            터치 데이터를 수집하는 디바이스 목록입니다.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>TouchCare Device #1</Text>
            <View style={[styles.statusBadge, { backgroundColor: Colors.success }]}>
              <Text style={styles.statusText}>연결됨</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>마지막 연결: 2024-01-15 14:30</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>TouchCare Device #2</Text>
            <View style={[styles.statusBadge, { backgroundColor: Colors.textLight }]}>
              <Text style={styles.statusText}>연결 안 됨</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>마지막 연결: 2024-01-14 09:15</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.text.h3,
    color: Colors.primary,
    marginBottom: 12,
  },
  sectionText: {
    ...Typography.text.body,
    color: Colors.text,
    lineHeight: 24,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    ...Typography.text.h4,
    color: Colors.text,
    flex: 1,
  },
  cardSubtitle: {
    ...Typography.text.caption,
    color: Colors.textLight,
  },
  statusBadge: {
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

export default DeviceScreen;
