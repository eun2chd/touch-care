import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';

interface SignUpScreenProps {
  navigation: any;
}

/**
 * 회원가입 화면
 * Label-Value 구조
 */
export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.id.trim()) {
      newErrors.id = 'ID를 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요.';
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // TODO: 실제 회원가입 API 호출
    setTimeout(() => {
      setLoading(false);
      console.log('회원가입 데이터:', formData);
      // 회원가입 성공 시 로그인 화면으로 이동
      navigation.goBack();
    }, 1000);
  };

  const renderInputField = (
    label: string,
    field: keyof typeof formData,
    placeholder: string,
    options?: {
      secureTextEntry?: boolean;
      keyboardType?: 'default' | 'email-address' | 'phone-pad';
      autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    }
  ) => {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors[field] && styles.inputError]}
              placeholder={placeholder}
              placeholderTextColor={Colors.textLight}
              value={formData[field]}
              onChangeText={(value) => handleChange(field, value)}
              secureTextEntry={options?.secureTextEntry}
              keyboardType={options?.keyboardType || 'default'}
              autoCapitalize={options?.autoCapitalize || 'none'}
              autoCorrect={false}
            />
          </View>
        </View>
        {errors[field] && (
          <Text style={styles.errorText}>{errors[field]}</Text>
        )}
      </View>
    );
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

          <Text style={styles.subtitle}>새 계정 만들기</Text>

          {/* 로그인 링크 */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>이미 계정이 있으신가요? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>로그인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {renderInputField('ID', 'id', 'ID를 입력하세요')}

            {renderInputField(
              '이메일',
              'email',
              '이메일을 입력하세요',
              { keyboardType: 'email-address' }
            )}

            {renderInputField(
              '비밀번호',
              'password',
              '비밀번호를 입력하세요',
              { secureTextEntry: true }
            )}

            {renderInputField(
              '비밀번호 확인',
              'confirmPassword',
              '비밀번호를 다시 입력하세요',
              { secureTextEntry: true }
            )}

            {renderInputField('이름', 'name', '이름을 입력하세요')}

            {renderInputField(
              '전화번호',
              'phone',
              '전화번호를 입력하세요',
              { keyboardType: 'phone-pad' }
            )}

            <Button
              title="회원가입"
              onPress={handleSignUp}
              variant="primary"
              loading={loading}
              disabled={loading}
              style={styles.signUpButton}
            />
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
    padding: 20,
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  subtitle: {
    ...Typography.text.h4,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginLinkText: {
    ...Typography.text.body,
    color: Colors.text,
  },
  loginLink: {
    ...Typography.text.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelContainer: {
    width: 100,
    minWidth: 100,
  },
  label: {
    ...Typography.text.bodyMedium,
    color: Colors.text,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    ...Typography.text.body,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
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
    marginTop: 6,
  },
  signUpButton: {
    marginTop: 10,
  },
});

export default SignUpScreen;
