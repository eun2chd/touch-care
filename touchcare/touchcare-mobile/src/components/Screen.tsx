import React from 'react';
import { SafeAreaView, Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewStyle, StyleSheet, View } from 'react-native';
import { BottomTabBar } from './BottomTabBar';

interface ScreenProps {
  children: React.ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
  showBottomTab?: boolean;
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
}

/**
 * 공통 Screen 컴포넌트
 * SafeAreaView를 자동으로 적용하여 노치와 제스처 영역을 피합니다.
 * 
 * @param children - 화면 내용
 * @param edges - SafeArea를 적용할 방향 (기본값: ['top', 'left', 'right'])
 * @param style - 추가 스타일
 * @param showBottomTab - 하단 네비게이션 바 표시 여부
 * @param currentScreen - 현재 화면 이름
 * @param onNavigate - 화면 전환 함수
 */
export const Screen: React.FC<ScreenProps> = ({ 
  children, 
  edges,
  style,
  showBottomTab = false,
  currentScreen,
  onNavigate,
}) => {
  const insets = useSafeAreaInsets();
  
  // 하단 네비게이션 바가 있으면 bottom edge 제외 (BottomTabBar에서 처리)
  const safeAreaEdges = edges || (showBottomTab 
    ? ['top', 'left', 'right'] 
    : ['top', 'left', 'right', 'bottom']);

  return (
    <SafeAreaView style={[styles.container, style]} edges={safeAreaEdges}>
      <View style={styles.content}>
        {children}
      </View>
      {showBottomTab && currentScreen && onNavigate && (
        <View style={{ paddingBottom: insets.bottom }}>
          <BottomTabBar currentScreen={currentScreen} onNavigate={onNavigate} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Screen;
