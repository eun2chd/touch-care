# Git Bash에서 프로젝트 생성 가이드

## 🚀 Git Bash에서 실행할 명령어

### 1단계: 프로젝트 생성
```bash
npx create-expo-app@latest touchcare-mobile --template blank
```

### 2단계: 프로젝트 디렉토리로 이동
```bash
cd touchcare-mobile
```

### 3단계 React Native에서 커스텀 폰트를 로딩해주는 라이브러리 설치.
npx expo install expo-font


### 4단계: 폰트 패키지 설치
```bash
설치 경로 : https://github.com/orioncactus/pretendard/releases/tag/v1.3.9
npx expo install expo-font @expo-google-fonts/pretendard
-- 폰트 설치가 안되어서 git 에서 다운받고 assets -> fonts 에 폰트 추가함.
```

### 4단계: 개발 서버 실행
```bash
npm start
```
폰에 Expo Go 설치했어?

안드로이드면 Play스토어에서
Expo Go 설치해야 함.

설치 안 되어 있으면 QR 찍어도 안 열림.




# 프리텐다드 폰트 설정 완료 ✅

## 📝 완료된 작업

1. ✅ `PretendardVariable.ttf` 파일을 `assets/fonts/` 폴더에 배치
2. ✅ `App.js`에 폰트 로딩 코드 추가
3. ✅ 폰트 사용 예시 코드 추가

## 🔧 expo-splash-screen 설치

### `npm list expo-splash-screen`이란?

이 명령어는 `expo-splash-screen` 패키지가 현재 프로젝트에 설치되어 있는지 확인하는 명령어입니다.

```bash
cd touchcare-mobile
npm list expo-splash-screen
```

**결과 해석:**
- 패키지가 설치되어 있으면: 패키지 이름과 버전 정보가 표시됨
- 패키지가 없으면: `(empty)` 또는 에러 메시지 표시

### 언제 설치해야 하나?

**반드시 설치해야 합니다!** 

`App.js`에서 프리텐다드 폰트를 로딩할 때 사용하고 있습니다:

```javascript
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync(); // 폰트 로딩 완료까지 스플래시 화면 유지
```

**설치 방법:**
```bash
cd touchcare-mobile
npx expo install expo-splash-screen
```

**왜 필요한가?**
- 폰트 로딩이 완료될 때까지 앱이 빈 화면을 보여주는 것을 방지
- 스플래시 스크린을 유지하여 사용자 경험 개선
- 폰트 로딩 완료 후 자연스럽게 앱 화면으로 전환

## 📱 테스트 방법

1. 개발 서버 실행:
```bash
cd touchcare-mobile
npm start
```

2. Expo Go 앱으로 QR 코드 스캔

3. 화면에 "터치케어" 텍스트가 프리텐다드 폰트로 표시되는지 확인

## 🎨 폰트 사용 방법

### 기본 사용
```javascript
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
});
```

### 폰트 Weight별 사용
- `Pretendard-Regular` - 일반 텍스트
- `Pretendard-Medium` - 중간 굵기
- `Pretendard-SemiBold` - 세미볼드
- `Pretendard-Bold` - 볼드

**참고:** PretendardVariable.ttf는 가변 폰트이므로 모든 weight가 하나의 파일에 포함되어 있습니다.

## 🚀 다음 단계

이제 터치케어 색상 컨셉을 적용하고 UI를 개발할 수 있습니다!
