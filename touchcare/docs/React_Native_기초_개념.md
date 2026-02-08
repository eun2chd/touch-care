# React Native + Expo 기초 개념 가이드

> **웹 React 개발자를 위한 React Native 핵심 차이점 정리**

---

## 🧠 1️⃣ React Native는 "웹이 아니다"

### 가장 중요한 차이점

| 웹 React | React Native |
|---------|-------------|
| `<div>` | `<View>` |
| `<span>`, `<p>` | `<Text>` |
| `<button>` | `<Button>` 또는 `<TouchableOpacity>` |
| CSS 파일 | `StyleSheet` (JavaScript 객체) |
| DOM | 네이티브 UI 컴포넌트 |

### 핵심 원칙
- ❌ **HTML 태그 없음** - `<div>`, `<span>` 등 사용 불가
- ❌ **CSS 파일 없음** - 모든 스타일은 JavaScript 객체
- ❌ **DOM 없음** - 네이티브 컴포넌트로 렌더링

### 기본 예제
```javascript
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>안녕 모바일</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

---

## 📦 2️⃣ 레이아웃은 전부 Flexbox

### 기본 원칙
모바일 레이아웃은 **거의 100% Flexbox 기반**

### ⚠️ 웹과의 차이
```javascript
// 웹 React (기본값: row)
.container {
  display: flex; /* 기본: row */
}

// React Native (기본값: column)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // 기본값! (웹과 반대)
  },
});
```

### 자주 쓰는 4가지 속성 (80% 커버)
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // 남은 공간 모두 차지
    justifyContent: 'center',   // 주축 정렬 (세로)
    alignItems: 'center',       // 교차축 정렬 (가로)
    flexDirection: 'row',       // 가로 배치 (기본은 column)
  },
});
```

### Flexbox 패턴 예시
```javascript
// 1. 화면 전체 채우기
{ flex: 1 }

// 2. 가로 배치
{ flexDirection: 'row' }

// 3. 중앙 정렬
{ 
  justifyContent: 'center',
  alignItems: 'center'
}

// 4. 양쪽 끝 정렬
{
  flexDirection: 'row',
  justifyContent: 'space-between'
}
```

---

## 🎨 3️⃣ 스타일은 객체 방식

### 웹 vs React Native

#### ❌ 웹 방식 (사용 불가)
```css
/* CSS 파일 */
.container {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
}
```

#### ✅ React Native 방식
```javascript
const styles = StyleSheet.create({
  container: {
    marginTop: 10,        // 단위 없음 (px 안 씀)
    backgroundColor: '#fff', // camelCase
    borderRadius: 8,      // camelCase
  },
});
```

### 핵심 규칙
1. **단위 없음** - `10px` ❌ → `10` ✅
2. **camelCase** - `margin-top` ❌ → `marginTop` ✅
3. **문자열/숫자** - 색상은 문자열, 크기는 숫자

### 자주 쓰는 스타일 속성
```javascript
{
  // 여백
  margin: 10,
  marginTop: 10,
  marginHorizontal: 20,  // 좌우
  marginVertical: 15,    // 상하
  padding: 10,
  
  // 크기
  width: 100,
  height: 50,
  flex: 1,
  
  // 색상
  backgroundColor: '#fff',
  color: '#333',
  
  // 테두리
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  
  // 정렬
  justifyContent: 'center',
  alignItems: 'center',
}
```

---

## 📱 4️⃣ ScrollView / FlatList 필수

### 문제: 웹처럼 자동 스크롤 안 됨

#### ❌ 이렇게 하면 스크롤 안 생김
```javascript
<View>
  <Text>항목 1</Text>
  <Text>항목 2</Text>
  <Text>항목 3</Text>
  {/* 화면 넘어가도 스크롤 안 됨! */}
</View>
```

#### ✅ ScrollView 사용
```javascript
import { ScrollView, Text } from 'react-native';

<ScrollView>
  <Text>항목 1</Text>
  <Text>항목 2</Text>
  <Text>항목 3</Text>
  {/* 이제 스크롤 됨! */}
</ScrollView>
```

### FlatList (목록용, 성능 좋음)
```javascript
import { FlatList } from 'react-native';

const data = [
  { id: '1', title: '항목 1' },
  { id: '2', title: '항목 2' },
  { id: '3', title: '항목 3' },
];

<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Text>{item.title}</Text>
  )}
/>
```

### 언제 뭘 쓸까?
- **ScrollView**: 간단한 스크롤, 항목이 적을 때
- **FlatList**: 긴 목록, 성능 중요할 때

---

## 🧭 5️⃣ 화면 이동 (Navigation)

### 웹과의 차이
- 웹: URL 기반 라우팅 (`/login`, `/home`)
- React Native: **Navigation Stack** 기반

### 설치
```bash
npx expo install @react-navigation/native @react-navigation/native-stack
```

### 기본 구조
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 화면 이동하기
```javascript
// LoginScreen.js
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const navigation = useNavigation();
  
  const handleLogin = () => {
    navigation.navigate('Home'); // 화면 이동
  };
  
  return (
    <Button title="로그인" onPress={handleLogin} />
  );
}
```

### 네비게이션 타입
1. **Stack Navigator** - 페이지 쌓임 (로그인 → 홈 → 상세)
2. **Tab Navigator** - 하단 탭 (홈, 검색, 프로필)
3. **Drawer Navigator** - 사이드 메뉴

### 목업용 추천 조합
```javascript
// Stack + Tab 조합
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeStack} />
  <Tab.Screen name="Search" component={SearchStack} />
</Tab.Navigator>
```

---

## 🔥 6️⃣ 상태관리는 React와 동일

### 웹 React와 거의 동일

```javascript
// useState - 동일
const [count, setCount] = useState(0);

// useEffect - 동일
useEffect(() => {
  console.log('마운트됨');
}, []);

// Context - 동일
const ThemeContext = createContext();

// 커스텀 훅 - 동일
function useAuth() {
  // ...
}
```

### 차이점 거의 없음
- `useState`, `useEffect`, `useContext` 모두 동일
- Redux, Zustand, Jotai 등도 동일하게 사용 가능

---

## 📁 7️⃣ 폴더 구조 (목업용)

### 추천 구조
```
touchcare-mobile/
├── App.js                 # 메인 앱 (Navigation 설정)
├── screens/               # 화면 단위
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   └── DetailScreen.js
├── components/            # 재사용 UI 컴포넌트
│   ├── Button.js
│   ├── Card.js
│   └── Header.js
├── navigation/            # 네비게이션 설정
│   └── AppNavigator.js
└── assets/                # 이미지, 폰트
    └── images/
```

### 각 폴더 역할
- **screens/** - 페이지 단위 (Login, Home, Detail)
- **components/** - 재사용 가능한 UI (Button, Card)
- **navigation/** - 네비게이션 스택/탭 설정
- **assets/** - 정적 파일 (이미지, 폰트)

---

## ⚠️ 웹 개발자들이 처음에 헷갈리는 것

### ❌ 하지 말아야 할 것들

```javascript
// 1. div 사용 시도
<div>  // ❌ 에러!

// 2. CSS 파일 import
import './styles.css';  // ❌ 안 됨

// 3. CSS 단위 사용
{
  width: '100vw',  // ❌ vw 없음
  fontSize: '1.5rem',  // ❌ rem 없음
  height: '50vh',  // ❌ vh 없음
}

// 4. className 사용
<View className="container">  // ❌ className 없음

// 5. HTML 이벤트
onClick={handleClick}  // ❌ onClick 없음 (onPress 사용)
```

### ✅ 올바른 방법

```javascript
// 1. View 사용
<View>  // ✅

// 2. StyleSheet 사용
const styles = StyleSheet.create({ ... });  // ✅

// 3. 숫자 값 사용
{
  width: '100%',  // ✅ 문자열로 퍼센트는 가능
  fontSize: 16,   // ✅ 숫자
  height: 200,    // ✅ 숫자
}

// 4. style prop 사용
<View style={styles.container}>  // ✅

// 5. onPress 사용
<TouchableOpacity onPress={handleClick}>  // ✅
```

---

## 💡 목업 개발에 필요한 핵심 5가지

### 1. View / Text
```javascript
<View style={styles.container}>
  <Text>기본 컴포넌트</Text>
</View>
```

### 2. Flexbox
```javascript
{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
```

### 3. StyleSheet
```javascript
const styles = StyleSheet.create({
  container: { ... },
});
```

### 4. ScrollView
```javascript
<ScrollView>
  {/* 스크롤 가능한 내용 */}
</ScrollView>
```

### 5. Navigation
```javascript
navigation.navigate('ScreenName');
```

**이 5개만 알면 앱처럼 보이는 목업 가능! 🚀**

---

## 🎯 목표별 구조 가이드

### 1️⃣ 로그인 → 홈 → 상세 (Stack Navigator)

```javascript
// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**흐름:**
```
Login → (로그인 버튼) → Home → (항목 클릭) → Detail
```

---

### 2️⃣ 탭 네비게이션 있는 구조 (Stack + Tab)

```javascript
// navigation/AppNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 홈 탭 내부 스택
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

// 메인 탭 네비게이터
export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

**구조:**
```
┌─────────────────┐
│  Tab Navigator  │
├─────────────────┤
│ Home │ Search │ Profile │
└─────────────────┘
     │
     └─ HomeStack
         ├─ Home
         └─ Detail
```

---

### 3️⃣ 단일 화면 데모

```javascript
// App.js
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>단일 화면 데모</Text>
      </View>
      
      <View style={styles.content}>
        <Text>내용 영역</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
});
```

---

## 📚 빠른 참조표

### 컴포넌트 매핑
| 웹 | React Native |
|---|-------------|
| `<div>` | `<View>` |
| `<span>`, `<p>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` + `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |

### 스타일 매핑
| CSS | React Native |
|---|-------------|
| `display: flex` | 기본값 (항상 flex) |
| `flex-direction: row` | `flexDirection: 'row'` |
| `justify-content: center` | `justifyContent: 'center'` |
| `align-items: center` | `alignItems: 'center'` |
| `margin-top: 10px` | `marginTop: 10` |
| `background-color` | `backgroundColor` |
| `border-radius` | `borderRadius` |

### 이벤트 매핑
| 웹 | React Native |
|---|-------------|
| `onClick` | `onPress` |
| `onChange` | `onChangeText` (TextInput) |
| `onSubmit` | `onSubmitEditing` |

---

## 🚀 다음 단계

1. **기본 컴포넌트 익히기** - View, Text, TouchableOpacity
2. **Flexbox 마스터하기** - 레이아웃의 80%
3. **Navigation 설정** - 화면 이동 구현
4. **목업 UI 만들기** - 실제 앱처럼 보이게

**이제 목업 개발 준비 완료! 🎉**
