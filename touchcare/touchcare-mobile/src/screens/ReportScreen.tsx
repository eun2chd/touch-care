import React, { useMemo } from 'react';
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

/**
 * 리포트 화면
 */
export const ReportScreen: React.FC<ReportScreenProps> = ({ navigation }) => {
  // 시간대별 분포 계산
  const timeDistribution = useMemo(() => {
    const distribution = {
      morning: 0, // 06:00 - 12:00
      afternoon: 0, // 12:00 - 18:00
      evening: 0, // 18:00 - 24:00
    };

    MOCK_RECORDS.forEach((record) => {
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
  }, []);

  // 주간 변화 패턴 계산 (최근 7일)
  const weeklyPattern = useMemo(() => {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = MOCK_RECORDS.filter((r) => r.date === dateStr).length;
      days.push({
        date: dateStr,
        dayName: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        count,
      });
    }
    return days;
  }, []);

  const maxWeeklyCount = Math.max(...weeklyPattern.map((d) => d.count), 1);

  // AI 분석 리포트 생성
  const aiAnalysis = useMemo(() => {
    const totalRecords = MOCK_RECORDS.length;
    const avgPerDay = totalRecords / 30; // 대략적인 일평균
    const mostActiveTime = 
      timeDistribution.counts.morning > timeDistribution.counts.afternoon &&
      timeDistribution.counts.morning > timeDistribution.counts.evening
        ? '오전'
        : timeDistribution.counts.afternoon > timeDistribution.counts.evening
        ? '오후'
        : '저녁';

    return {
      totalRecords,
      avgPerDay: avgPerDay.toFixed(1),
      mostActiveTime,
      trend: totalRecords > 40 ? '증가' : totalRecords > 20 ? '안정' : '관찰',
    };
  }, [timeDistribution]);

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

  const renderWeeklyPatternChart = () => {
    const maxHeight = 150;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>주간 변화 패턴</Text>
        <View style={styles.chartWrapper}>
          <View style={styles.weeklyChartBars}>
            {weeklyPattern.map((day, index) => (
              <View key={index} style={styles.weeklyChartBarGroup}>
                <View style={styles.weeklyChartBarContainer}>
                  <View
                    style={[
                      styles.weeklyChartBar,
                      {
                        height: (day.count / maxWeeklyCount) * maxHeight,
                        backgroundColor: day.count > 0 ? Colors.primary : Colors.iceBlue,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.weeklyChartLabel}>{day.dayName}</Text>
                <Text style={styles.weeklyChartValue}>{day.count}</Text>
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

        {/* 주간 변화 패턴 차트 */}
        {renderWeeklyPatternChart()}
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
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
