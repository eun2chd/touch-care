/**
 * TouchCare 타이포그래피
 * Pretendard 폰트 사용
 */

export const Typography = {
  // 폰트 패밀리
  fontFamily: {
    regular: 'Pretendard-Regular',
    medium: 'Pretendard-Medium',
    semiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
  },
  
  // 폰트 크기
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // 미리 정의된 텍스트 스타일
  text: {
    h1: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 36,
    },
    h2: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 30,
    },
    h3: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 24,
    },
    h4: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 20,
    },
    body: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
    },
    bodyMedium: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 16,
    },
    caption: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 14,
    },
    small: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 12,
    },
  },
};

export default Typography;
