import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
// @ts-ignore - react-native-svg 타입 정의
import { Svg, Circle } from 'react-native-svg';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface CircularProgressProps {
  progress: number; // 0-100
  totalTouches: number;
  size?: number;
  strokeWidth?: number;
  colors?: string[];
}

/**
 * 원형 프로그레스 바 컴포넌트
 * 반짝거리는 애니메이션과 색상 변경 효과 포함
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  totalTouches,
  size = 200,
  strokeWidth = 12,
  colors = [Colors.primary, Colors.accent, Colors.secondary],
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // 현재 색상 결정 (한 바퀴마다 색상 변경)
  // totalTouches를 기반으로 색상 인덱스 계산 (100 터치 = 1 바퀴)
  const currentColorIndex = Math.floor(totalTouches / 100) % colors.length;
  const currentColor = colors[currentColorIndex];
  const nextColorIndex = (currentColorIndex + 1) % colors.length;
  const nextColor = colors[nextColorIndex];

  // 프로그레스 애니메이션
  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  // 반짝거리는 애니메이션 (계속 반복)
  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, []);

  // 펄스 애니메이션 (터치 시)
  const triggerPulse = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (totalTouches > 0) {
      triggerPulse();
    }
  }, [totalTouches]);

  const [animatedProgressValue, setAnimatedProgressValue] = React.useState(0);
  const [shimmerOpacityValue, setShimmerOpacityValue] = React.useState(0.5);

  // 프로그레스 값 업데이트
  useEffect(() => {
    const listener = animatedProgress.addListener(({ value }) => {
      setAnimatedProgressValue(value);
    });
    return () => animatedProgress.removeListener(listener);
  }, [animatedProgress]);

  // 반짝거리는 효과 값 업데이트
  useEffect(() => {
    const listener = shimmerAnim.addListener(({ value }) => {
      setShimmerOpacityValue(0.3 + value * 0.5);
    });
    return () => shimmerAnim.removeListener(listener);
  }, [shimmerAnim]);

  const currentStrokeDashoffset = circumference - (animatedProgressValue / 100) * circumference;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circleContainer,
          {
            width: size,
            height: size,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Svg width={size} height={size}>
          {/* 배경 원 */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.iceBlue}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* 프로그레스 원 */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={currentColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={currentStrokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            opacity={shimmerOpacityValue}
          />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.touchCount}>{totalTouches}</Text>
          <Text style={styles.touchLabel}>터치</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchCount: {
    ...Typography.text.h1,
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 48,
  },
  touchLabel: {
    ...Typography.text.body,
    color: Colors.textLight,
    marginTop: 4,
  },
});

export default CircularProgress;
