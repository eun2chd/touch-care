# React Native + Expo 시작 가이드

## 📱 목적
빠르고 간단한 모바일 목업/프로토타입 구현을 위한 React Native + Expo 개발 환경 구축

---

## 1️⃣ 사전 준비사항

### 필수 설치
1. **Node.js** (v18 이상 권장)
   - [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드
   - 설치 확인: `node --version`

2. **npm** (Node.js와 함께 설치됨)
   - 설치 확인: `npm --version`

### 선택 설치 (권장)
- **Git** - 코드 버전 관리용
- **VS Code** - 코드 에디터 (React Native 확장 프로그램 설치 권장)

---

## 2️⃣ Expo CLI 설치

### 전역 설치 (권장)
```bash
npm install -g expo-cli
```

또는 최신 방식 (npx 사용, 전역 설치 불필요)
```bash
npx create-expo-app@latest
```

---

## 3️⃣ 프로젝트 생성

### 새 프로젝트 생성
```bash
npx create-expo-app touchcare-mobile
cd touchcare-mobile
```

### 프로젝트 구조
```
touchcare-mobile/
├── App.js (또는 App.tsx)    # 메인 앱 파일
├── assets/                    # 이미지, 폰트 등
├── node_modules/            # 패키지
├── package.json             # 프로젝트 설정
└── app.json                 # Expo 설정
```

---

## 4️⃣ 개발 서버 실행

### 개발 서버 시작
```bash
npm start
```

또는
```bash
expo start
```

### 실행 후 화면
터미널에 **QR 코드**가 표시됩니다.

---

## 5️⃣ 모바일에서 실시간 미리보기

### 방법 1: Expo Go 앱 사용 (가장 간단) ⭐

1. **스마트폰에 Expo Go 설치**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **같은 Wi-Fi에 연결**
   - 컴퓨터와 스마트폰이 같은 네트워크에 있어야 함

3. **QR 코드 스캔**
   - iOS: 카메라 앱으로 QR 코드 스캔 → Expo Go 열기
   - Android: Expo Go 앱 내 QR 스캔 기능 사용

4. **자동 리로드**
   - 코드 수정 시 스마트폰에서 자동으로 새로고침됨
   - 저장만 하면 바로 확인 가능!

### 방법 2: 시뮬레이터/에뮬레이터 사용

#### iOS 시뮬레이터 (Mac만 가능)
```bash
npm start
# 터미널에서 'i' 키 누르기
```

#### Android 에뮬레이터
```bash
npm start
# 터미널에서 'a' 키 누르기
```

**필수 설치:**
- iOS: Xcode (Mac App Store)
- Android: Android Studio + Android SDK

---

## 6️⃣ 개발 워크플로우

### 기본 개발 흐름
1. **코드 수정** (`App.js` 또는 다른 파일)
2. **저장** (Ctrl+S / Cmd+S)
3. **자동 새로고침** - 스마트폰에서 즉시 확인!

### 핫 리로드 (Hot Reload)
- 기본적으로 활성화되어 있음
- 코드 변경 시 앱 상태 유지하면서 업데이트

### 개발 서버 명령어
- `r` - 앱 리로드
- `m` - 개발자 메뉴 열기
- `i` - iOS 시뮬레이터 열기
- `a` - Android 에뮬레이터 열기
- `w` - 웹 브라우저에서 열기

---

## 7️⃣ 기본 코드 구조

### App.js 예시
```javascript
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>안녕하세요! TouchCare 앱입니다</Text>
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
  },
});
```

### 주요 React Native 컴포넌트
- `<View>` - div와 유사 (레이아웃 컨테이너)
- `<Text>` - 텍스트 표시 (span과 유사)
- `<Image>` - 이미지 표시
- `<ScrollView>` - 스크롤 가능한 영역
- `<TouchableOpacity>` - 터치 가능한 버튼

---

## 8️⃣ 스타일링

### StyleSheet 사용 (권장)
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

### 인라인 스타일
```javascript
<View style={{ padding: 20, backgroundColor: '#fff' }}>
```

**차이점:**
- StyleSheet: 성능 최적화, 재사용 용이
- 인라인: 빠른 테스트용

---

## 9️⃣ 유용한 패키지

### 자주 사용하는 Expo 패키지
```bash
# 네비게이션
npx expo install @react-navigation/native @react-navigation/stack

# 아이콘
npx expo install @expo/vector-icons

# 이미지 피커
npx expo install expo-image-picker

# 폰트
npx expo install expo-font
```

### 패키지 설치 후
- 개발 서버 재시작 필요할 수 있음
- Expo Go에서 지원하지 않는 네이티브 모듈은 제한적

---

## 🔟 문제 해결

### QR 코드가 안 보일 때
- 방화벽 확인
- 같은 Wi-Fi 네트워크 확인
- `expo start --tunnel` 사용 (느릴 수 있음)

### 앱이 새로고침 안 될 때
- Expo Go 앱에서 흔들기 → "Reload" 선택
- 개발 서버 재시작: `Ctrl+C` 후 `npm start`

### 포트 충돌
```bash
expo start --port 8082
```

---

## 📚 다음 단계

1. **화면 구성**
   - 여러 화면 만들기
   - 네비게이션 설정

2. **컴포넌트 개발**
   - 재사용 가능한 컴포넌트 만들기
   - 목업 UI 구현

3. **상태 관리**
   - useState, useEffect 사용
   - Context API 또는 Redux (필요시)

---

## 💡 팁

- **빠른 개발**: Expo Go로 즉시 확인 가능
- **코드 저장**: 자동 새로고침되므로 저장만 하면 됨
- **개발자 메뉴**: 스마트폰에서 흔들기로 열기
- **에러 확인**: 터미널과 스마트폰 화면 모두 확인

---

## 📖 참고 자료

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [Expo Snack](https://snack.expo.dev/) - 온라인에서 코드 테스트

---

**준비 완료! 이제 모바일 목업 개발을 시작할 수 있습니다! 🚀**
