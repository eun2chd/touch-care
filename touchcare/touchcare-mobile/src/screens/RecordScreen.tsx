import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { DeleteRecordModal } from '../components/DeleteRecordModal';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { MOCK_RECORDS, TouchRecord } from '../data/mockRecords';

interface RecordScreenProps {
  navigation: any;
}

/**
 * 기록 화면
 */
export const RecordScreen: React.FC<RecordScreenProps> = ({ navigation }) => {
  const [isMonthView, setIsMonthView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day;
    return new Date(today.setDate(diff));
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedRecord, setSelectedRecord] = useState<TouchRecord | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [records, setRecords] = useState<TouchRecord[]>(MOCK_RECORDS);

  // 선택된 날짜의 기록 필터링 및 정렬 (시간 역순)
  const selectedDateRecords = useMemo(() => {
    if (!selectedDate) return [];
    return records
      .filter(record => record.date === selectedDate)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [selectedDate, records]);

  // 페이징된 기록
  const paginatedRecords = useMemo(() => {
    const endIndex = page * pageSize;
    return selectedDateRecords.slice(0, endIndex);
  }, [selectedDateRecords, page]);

  // 기록이 있는 날짜 목록
  const datesWithRecords = useMemo(() => {
    return new Set(records.map(record => record.date));
  }, [records]);

  // 주간 캘린더 날짜 생성
  const weekDates = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [currentWeekStart]);

  // 월 캘린더 날짜 생성
  const monthDates = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const dates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || dates.length < 42) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      if (dates.length >= 42) break;
    }
    
    return dates;
  }, [currentMonth]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (paginatedRecords.length < selectedDateRecords.length) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (date: Date) => {
    return date.getDate();
  };

  const formatDayName = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  const formatSelectedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = formatDayName(date);
    return `${month}월 ${day}일 (${dayName})`;
  };

  const renderWeekCalendar = () => (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={handlePrevWeek} style={styles.navButton}>
          <MaterialIcons name="chevron-left" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.calendarTitle}>
          {currentWeekStart.getFullYear()}년 {currentWeekStart.getMonth() + 1}월 {currentWeekStart.getDate()}일 - {weekDates[6].getMonth() + 1}월 {weekDates[6].getDate()}일
        </Text>
        <TouchableOpacity onPress={handleNextWeek} style={styles.navButton}>
          <MaterialIcons name="chevron-right" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.weekDaysContainer}>
        {weekDates.map((date, index) => {
          const dateKey = formatDateKey(date);
          const hasRecord = datesWithRecords.has(dateKey);
          const isSelected = selectedDate === dateKey;
          const isToday = formatDateKey(new Date()) === dateKey;
          const dayOfWeek = date.getDay();
          const isSunday = dayOfWeek === 0;
          const isSaturday = dayOfWeek === 6;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.weekDayItem, isSelected && styles.weekDayItemSelected]}
              onPress={() => handleDateSelect(dateKey)}
            >
              <Text style={[
                styles.dayName,
                isSelected && styles.dayNameSelected,
                isSunday && styles.dayNameSunday,
                isSaturday && styles.dayNameSaturday,
              ]}>
                {formatDayName(date)}
              </Text>
              <Text style={[
                styles.dayNumber,
                isToday && styles.dayNumberToday,
                isSelected && styles.dayNumberSelected,
                isSunday && styles.dayNumberSunday,
                isSaturday && styles.dayNumberSaturday,
              ]}>
                {formatDateDisplay(date)}
              </Text>
              {hasRecord && <View style={[styles.recordDot, isSelected && styles.recordDotSelected]} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderMonthCalendar = () => (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <MaterialIcons name="chevron-left" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.calendarTitle}>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <MaterialIcons name="chevron-right" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.monthDaysHeader}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <View key={index} style={styles.monthDayHeader}>
            <Text style={styles.monthDayHeaderText}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.monthDaysContainer}>
        {monthDates.map((date, index) => {
          const dateKey = formatDateKey(date);
          const hasRecord = datesWithRecords.has(dateKey);
          const isSelected = selectedDate === dateKey;
          const isToday = formatDateKey(new Date()) === dateKey;
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.monthDayItem,
                !isCurrentMonth && styles.monthDayItemOtherMonth,
                isSelected && styles.monthDayItemSelected,
                isToday && styles.monthDayItemToday,
              ]}
              onPress={() => handleDateSelect(dateKey)}
            >
              <Text style={[
                styles.monthDayNumber,
                !isCurrentMonth && styles.monthDayNumberOtherMonth,
                isSelected && styles.monthDayNumberSelected,
                isToday && styles.monthDayNumberToday,
              ]}>
                {formatDateDisplay(date)}
              </Text>
              {hasRecord && <View style={[styles.recordDot, isSelected && styles.recordDotSelected]} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const handleRecordPress = (record: TouchRecord) => {
    setSelectedRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRecord) {
      setRecords(prev => prev.filter(r => r.id !== selectedRecord.id));
      setIsDeleteModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedRecord(null);
  };

  const formatFullTime = (record: TouchRecord) => {
    const seconds = record.seconds || '00';
    return `${record.time}:${seconds}`;
  };

  const renderRecordItem = ({ item }: { item: TouchRecord }) => (
    <TouchableOpacity
      style={styles.recordItem}
      onPress={() => handleRecordPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.recordItemLeft}>
        <MaterialIcons name="touch-app" size={20} color={Colors.primary} />
        <Text style={styles.recordTime}>{item.time}</Text>
      </View>
      <Text style={styles.recordLabel}>터치 기록</Text>
    </TouchableOpacity>
  );

  return (
    <Screen showBottomTab={true} currentScreen="Record" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <View style={styles.viewToggleContainer}>
        <TouchableOpacity
          style={[styles.viewToggle, !isMonthView && styles.viewToggleActive]}
          onPress={() => setIsMonthView(false)}
        >
          <Text style={[styles.viewToggleText, !isMonthView && styles.viewToggleTextActive]}>주간</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewToggle, isMonthView && styles.viewToggleActive]}
          onPress={() => setIsMonthView(true)}
        >
          <Text style={[styles.viewToggleText, isMonthView && styles.viewToggleTextActive]}>월간</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {isMonthView ? renderMonthCalendar() : renderWeekCalendar()}
        
        {selectedDate && (
          <View style={styles.recordsSection}>
            <View style={styles.recordsHeader}>
              <Text style={styles.recordsTitle}>{formatSelectedDate(selectedDate)}</Text>
              <Text style={styles.recordsCount}>총 {selectedDateRecords.length}건</Text>
            </View>
            <FlatList
              data={paginatedRecords}
              renderItem={renderRecordItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ListFooterComponent={
                paginatedRecords.length < selectedDateRecords.length ? (
                  <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={handleLoadMore}
                  >
                    <Text style={styles.loadMoreText}>더보기 ({selectedDateRecords.length - paginatedRecords.length}건 남음)</Text>
                  </TouchableOpacity>
                ) : null
              }
            />
          </View>
        )}
      </ScrollView>

      {/* 삭제 확인 모달 */}
      {selectedRecord && (
        <DeleteRecordModal
          visible={isDeleteModalVisible}
          date={selectedRecord.date}
          time={formatFullTime(selectedRecord)}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: Colors.background,
  },
  viewToggle: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  viewToggleActive: {
    backgroundColor: Colors.primary,
  },
  viewToggleText: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  viewToggleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  calendarContainer: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  calendarTitle: {
    ...Typography.text.h4,
    color: Colors.primary,
    fontWeight: '600',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  weekDayItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  weekDayItemSelected: {
    backgroundColor: Colors.primary + '20',
  },
  dayName: {
    ...Typography.text.caption,
    color: Colors.textLight,
    marginBottom: 4,
  },
  dayNameSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  dayNameSunday: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  dayNameSaturday: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  dayNumber: {
    ...Typography.text.h4,
    color: Colors.text,
    marginBottom: 4,
  },
  dayNumberToday: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  dayNumberSelected: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  dayNumberSunday: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  dayNumberSaturday: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  recordDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
    marginTop: 4,
  },
  recordDotSelected: {
    backgroundColor: Colors.success,
  },
  monthDaysHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  monthDayHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  monthDayHeaderText: {
    ...Typography.text.caption,
    color: Colors.textLight,
    fontWeight: '600',
  },
  monthDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  monthDayItem: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 2,
    position: 'relative',
  },
  monthDayItemOtherMonth: {
    opacity: 0.3,
  },
  monthDayItemSelected: {
    backgroundColor: Colors.primary + '20',
  },
  monthDayItemToday: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  monthDayNumber: {
    ...Typography.text.body,
    color: Colors.text,
  },
  monthDayNumberOtherMonth: {
    color: Colors.textLight,
  },
  monthDayNumberSelected: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  monthDayNumberToday: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  recordsSection: {
    padding: 20,
  },
  recordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordsTitle: {
    ...Typography.text.h4,
    color: Colors.primary,
    fontWeight: '600',
  },
  recordsCount: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
  },
  recordItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordTime: {
    ...Typography.text.body,
    color: Colors.text,
    fontWeight: '600',
  },
  recordLabel: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  loadMoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loadMoreText: {
    ...Typography.text.body,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default RecordScreen;
