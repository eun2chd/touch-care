import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface ReportScreenProps {
  navigation: any;
}

/**
 * 리포트 화면
 */
export const ReportScreen: React.FC<ReportScreenProps> = ({ navigation }) => {
  return (
    <Screen showBottomTab={true} currentScreen="Report" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.emptyContainer}>
          <MaterialIcons name="assessment" size={64} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>리포트</Text>
          <Text style={styles.emptyText}>개발을 준비중입니다</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    ...Typography.text.h3,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    ...Typography.text.body,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default ReportScreen;
