import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { Button } from './Button';

interface DeleteRecordModalProps {
  visible: boolean;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 기록 삭제 확인 모달 컴포넌트
 */
export const DeleteRecordModal: React.FC<DeleteRecordModalProps> = ({
  visible,
  date,
  time,
  onConfirm,
  onCancel,
}) => {
  const formatSelectedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[date.getDay()];
    return `${month}월 ${day}일 (${dayName})`;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>기록 삭제</Text>
          <Text style={styles.modalMessage}>
            {formatSelectedDate(date)} {'\n'}
            {time}에 클릭한 기록을 삭제하시겠습니까?
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button
              title="취소"
              onPress={onCancel}
              variant="outline"
              style={styles.modalButton}
            />
            <Button
              title="확인"
              onPress={onConfirm}
              variant="primary"
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    ...Typography.text.h4,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalMessage: {
    ...Typography.text.body,
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});

export default DeleteRecordModal;
