import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface DetailScreenProps {
  navigation: any;
}

/**
 * 상세 화면
 */
export const DetailScreen: React.FC<DetailScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        title="상세 정보"
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>터치 데이터</Text>
          <Text style={styles.sectionText}>
            수집된 터치 데이터를 분석하여 사용자의 감정 상태를 파악합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI 분석 결과</Text>
          <Text style={styles.sectionText}>
            AI 엔진이 분석한 결과를 리포트 형태로 제공합니다.
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, { backgroundColor: Colors.success }]} />
            <Text style={styles.statusText}>안정 상태</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, { backgroundColor: Colors.warning }]} />
            <Text style={styles.statusText}>주의 필요</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  statusContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    ...Typography.text.body,
    color: Colors.text,
  },
});

export default DetailScreen;
