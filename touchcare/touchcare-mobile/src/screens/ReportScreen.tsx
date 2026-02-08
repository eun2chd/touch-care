import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// @ts-ignore - @expo/vector-icons 타입 정의
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import Colors from '../constants/colors';
import Typography from '../constants/Typography';
import { MOCK_RECORDS } from '../data/mockRecords';

interface ReportScreenProps {
  navigation: any;
}

type PeriodType = 'week' | 'month';

/**
 * 리포트 화면
 */
export const ReportScreen: React.FC<ReportScreenProps> = ({ navigation }) => {
  const [periodType, setPeriodType] = useState<PeriodType>('week');

  // 기간별 필터링된 기록
  const filteredRecords = useMemo(() => {
    const today = new Date();
    const cutoffDate = new Date(today);
    
    if (periodType === 'week') {
      // 최근 7일
      cutoffDate.setDate(cutoffDate.getDate() - 7);
    } else {
      // 최근 30일 (월간)
      cutoffDate.setDate(cutoffDate.getDate() - 30);
    }
    
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];
    return MOCK_RECORDS.filter((record) => record.date >= cutoffDateStr);
  }, [periodType]);

  // 시간대별 분포 계산
  const timeDistribution = useMemo(() => {
    const distribution = {
      morning: 0, // 06:00 - 12:00
      afternoon: 0, // 12:00 - 18:00
      evening: 0, // 18:00 - 24:00
    };

    filteredRecords.forEach((record) => {
      const [hours] = record.time.split(':').map(Number);
      if (hours >= 6 && hours < 12) {
        distribution.morning++;
      } else if (hours >= 12 && hours < 18) {
        distribution.afternoon++;
      } else if (hours >= 18 && hours < 24) {
        distribution.evening++;
      }
    });

    const total = distribution.morning + distribution.afternoon + distribution.evening;
    return {
      morning: total > 0 ? (distribution.morning / total) * 100 : 0,
      afternoon: total > 0 ? (distribution.afternoon / total) * 100 : 0,
      evening: total > 0 ? (distribution.evening / total) * 100 : 0,
      counts: {
        morning: distribution.morning,
        afternoon: distribution.afternoon,
        evening: distribution.evening,
      },
    };
  }, [filteredRecords]);

  // 기간별 변화 패턴 계산
  const periodPattern = useMemo(() => {
    const today = new Date();
    const items = [];
    
    if (periodType === 'week') {
      // 주간: 최근 7일
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const count = filteredRecords.filter((r) => r.date === dateStr).length;
        items.push({
          date: dateStr,
          label: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
          count,
        });
      }
    } else {
      // 월간: 최근 30일을 주 단위로 그룹화 (4주)
      const weeks = [];
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - (i * 7) - 6);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        const weekStartStr = weekStart.toISOString().split('T')[0];
        const weekEndStr = weekEnd.toISOString().split('T')[0];
        
        const count = filteredRecords.filter((r) => r.date >= weekStartStr && r.date <= weekEndStr).length;
        items.push({
          date: weekStartStr,
          label: `${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
          count,
        });
      }
    }
    
    return items;
  }, [periodType, filteredRecords]);

  const maxPeriodCount = Math.max(...periodPattern.map((d) => d.count), 1);

  // AI 분석 리포트 생성
  const aiAnalysis = useMemo(() => {
    const totalRecords = filteredRecords.length;
    const days = periodType === 'week' ? 7 : 30;
    const avgPerDay = totalRecords / days;
    const mostActiveTime = 
      timeDistribution.counts.morning > timeDistribution.counts.afternoon &&
      timeDistribution.counts.morning > timeDistribution.counts.evening
        ? '오전'
        : timeDistribution.counts.afternoon > timeDistribution.counts.evening
        ? '오후'
        : '저녁';

    // 트렌드 계산: 최근 기간과 이전 기간 비교
    const today = new Date();
    const currentPeriodStart = new Date(today);
    currentPeriodStart.setDate(currentPeriodStart.getDate() - days);
    const previousPeriodStart = new Date(currentPeriodStart);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - days);
    
    const currentPeriodCount = filteredRecords.length;
    const previousPeriodCount = MOCK_RECORDS.filter((r) => {
      const recordDate = new Date(r.date);
      return recordDate >= previousPeriodStart && recordDate < currentPeriodStart;
    }).length;
    
    let trend = '관찰';
    if (currentPeriodCount > previousPeriodCount * 1.2) {
      trend = '증가';
    } else if (currentPeriodCount >= previousPeriodCount * 0.8) {
      trend = '안정';
    }

    return {
      totalRecords,
      avgPerDay: avgPerDay.toFixed(1),
      mostActiveTime,
      trend,
    };
  }, [filteredRecords, periodType, timeDistribution]);

  const renderTimeDistributionChart = () => {
    const maxHeight = 200;
    const maxCount = Math.max(
      timeDistribution.counts.morning,
      timeDistribution.counts.afternoon,
      timeDistribution.counts.evening,
      1
    );

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>시간대별 분포</Text>
        <View style={styles.chartWrapper}>
          <View style={styles.chartBars}>
            {/* 오전 */}
            <View style={styles.chartBarGroup}>
              <View style={styles.chartBarContainer}>
                <View
                  style={[
                    styles.chartBar,
                    {
                      height: (timeDistribution.counts.morning / maxCount) * maxHeight,
                      backgroundColor: Colors.primary,
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>오전</Text>
              <Text style={styles.chartValue}>{timeDistribution.counts.morning}건</Text>
              <Text style={styles.chartPercentage}>
                {timeDistribution.morning.toFixed(1)}%
              </Text>
            </View>

            {/* 오후 */}
            <View style={styles.chartBarGroup}>
              <View style={styles.chartBarContainer}>
                <View
                  style={[
                    styles.chartBar,
                    {
                      height: (timeDistribution.counts.afternoon / maxCount) * maxHeight,
                      backgroundColor: Colors.secondary,
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>오후</Text>
              <Text style={styles.chartValue}>{timeDistribution.counts.afternoon}건</Text>
              <Text style={styles.chartPercentage}>
                {timeDistribution.afternoon.toFixed(1)}%
              </Text>
            </View>

            {/* 저녁 */}
            <View style={styles.chartBarGroup}>
              <View style={styles.chartBarContainer}>
                <View
                  style={[
                    styles.chartBar,
                    {
                      height: (timeDistribution.counts.evening / maxCount) * maxHeight,
                      backgroundColor: Colors.accent,
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>저녁</Text>
              <Text style={styles.chartValue}>{timeDistribution.counts.evening}건</Text>
              <Text style={styles.chartPercentage}>
                {timeDistribution.evening.toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderPeriodPatternChart = () => {
    const maxHeight = 150;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          {periodType === 'week' ? '주간 변화 패턴' : '월간 변화 패턴'}
        </Text>
        <View style={styles.chartWrapper}>
          <View style={styles.weeklyChartBars}>
            {periodPattern.map((item, index) => (
              <View key={index} style={styles.weeklyChartBarGroup}>
                <View style={styles.weeklyChartBarContainer}>
                  <View
                    style={[
                      styles.weeklyChartBar,
                      {
                        height: (item.count / maxPeriodCount) * maxHeight,
                        backgroundColor: item.count > 0 ? Colors.primary : Colors.iceBlue,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.weeklyChartLabel}>{item.label}</Text>
                <Text style={styles.weeklyChartValue}>{item.count}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen showBottomTab={true} currentScreen="Report" onNavigate={navigation.navigate}>
      <Header navigation={navigation} />
      <View style={styles.headerActions}>
        <View style={styles.periodToggle}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              periodType === 'week' && styles.periodButtonActive,
            ]}
            onPress={() => setPeriodType('week')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.periodButtonText,
                periodType === 'week' && styles.periodButtonTextActive,
              ]}
            >
              주간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              periodType === 'month' && styles.periodButtonActive,
            ]}
            onPress={() => setPeriodType('month')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.periodButtonText,
                periodType === 'month' && styles.periodButtonTextActive,
              ]}
            >
              월간
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
          <MaterialIcons name="picture-as-pdf" size={20} color={Colors.primary} />
          <Text style={styles.exportButtonText}>PDF 내보내기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* AI 분석 리포트 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="psychology" size={24} color={Colors.primary} />
            <Text style={styles.sectionTitle}>AI 분석 리포트</Text>
          </View>
          <View style={styles.analysisCard}>
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>총 기록 수</Text>
              <Text style={styles.analysisValue}>{aiAnalysis.totalRecords}건</Text>
            </View>
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>일평균 기록</Text>
              <Text style={styles.analysisValue}>{aiAnalysis.avgPerDay}건</Text>
            </View>
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>가장 활발한 시간대</Text>
              <Text style={styles.analysisValue}>{aiAnalysis.mostActiveTime}</Text>
            </View>
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>변화 패턴</Text>
              <View style={styles.trendBadge}>
                <Text style={[styles.trendText, { color: getTrendColor(aiAnalysis.trend) }]}>
                  {aiAnalysis.trend}
                </Text>
              </View>
            </View>
            <View style={styles.analysisDescription}>
              <Text style={styles.descriptionText}>
                분석 결과, 터치 패턴이 {aiAnalysis.trend}적인 변화를 보이고 있습니다.
                {'\n'}
                {aiAnalysis.mostActiveTime} 시간대에 가장 많은 활동이 관찰되었습니다.
              </Text>
            </View>
          </View>
        </View>

        {/* 시간대별 분포 차트 */}
        {renderTimeDistributionChart()}

        {/* 기간별 변화 패턴 차트 */}
        {renderPeriodPatternChart()}
      </ScrollView>
    </Screen>
  );
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case '증가':
      return Colors.secondary;
    case '안정':
      return Colors.primary;
    case '관찰':
      return Colors.slateGray;
    default:
      return Colors.text;
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  periodToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.iceBlue,
    borderRadius: 8,
    padding: 4,
    gap: 4,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
  },
  periodButtonText: {
    ...Typography.text.body,
    color: Colors.text,
    fontWeight: '600',
  },
  periodButtonTextActive: {
    color: Colors.background,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  exportButtonText: {
    ...Typography.text.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    ...Typography.text.h3,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  analysisCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.iceBlue,
  },
  analysisLabel: {
    ...Typography.text.body,
    color: Colors.textLight,
  },
  analysisValue: {
    ...Typography.text.body,
    color: Colors.text,
    fontWeight: '600',
  },
  trendBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.iceBlue,
  },
  trendText: {
    ...Typography.text.body,
    fontWeight: '600',
  },
  analysisDescription: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.iceBlue,
  },
  descriptionText: {
    ...Typography.text.body,
    color: Colors.text,
    lineHeight: 24,
  },
  chartContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.iceBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    ...Typography.text.h4,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  chartBarGroup: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarContainer: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartBar: {
    width: 60,
    borderRadius: 8,
    minHeight: 4,
  },
  chartLabel: {
    ...Typography.text.body,
    color: Colors.text,
    fontWeight: '600',
    marginTop: 8,
  },
  chartValue: {
    ...Typography.text.caption,
    color: Colors.textLight,
    marginTop: 4,
  },
  chartPercentage: {
    ...Typography.text.caption,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  weeklyChartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  weeklyChartBarGroup: {
    alignItems: 'center',
    flex: 1,
  },
  weeklyChartBarContainer: {
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  weeklyChartBar: {
    width: 30,
    borderRadius: 4,
    minHeight: 4,
  },
  weeklyChartLabel: {
    ...Typography.text.caption,
    color: Colors.text,
    marginTop: 8,
  },
  weeklyChartValue: {
    ...Typography.text.caption,
    color: Colors.textLight,
    marginTop: 4,
  },
});

export default ReportScreen;
