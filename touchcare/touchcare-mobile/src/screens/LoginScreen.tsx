import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { useUserStore, DEFAULT_USER } from '../store/useUserStore';

interface LoginScreenProps {
  navigation: any;
}

// 하드코딩된 로그인 정보
const VALID_ID = 'touch';
const VALID_PASSWORD = 'ntp1231';

/**
 * 로그인 화면
 */
export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = () => {
    // 입력값 검증
    if (!id.trim() || !password.trim()) {
      setError('ID와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    // 하드코딩된 로그인 검증
    if (id === VALID_ID && password === VALID_PASSWORD) {
      // 로그인 성공 - 전역 상태에 사용자 정보 저장
      setTimeout(() => {
        setUser(DEFAULT_USER);
        setLoading(false);
        navigation.navigate('Home');
      }, 500); // 로딩 효과를 위한 짧은 딜레이
    } else {
      // 로그인 실패
      setTimeout(() => {
        setLoading(false);
        setError('ID 또는 비밀번호가 올바르지 않습니다.');
      }, 500);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: 구글 로그인 구현
    console.log('구글 로그인');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
          {/* 로고 이미지 */}
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>로그인</Text>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="ID"
              placeholderTextColor={Colors.textLight}
              value={id}
              onChangeText={(text) => {
                setId(text);
                setError(''); // 입력 시 에러 메시지 제거
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="비밀번호"
              placeholderTextColor={Colors.textLight}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(''); // 입력 시 에러 메시지 제거
              }}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <Button
              title="로그인"
              onPress={handleLogin}
              variant="primary"
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
            />

            {/* 구분선 */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>또는</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 구글 로그인 버튼 */}
            <Button
              title="구글 계정으로 로그인 하기"
              onPress={handleGoogleLogin}
              variant="outline"
              style={styles.googleButton}
            />

            {/* 회원가입 유도 */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>계정이 없으신가요? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signupLink}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    ...Typography.text.h1,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    ...Typography.text.h4,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  input: {
    ...Typography.text.body,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputError: {
    borderColor: Colors.warning,
    borderWidth: 1.5,
  },
  errorText: {
    ...Typography.text.caption,
    color: Colors.warning,
    marginBottom: 12,
    marginTop: -8,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    ...Typography.text.caption,
    color: Colors.textLight,
    marginHorizontal: 16,
  },
  googleButton: {
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    ...Typography.text.body,
    color: Colors.text,
  },
  signupLink: {
    ...Typography.text.body,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
