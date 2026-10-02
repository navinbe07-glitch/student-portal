import { studentService } from './studentService';

const ATTENDANCE_KEY = 'edusphere_attendance_daily';

export const attendanceService = {
  getAttendanceForClass(dateStr, className, section) {
    const key = `${dateStr}_${className}_${section}`;
    const allAttendance = this.getAllAttendance();
    if (allAttendance[key]) {
      return allAttendance[key];
    }

    // Default auto-generated roll-call list from students in that class
    const students = studentService.getStudents().filter(s => s.class === className && s.section === section);
    const initialRollCall = students.map(s => ({
      studentId: s.id,
      rollNo: s.rollNo,
      name: s.name,
      status: s.presentToday ? 'Present' : 'Absent',
      notes: ''
    }));

    allAttendance[key] = initialRollCall;
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(allAttendance));
    return initialRollCall;
  },

  getAllAttendance() {
    const data = localStorage.getItem(ATTENDANCE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  },

  saveAttendance(dateStr, className, section, attendanceList) {
    const key = `${dateStr}_${className}_${section}`;
    const all = this.getAllAttendance();
    all[key] = attendanceList;
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(all));

    // Synchronize students presentToday state and cumulative stats
    attendanceList.forEach(item => {
      const student = studentService.getStudentById(item.studentId);
      if (student) {
        const isPresent = item.status === 'Present' || item.status === 'Late';
        const isAbsent = item.status === 'Absent';
        const isLeave = item.status === 'Leave';

        let presentDays = student.presentDays || 78;
        let absentDays = student.absentDays || 4;
        let leaveDays = student.leaveDays || 2;

        if (isPresent) {
          presentDays += 1;
        } else if (isAbsent) {
          absentDays += 1;
        } else if (isLeave) {
          leaveDays += 1;
        }

        const totalDays = presentDays + absentDays + leaveDays;
        const newRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 94;

        studentService.updateStudent(item.studentId, {
          presentToday: isPresent,
          presentDays,
          absentDays,
          leaveDays,
          attendance: newRate
        });
      }
    });

    return true;
  },

  getAttendanceStats() {
    return {
      totalStudents: 1248,
      presentToday: 1136,
      absentToday: 112,
      attendancePercentage: 91.0,
      dailyTrend: [
        { day: 'Mon', attendanceRate: 94.2, present: 1175, absent: 73 },
        { day: 'Tue', attendanceRate: 92.8, present: 1158, absent: 90 },
        { day: 'Wed', attendanceRate: 95.1, present: 1187, absent: 61 },
        { day: 'Thu', attendanceRate: 93.6, preliminary: 1168, absent: 80 },
        { day: 'Fri', attendanceRate: 91.0, present: 1136, absent: 112 }
      ],
      classComparison: [
        { class: 'Primary (1-5)', rate: 96.2 },
        { class: 'Middle (6-8)', rate: 93.8 },
        { class: 'Secondary (9-10)', rate: 92.4 },
        { class: 'Higher Sec (11-12)', rate: 94.5 }
      ]
    };
  }
};
