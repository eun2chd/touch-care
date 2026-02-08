# React Navigation 설치 가이드

## ⚠️ 현재 상태

현재 React Navigation이 설치되어 있지 않아서 임시로 간단한 네비게이션으로 작동하고 있습니다.

## 🔧 React Navigation 설치 (권장)

### Git Bash에서 실행:

```bash
cd touchcare-mobile

# React Navigation 패키지 설치
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### 설치 후

`App.tsx`를 다시 `RootNavigator`를 사용하도록 변경하세요:

```typescript
import { RootNavigator } from './src/navigation/RootNavigator';

// ... 폰트 로딩 코드 ...

return (
  <>
    <RootNavigator />
    <StatusBar style="auto" />
  </>
);
```

## 📝 현재 임시 구현

현재는 `App.tsx`에서 간단한 상태 관리로 화면 전환을 구현했습니다:
- `useState`로 현재 화면 관리
- `navigation` 객체로 화면 전환

이 방식도 작동하지만, React Navigation을 사용하는 것이 더 표준적이고 기능이 풍부합니다.
