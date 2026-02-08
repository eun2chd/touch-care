import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Colors from '../constants/colors';

interface RippleEffectProps {
  trigger: number;
  size?: number;
}

/**
 * 터치 시 파동 효과 컴포넌트
 */
export const RippleEffect: React.FC<RippleEffectProps> = ({
  trigger,
  size = 200,
}) => {
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;
  const ripple3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger > 0) {
      // 첫 번째 파동
      Animated.sequence([
        Animated.timing(ripple1, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(ripple1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start();

      // 두 번째 파동 (약간 지연)
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(ripple2, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ripple2, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start();
      }, 150);

      // 세 번째 파동 (더 지연)
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(ripple3, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ripple3, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start();
      }, 300);
    }
  }, [trigger]);

  const scale1 = ripple1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const opacity1 = ripple1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.3, 0],
  });

  const scale2 = ripple2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const opacity2 = ripple2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.3, 0],
  });

  const scale3 = ripple3.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const opacity3 = ripple3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.3, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]} pointerEvents="none">
      <Animated.View
        style={[
          styles.ripple,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: scale1 }],
            opacity: opacity1,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ripple,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: scale2 }],
            opacity: opacity2,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ripple,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: scale3 }],
            opacity: opacity3,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
});

export default RippleEffect;
