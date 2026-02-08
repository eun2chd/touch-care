import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// 스플래시 스크린을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('./assets/fonts/PretendardVariable.ttf'),
    'Pretendard-Medium': require('./assets/fonts/PretendardVariable.ttf'),
    'Pretendard-SemiBold': require('./assets/fonts/PretendardVariable.ttf'),
    'Pretendard-Bold': require('./assets/fonts/PretendardVariable.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>터치케어</Text>
      <Text style={styles.subtitle}>TouchCare 앱입니다</Text>
      <Text style={styles.body}>프리텐다드 폰트가 적용되었습니다</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 32,
    color: '#303F9F',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: '#37474F',
    marginBottom: 20,
  },
  body: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
