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