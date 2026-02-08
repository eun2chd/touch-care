import React from 'react';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { ViewStyle, StyleSheet } from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
}

/**
 * 공통 Screen 컴포넌트
 * SafeAreaView를 자동으로 적용하여 노치와 제스처 영역을 피합니다.
 * 
 * @param children - 화면 내용
 * @param edges - SafeArea를 적용할 방향 (기본값: ['top', 'left', 'right'])
 * @param style - 추가 스타일
 */
export const Screen: React.FC<ScreenProps> = ({ 
  children, 
  edges = ['top', 'left', 'right'],
  style 
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;
