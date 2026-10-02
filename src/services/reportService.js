import { studentService } from './studentService';
import { feeService } from './feeService';
import { attendanceService } from './attendanceService';

export const reportService = {
  getSummaryReports() {
    const students = studentService.getStudents();
    const feeStats = feeService.getStats();
    const attendanceStats = attendanceService.getAttendanceStats();

    return {
      totalStudents: students.length,
      feeCollectionRate: ((feeStats.collected / feeStats.totalExpected) * 100).toFixed(1),
      attendanceRate: attendanceStats.attendancePercentage,
      passRateQuarterly: 96.8,
      houseDistribution: [
        { name: 'Emerald', count: students.filter(s => s.house === 'Emerald').length, fill: '#10b981' },
        { name: 'Ruby', count: students.filter(s => s.house === 'Ruby').length, fill: '#f43f5e' },
        { name: 'Sapphire', count: students.filter(s => s.house === 'Sapphire').length, fill: '#0ea5e9' },
        { name: 'Topaz', count: students.filter(s => s.house === 'Topaz').length, fill: '#f59e0b' }
      ],
      genderRatio: [
        { name: 'Boys', value: students.filter(s => s.gender === 'Male').length, fill: '#6366f1' },
        { name: 'Girls', value: students.filter(s => s.gender === 'Female').length, fill: '#ec4899' }
      ],
      monthlyAdmissionTrend: [
        { month: 'Apr', admissions: 145 },
        { month: 'May', admissions: 310 },
        { month: 'Jun', admissions: 520 },
        { month: 'Jul', admissions: 180 },
        { month: 'Aug', admissions: 65 },
        { month: 'Sep', admissions: 28 }
      ]
    };
  },

  exportToCSV(filename, rows) {
    if (!rows || !rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
