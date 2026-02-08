# SafeArea 가이드

## 📱 모바일에서 무조건 알아야 하는 개념

### 문제 상황

React Native는 기본적으로 **(0,0) = 화면 맨 위**부터 시작합니다.

그래서 SafeArea를 안 쓰면:
- 상태바(시계/배터리 영역) 뒤에 콘텐츠가 겹침
- 하단 제스처 영역(홈/뒤로가기)에 콘텐츠가 가려짐

### 해결 방법: SafeAreaView 사용

#### 1️⃣ 설치 확인
```bash
npx expo install react-native-safe-area-context
```

#### 2️⃣ 기본 사용법
```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>홈 화면</Text>
      </View>
    </SafeAreaView>
  );
}
```

### 영역 구분

```
┌─────────────────────┐
│  노치 영역          │ ← SafeArea (top)
├─────────────────────┤
│  상태바 (시계/배터리)│ ← StatusBar 영역
├─────────────────────┤
│                     │
│   콘텐츠 영역        │ ← SafeArea 내부
│                     │
├─────────────────────┤
│  하단 제스처 영역    │ ← SafeArea (bottom)
└─────────────────────┘
```

### 실무 추천 패턴

#### edges 옵션 사용
```typescript
<SafeAreaView 
  style={{ flex: 1 }} 
  edges={['top', 'left', 'right']}
>
  {/* 콘텐츠 */}
</SafeAreaView>
```

**edges 옵션:**
- `['top']` - 상단만
- `['bottom']` - 하단만
- `['top', 'left', 'right']` - 상단 + 좌우 (하단은 탭 네비가 처리)
- `['all']` - 모든 방향

### StatusBar 설정

```typescript
import { StatusBar } from 'expo-status-bar';

<StatusBar style="dark" />  // 검은 글씨
<StatusBar style="light" /> // 흰 글씨
<StatusBar style="auto" />  // 자동
```

### 공통 Screen 컴포넌트 패턴 (권장)

모든 화면마다 SafeAreaView를 쓰기 귀찮으면 공통 컴포넌트를 만듭니다:

```typescript
// components/Screen.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: object;
}

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
```

**사용 예시:**
```typescript
import { Screen } from '../components/Screen';

export default function HomeScreen() {
  return (
    <Screen>
      <Text>홈 화면</Text>
    </Screen>
  );
}
```

---

## ✅ 적용 체크리스트

- [x] react-native-safe-area-context 설치
- [ ] 공통 Screen 컴포넌트 생성
- [ ] 모든 화면에 SafeAreaView 적용
- [ ] StatusBar 스타일 설정

---

## 💡 팁

1. **탭 네비게이션이 있는 경우**: `edges={['top', 'left', 'right']}` 사용 (하단은 탭이 처리)
2. **전체 화면**: `edges={['all']}` 사용
3. **상단만**: `edges={['top']}` 사용

---

**이제 모든 화면이 노치와 제스처 영역을 피해서 깔끔하게 표시됩니다! 🎉**
