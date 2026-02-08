import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Animated } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { LoadingScreen } from './src/components/LoadingScreen';

// 스플래시 스크린을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

type Screen = 'Login' | 'Home' | 'Detail' | 'SignUp';

export default function App() {
  console.log('🚀 App.tsx 로드됨 - 로그인 화면으로 시작');
  
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('./assets/fonts/PretendardVariable.ttf'),
    'Pretendard-Medium': require('./assets/fonts/PretendardVariable.ttf'),
    'Pretendard-SemiBold': require('./assets/fonts/PretendardVariable.ttf'),
    'Pretendard-Bold': require('./assets/fonts/PretendardVariable.ttf'),
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>('Login');
  const [isInitialLoading, setIsInitialLoading] = useState(true); // 초기 로딩 상태
  const [isTransitionLoading, setIsTransitionLoading] = useState(false); // 화면 전환 로딩 상태
  const [nextScreen, setNextScreen] = useState<Screen | null>(null); // 다음 화면
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션
  
  // 초기 로딩 (3초)
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      
      // 3초 후 초기 로딩 완료
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        // 페이드 인 애니메이션
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fadeAnim]);

  // 화면 전환 로딩 처리
  useEffect(() => {
    if (nextScreen && isTransitionLoading) {
      // 1~2초 후 화면 전환 (랜덤으로 자연스럽게)
      const delay = Math.random() * 1000 + 1000; // 1000ms ~ 2000ms
      
      const timer = setTimeout(() => {
        // 페이드 아웃
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // 화면 전환
          setCurrentScreen(nextScreen);
          setNextScreen(null);
          setIsTransitionLoading(false);
          
          // 페이드 인
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [nextScreen, isTransitionLoading, fadeAnim]);

  // 폰트 로딩 중이거나 초기 로딩 중
  if (!fontsLoaded || isInitialLoading) {
    return <LoadingScreen />;
  }

  // 간단한 네비게이션 객체 (로딩 화면 포함)
  const navigation = {
    navigate: (screen: Screen) => {
      // 화면 전환 시 로딩 화면 표시
      setIsTransitionLoading(true);
      setNextScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'Detail') {
        setIsTransitionLoading(true);
        setNextScreen('Home');
      } else if (currentScreen === 'Home') {
        setIsTransitionLoading(true);
        setNextScreen('Login');
      } else if (currentScreen === 'SignUp') {
        setIsTransitionLoading(true);
        setNextScreen('Login');
      }
    },
  };

  // 화면 렌더링
  const renderScreen = () => {
    console.log('🎨 화면 렌더링:', currentScreen);
    
    switch (currentScreen) {
      case 'Login':
        console.log('✅ LoginScreen 렌더링');
        return <LoginScreen navigation={navigation} />;
      case 'Home':
        console.log('✅ HomeScreen 렌더링');
        return <HomeScreen navigation={navigation} />;
      case 'Detail':
        console.log('✅ DetailScreen 렌더링');
        return <DetailScreen navigation={navigation} />;
      case 'SignUp':
        console.log('✅ SignUpScreen 렌더링');
        return <SignUpScreen navigation={navigation} />;
      default:
        console.log('⚠️ 기본값: LoginScreen 렌더링');
        return <LoginScreen navigation={navigation} />;
    }
  };

  console.log('🔄 App 리렌더링, 현재 화면:', currentScreen);

  // 화면 전환 로딩 중
  if (isTransitionLoading) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {renderScreen()}
      </Animated.View>
      <StatusBar style="auto" />
    </>
  );
}
