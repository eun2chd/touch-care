/**
 * 터치 기록 더미 데이터
 */

export interface TouchRecord {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  seconds?: string; // 초 (SS)
  timestamp: number; // 정렬용
}

export const MOCK_RECORDS: TouchRecord[] = [
  // 1월 데이터
  { id: '1', date: '2026-01-15', time: '14:30', seconds: '15', timestamp: new Date('2026-01-15T14:30:15').getTime() },
  { id: '2', date: '2026-01-15', time: '15:45', seconds: '32', timestamp: new Date('2026-01-15T15:45:32').getTime() },
  { id: '3', date: '2026-01-15', time: '16:20', seconds: '48', timestamp: new Date('2026-01-15T16:20:48').getTime() },
  { id: '4', date: '2026-01-16', time: '09:15', seconds: '05', timestamp: new Date('2026-01-16T09:15:05').getTime() },
  { id: '5', date: '2026-01-16', time: '10:30', seconds: '22', timestamp: new Date('2026-01-16T10:30:22').getTime() },
  { id: '6', date: '2026-01-18', time: '11:00', seconds: '10', timestamp: new Date('2026-01-18T11:00:10').getTime() },
  { id: '7', date: '2026-01-18', time: '13:25', seconds: '55', timestamp: new Date('2026-01-18T13:25:55').getTime() },
  { id: '8', date: '2026-01-18', time: '14:50', seconds: '18', timestamp: new Date('2026-01-18T14:50:18').getTime() },
  { id: '9', date: '2026-01-18', time: '16:10', seconds: '42', timestamp: new Date('2026-01-18T16:10:42').getTime() },
  { id: '10', date: '2026-01-20', time: '08:30', seconds: '30', timestamp: new Date('2026-01-20T08:30:30').getTime() },
  { id: '11', date: '2026-01-20', time: '09:45', seconds: '12', timestamp: new Date('2026-01-20T09:45:12').getTime() },
  { id: '12', date: '2026-01-20', time: '11:20', seconds: '25', timestamp: new Date('2026-01-20T11:20:25').getTime() },
  { id: '13', date: '2026-01-20', time: '12:15', seconds: '38', timestamp: new Date('2026-01-20T12:15:38').getTime() },
  { id: '14', date: '2026-01-20', time: '13:40', seconds: '50', timestamp: new Date('2026-01-20T13:40:50').getTime() },
  { id: '15', date: '2026-01-20', time: '15:00', seconds: '03', timestamp: new Date('2026-01-20T15:00:03').getTime() },
  { id: '16', date: '2026-01-20', time: '16:30', seconds: '27', timestamp: new Date('2026-01-20T16:30:27').getTime() },
  { id: '17', date: '2026-01-20', time: '17:45', seconds: '41', timestamp: new Date('2026-01-20T17:45:41').getTime() },
  { id: '18', date: '2026-01-20', time: '18:20', seconds: '16', timestamp: new Date('2026-01-20T18:20:16').getTime() },
  { id: '19', date: '2026-01-20', time: '19:10', seconds: '59', timestamp: new Date('2026-01-20T19:10:59').getTime() },
  { id: '20', date: '2026-01-20', time: '20:00', seconds: '08', timestamp: new Date('2026-01-20T20:00:08').getTime() },
  { id: '21', date: '2026-01-22', time: '10:00', seconds: '33', timestamp: new Date('2026-01-22T10:00:33').getTime() },
  { id: '22', date: '2026-01-22', time: '11:30', seconds: '47', timestamp: new Date('2026-01-22T11:30:47').getTime() },
  // 2월 데이터
  { id: '23', date: '2026-02-01', time: '09:15', seconds: '20', timestamp: new Date('2026-02-01T09:15:20').getTime() },
  { id: '24', date: '2026-02-01', time: '10:30', seconds: '45', timestamp: new Date('2026-02-01T10:30:45').getTime() },
  { id: '25', date: '2026-02-01', time: '14:20', seconds: '12', timestamp: new Date('2026-02-01T14:20:12').getTime() },
  { id: '26', date: '2026-02-03', time: '08:45', seconds: '30', timestamp: new Date('2026-02-03T08:45:30').getTime() },
  { id: '27', date: '2026-02-03', time: '11:10', seconds: '55', timestamp: new Date('2026-02-03T11:10:55').getTime() },
  { id: '28', date: '2026-02-03', time: '15:30', seconds: '18', timestamp: new Date('2026-02-03T15:30:18').getTime() },
  { id: '29', date: '2026-02-03', time: '17:45', seconds: '42', timestamp: new Date('2026-02-03T17:45:42').getTime() },
  { id: '30', date: '2026-02-05', time: '10:00', seconds: '05', timestamp: new Date('2026-02-05T10:00:05').getTime() },
  { id: '31', date: '2026-02-05', time: '12:25', seconds: '33', timestamp: new Date('2026-02-05T12:25:33').getTime() },
  { id: '32', date: '2026-02-05', time: '13:50', seconds: '27', timestamp: new Date('2026-02-05T13:50:27').getTime() },
  { id: '33', date: '2026-02-05', time: '16:15', seconds: '50', timestamp: new Date('2026-02-05T16:15:50').getTime() },
  { id: '34', date: '2026-02-07', time: '09:30', seconds: '15', timestamp: new Date('2026-02-07T09:30:15').getTime() },
  { id: '35', date: '2026-02-07', time: '11:45', seconds: '38', timestamp: new Date('2026-02-07T11:45:38').getTime() },
  { id: '36', date: '2026-02-07', time: '14:20', seconds: '22', timestamp: new Date('2026-02-07T14:20:22').getTime() },
  { id: '37', date: '2026-02-10', time: '08:00', seconds: '10', timestamp: new Date('2026-02-10T08:00:10').getTime() },
  { id: '38', date: '2026-02-10', time: '10:15', seconds: '25', timestamp: new Date('2026-02-10T10:15:25').getTime() },
  { id: '39', date: '2026-02-10', time: '12:30', seconds: '40', timestamp: new Date('2026-02-10T12:30:40').getTime() },
  { id: '40', date: '2026-02-10', time: '15:45', seconds: '55', timestamp: new Date('2026-02-10T15:45:55').getTime() },
  { id: '41', date: '2026-02-10', time: '18:20', seconds: '08', timestamp: new Date('2026-02-10T18:20:08').getTime() },
  { id: '42', date: '2026-02-12', time: '09:00', seconds: '30', timestamp: new Date('2026-02-12T09:00:30').getTime() },
  { id: '43', date: '2026-02-12', time: '11:30', seconds: '45', timestamp: new Date('2026-02-12T11:30:45').getTime() },
  { id: '44', date: '2026-02-12', time: '13:45', seconds: '20', timestamp: new Date('2026-02-12T13:45:20').getTime() },
  { id: '45', date: '2026-02-15', time: '10:20', seconds: '15', timestamp: new Date('2026-02-15T10:20:15').getTime() },
  { id: '46', date: '2026-02-15', time: '12:40', seconds: '35', timestamp: new Date('2026-02-15T12:40:35').getTime() },
  { id: '47', date: '2026-02-15', time: '14:55', seconds: '50', timestamp: new Date('2026-02-15T14:55:50').getTime() },
  { id: '48', date: '2026-02-15', time: '16:30', seconds: '12', timestamp: new Date('2026-02-15T16:30:12').getTime() },
  { id: '49', date: '2026-02-18', time: '08:15', seconds: '25', timestamp: new Date('2026-02-18T08:15:25').getTime() },
  { id: '50', date: '2026-02-18', time: '10:45', seconds: '40', timestamp: new Date('2026-02-18T10:45:40').getTime() },
  { id: '51', date: '2026-02-18', time: '13:20', seconds: '18', timestamp: new Date('2026-02-18T13:20:18').getTime() },
  { id: '52', date: '2026-02-20', time: '09:30', seconds: '33', timestamp: new Date('2026-02-20T09:30:33').getTime() },
  { id: '53', date: '2026-02-20', time: '11:15', seconds: '47', timestamp: new Date('2026-02-20T11:15:47').getTime() },
  { id: '54', date: '2026-02-20', time: '14:00', seconds: '22', timestamp: new Date('2026-02-20T14:00:22').getTime() },
  { id: '55', date: '2026-02-20', time: '16:45', seconds: '55', timestamp: new Date('2026-02-20T16:45:55').getTime() },
  { id: '56', date: '2026-02-20', time: '18:30', seconds: '10', timestamp: new Date('2026-02-20T18:30:10').getTime() },
  { id: '57', date: '2026-02-22', time: '08:45', seconds: '28', timestamp: new Date('2026-02-22T08:45:28').getTime() },
  { id: '58', date: '2026-02-22', time: '10:20', seconds: '42', timestamp: new Date('2026-02-22T10:20:42').getTime() },
  { id: '59', date: '2026-02-25', time: '09:00', seconds: '15', timestamp: new Date('2026-02-25T09:00:15').getTime() },
  { id: '60', date: '2026-02-25', time: '12:30', seconds: '38', timestamp: new Date('2026-02-25T12:30:38').getTime() },
  { id: '61', date: '2026-02-25', time: '15:15', seconds: '52', timestamp: new Date('2026-02-25T15:15:52').getTime() },
  { id: '62', date: '2026-02-28', time: '10:00', seconds: '25', timestamp: new Date('2026-02-28T10:00:25').getTime() },
  { id: '63', date: '2026-02-28', time: '13:45', seconds: '40', timestamp: new Date('2026-02-28T13:45:40').getTime() },
  { id: '64', date: '2026-02-28', time: '17:20', seconds: '18', timestamp: new Date('2026-02-28T17:20:18').getTime() },
];
