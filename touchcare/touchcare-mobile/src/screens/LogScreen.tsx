import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { MOCK_RECORDS, TouchRecord } from '../data/mockRecords';

interface LogScreenProps {
  navigation: any;
}

/**
 * 로그 화면
 * 터치 기록을 시간순으로 표시
 */
export const LogScreen: React.FC<LogScreenProps> = ({ navigation }) => {
  // 기록을 시간순으로 정렬 (최신순)
  const sortedRecords = useMemo(() => {
    return [...MOCK_RECORDS].sort((a, b) => b.timestamp - a.timestamp);
  }, []);

  // 날짜와 시간 포맷팅
  const formatDateTime = (record: TouchRecord) => {
    const date = new Date(record.timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
      fullDateTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    };
  };

  const renderLogItem = ({ item }: { item: TouchRecord }) => {
    const { date, time, fullDateTime } = formatDateTime(item);

    return (
      <View style={styles.logItem}>
        <View style={styles.logContent}>
          <View style={styles.logHeader}>
            <MaterialIcons name="touch-app" size={20} color={Colors.primary} />
            <Text style={styles.logDateTime}>{fullDateTime}</Text>
          </View>
          <View style={styles.logDetails}>
            <Text style={styles.logText}>
              <Text style={styles.logLabel}>날짜: </Text>
              {date}
            </Text>
            <Text style={styles.logText}>
              <Text style={styles.logLabel}>시간: </Text>
              {time}
            </Text>
          </View>
        </View>
        <View style={styles.logDivider} />
      </View>
    );
  };

  return (
    <Screen showBottomTab={true} currentScreen="Log" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>터치 기록 로그</Text>
        <Text style={styles.headerSubtitle}>총 {sortedRecords.length}건</Text>
      </View>
      <FlatList
        data={sortedRecords}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerInfo: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.iceBlue,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    ...Typography.text.h3,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingVertical: 8,
  },
  logItem: {
    backgroundColor: Colors.background,
  },
  logContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  logDateTime: {
    ...Typography.text.body,
    color: Colors.text,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  logDetails: {
    marginLeft: 28,
    gap: 4,
  },
  logText: {
    ...Typography.text.body,
    color: Colors.text,
    fontSize: 14,
  },
  logLabel: {
    color: Colors.textLight,
    fontWeight: '500',
  },
  logDivider: {
    height: 1,
    backgroundColor: Colors.iceBlue,
    marginLeft: 20,
  },
});

export default LogScreen;
