import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface HomeScreenProps {
  navigation: any;
}

/**
 * 홈 화면
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleMenu = () => {
    // TODO: 메뉴 열기 (사이드 메뉴 등)
    console.log('메뉴 열기');
  };

  const handleClose = () => {
    // TODO: 종 아이콘 클릭 처리 (알림 등)
    console.log('종 아이콘 클릭');
  };

  return (
    <Screen showBottomTab={true} currentScreen="Home" onNavigate={navigation.navigate}>
      <Header 
        onMenu={handleMenu}
        onClose={handleClose}
      />
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>오늘의 마음 기록</Text>
          <Text style={styles.cardText}>
            오늘 하루는 어떠셨나요? 터치 데이터를 통해 감정을 기록해보세요.
          </Text>
          <Button
            title="기록하기"
            onPress={() => navigation.navigate('Detail')}
            variant="secondary"
            style={styles.button}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>데이터 리포트</Text>
          <Text style={styles.cardText}>
            수집된 데이터를 분석하여 리포트를 확인할 수 있습니다.
          </Text>
          <Button
            title="리포트 보기"
            onPress={() => {}}
            variant="primary"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </Screen>
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
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    ...Typography.text.h3,
    color: Colors.primary,
    marginBottom: 12,
  },
  cardText: {
    ...Typography.text.body,
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    marginTop: 8,
  },
});

export default HomeScreen;
