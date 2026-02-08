import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface RecordScreenProps {
  navigation: any;
}

/**
 * 기록 화면
 */
export const RecordScreen: React.FC<RecordScreenProps> = ({ navigation }) => {
  return (
    <Screen showBottomTab={true} currentScreen="Record" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.emptyContainer}>
          <MaterialIcons name="history" size={64} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>기록</Text>
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

export default RecordScreen;
