import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface SettingsScreenProps {
  navigation: any;
}

/**
 * 설정 화면
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Screen>
      <Header navigation={navigation} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>설정</Text>
      </View>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.emptyContainer}>
          <MaterialIcons name="settings" size={64} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>설정</Text>
          <Text style={styles.emptyText}>개발을 준비중입니다</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.text.h3,
    color: Colors.primary,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
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

export default SettingsScreen;
