import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface LoadingScreenProps {
  message?: string;
}

/**
 * 로딩 화면 컴포넌트
 * - 앱 시작 시
 * - 화면 전환 시
 * - 데이터 로딩 시
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = '잠시만 기다려 주세요...' 
}) => {
  // 로고 스케일 애니메이션
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  // 로고 회전 애니메이션
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // 페이드 인 애니메이션
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // 점 애니메이션 (3개)
  const dot1Scale = useRef(new Animated.Value(1)).current;
  const dot2Scale = useRef(new Animated.Value(1)).current;
  const dot3Scale = useRef(new Animated.Value(1)).current;
  const dot1Opacity = useRef(new Animated.Value(0.4)).current;
  const dot2Opacity = useRef(new Animated.Value(0.4)).current;
  const dot3Opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // 페이드 인
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // 스케일 애니메이션 (펄스 효과)
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // 회전 애니메이션 (선택사항 - 부드러운 회전)
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    scaleAnimation.start();
    // rotateAnimation.start(); // 회전 효과가 필요하면 주석 해제

    // 점 애니메이션 (순차적으로 커지고 색상 변경)
    const createDotAnimation = (
      scaleAnim: Animated.Value,
      opacityAnim: Animated.Value,
      delay: number
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.sequence([
              Animated.timing(scaleAnim, {
                toValue: 1.5,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 400,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(opacityAnim, {
                toValue: 0.4,
                duration: 400,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.delay(200),
        ])
      );
    };

    const dot1Animation = createDotAnimation(dot1Scale, dot1Opacity, 0);
    const dot2Animation = createDotAnimation(dot2Scale, dot2Opacity, 200);
    const dot3Animation = createDotAnimation(dot3Scale, dot3Opacity, 400);

    dot1Animation.start();
    dot2Animation.start();
    dot3Animation.start();

    return () => {
      scaleAnimation.stop();
      rotateAnimation.stop();
      dot1Animation.stop();
      dot2Animation.stop();
      dot3Animation.stop();
    };
  }, [scaleAnim, rotateAnim, fadeAnim, dot1Scale, dot2Scale, dot3Scale, dot1Opacity, dot2Opacity, dot3Opacity]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: scaleAnim },
                { rotate }, // 회전 효과가 필요하면 주석 해제
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {message && (
          <Animated.Text style={[styles.message, { opacity: fadeAnim }]}>
            {message}
          </Animated.Text>
        )}

        {/* 로딩 인디케이터 (애니메이션) */}
        <View style={styles.indicatorContainer}>
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{ scale: dot1Scale }],
                opacity: dot1Opacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{ scale: dot2Scale }],
                opacity: dot2Opacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{ scale: dot3Scale }],
                opacity: dot3Opacity,
              },
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // 흰색 배경
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  message: {
    ...Typography.text.body,
    color: Colors.text,
    marginTop: 20,
    marginBottom: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary, // Indigo
  },
});

export default LoadingScreen;
