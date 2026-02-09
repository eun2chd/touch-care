# APK 빌드 가이드

## 사전 준비사항

1. **Expo 계정 필요** (무료)
   - https://expo.dev 에서 회원가입
   - 또는 기존 계정 사용

2. **Node.js 설치 확인**
   - `node --version` 명령어로 확인

## 빌드 절차

### 1단계: EAS CLI 설치
```bash
npm install -g eas-cli
```

### 2단계: Expo 계정 로그인
```bash
eas login
```
- 브라우저가 열리면 Expo 계정으로 로그인
- 또는 `eas login --username YOUR_USERNAME` 사용

### 3단계: 프로젝트 초기화 (처음 한 번만)
```bash
cd touchcare-mobile
eas build:configure
```
- Android 선택
- 기본 설정으로 진행

### 4단계: app.json 설정 확인
- package 이름이 필요합니다 (예: com.yourcompany.touchcare)
- app.json에 android.package 추가 필요

### 5단계: APK 빌드 실행
```bash
eas build --platform android --profile preview
```

또는 개발용 APK (더 빠름):
```bash
eas build --platform android --profile development
```

### 6단계: 빌드 완료 후 다운로드
- 빌드가 완료되면 Expo 대시보드에서 다운로드 링크 제공
- 또는 명령어로 다운로드:
```bash
eas build:list
eas build:download [BUILD_ID]
```

## 빌드 프로필 설정 (eas.json)

빌드 프로필을 커스터마이징하려면 `eas.json` 파일을 수정:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "development": {
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      }
    }
  }
}
```

## 로컬 빌드 (선택사항)

클라우드 빌드 대신 로컬에서 빌드하려면:
```bash
eas build --platform android --local
```
- Android SDK와 Java JDK 필요
- 더 복잡하지만 무료

## 웹으로 실행하기 (개발/테스트용)

Expo 프로젝트는 웹 브라우저에서도 실행할 수 있습니다. 모바일 앱 없이 빠르게 UI를 확인할 때 유용합니다.

### 실행 절차

1. **프로젝트 폴더로 이동**
```bash
cd touchcare-mobile
```

2. **웹 의존성 설치 (처음 한 번만)**
   - `react`와 `react-dom`은 **반드시 동일한 버전**이어야 하므로, 아래 중 하나로 설치:

**방법 A - 권장 (한 번에 설치):**
```bash
npm install react-native-web react-dom@19.1.0 --legacy-peer-deps
```
(프로젝트의 react 버전이 19.1.0인 경우, react-dom도 19.1.0으로 맞춤)

**방법 B - Expo 권장 명령 사용 후 버전 맞추기:**
```bash
npx expo install react-native-web react-dom
# 만약 react/react-dom 버전 불일치 오류 발생 시:
npm install react-dom@19.1.0 --save-exact
```

3. **웹 서버 실행**
```bash
npm run web
```

또는 `expo start` 실행 후 터미널에서 `w` 키 입력

4. **브라우저에서 접속**
   - 자동으로 브라우저가 열리지 않으면 **http://localhost:8081** 로 접속

### 발생했던 문제점과 해결 방법

| 문제 | 원인 | 해결 방법 |
|------|------|-----------|
| `CommandError: It looks like you're trying to use web support but don't have the required dependencies installed` | 웹 지원에 필요한 `react-native-web` 패키지가 미설치 | `npx expo install react-native-web react-dom` 실행 |
| `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version` | `react`(19.1.0)와 `react-dom`(19.2.4) 버전 불일치 | `npm install react-dom@19.1.0 --save-exact`로 동일 버전 맞추기 |
| `ERESOLVE unable to resolve dependency tree` | npm 의존성 충돌 (peer dependency) | `--legacy-peer-deps` 옵션 사용 (또는 react-dom 버전 수동 맞춤) |

### 참고사항
- **블루투스 등 네이티브 기능**은 웹에서 동작하지 않습니다.
- 개발 중 빠른 확인용으로 활용하고, 실제 디바이스 테스트는 Expo Go 또는 APK 빌드 권장

## 코드 수정 후 재빌드

### ✅ 코드를 수정한 경우
**반드시 APK를 다시 빌드해야 합니다!**

APK 파일은 코드가 컴파일되어 포함된 실행 파일이므로, 코드를 수정했다면:
1. 변경사항을 저장
2. 다시 빌드 명령어 실행:
   ```bash
   eas build --platform android --profile preview
   ```
3. 새로운 APK 파일을 다운로드하여 설치

### ⚠️ 주의사항
- **개발 중에는 Expo Go 앱 사용 권장** (빠른 테스트)
  ```bash
  npm start
  ```
  - Expo Go 앱에서 QR 코드 스캔하면 즉시 변경사항 확인 가능
- **APK 빌드는 배포/테스트용**으로 사용
- 코드 변경마다 빌드하면 시간이 오래 걸리므로, 개발 중에는 Expo Go 사용 추천

## 앱 아이콘 설정

### 현재 설정 위치
앱 아이콘은 `app.json` 파일에서 설정됩니다:

```json
{
  "expo": {
    "icon": "./assets/icon.png",  // 기본 아이콘
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",  // Android 적응형 아이콘
        "backgroundColor": "#ffffff"  // 배경색
      }
    }
  }
}
```

### 아이콘 변경 방법

1. **아이콘 이미지 준비**
   - 기본 아이콘: `assets/icon.png` (1024x1024px 권장)
   - Android 적응형 아이콘: `assets/adaptive-icon.png` (1024x1024px, 투명 배경)

2. **이미지 교체**
   - 기존 파일을 새 이미지로 교체
   - 파일명은 동일하게 유지 (`icon.png`, `adaptive-icon.png`)

3. **app.json 확인**
   - 경로가 올바른지 확인 (`./assets/icon.png`)

4. **재빌드**
   - 아이콘 변경 후 APK를 다시 빌드해야 적용됨:
   ```bash
   eas build --platform android --profile preview
   ```

### 아이콘 이미지 요구사항
- **크기**: 1024x1024px (정사각형)
- **형식**: PNG
- **적응형 아이콘**: 투명 배경 권장 (중앙에 로고만)
- **배경색**: `adaptiveIcon.backgroundColor`에서 설정

### 현재 아이콘 파일 위치
```
touchcare-mobile/
  └── assets/
      ├── icon.png              # 기본 아이콘
      └── adaptive-icon.png     # Android 적응형 아이콘
```

## 주의사항

1. **첫 빌드는 시간이 오래 걸릴 수 있습니다** (10-20분)
2. **무료 계정은 월 빌드 제한이 있을 수 있습니다**
3. **package name은 고유해야 합니다** (다른 앱과 중복 불가)
4. **코드 수정 후에는 반드시 재빌드 필요**
5. **아이콘 변경 후에도 재빌드 필요**