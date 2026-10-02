import { initialExams, examSchedules, initialMarks10A, calculateGrade } from '../data/mockExams';
import { studentService } from './studentService';

const EXAMS_KEY = 'edusphere_exams';
const MARKS_KEY = 'edusphere_marks';

export const examService = {
  getExams() {
    const data = localStorage.getItem(EXAMS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(EXAMS_KEY, JSON.stringify(initialExams));
    return initialExams;
  },

  getMarks() {
    const data = localStorage.getItem(MARKS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(MARKS_KEY, JSON.stringify(initialMarks10A));
    return initialMarks10A;
  },

  saveMarks(marksList) {
    localStorage.setItem(MARKS_KEY, JSON.stringify(marksList));
    return true;
  },

  updateStudentMarks(studentId, examId, subject, obtainedMarks, maxMarks = 100) {
    const allMarks = this.getMarks();
    let entryIndex = allMarks.findIndex(m => m.studentId === studentId && (m.examId === examId || !examId));
    const numericObtained = Number(obtainedMarks);

    if (entryIndex === -1) {
      const student = studentService.getStudentById(studentId);
      const newEntry = {
        studentId,
        studentName: student ? student.name : 'Student',
        rollNo: student ? student.rollNo : '101',
        class: student ? student.class : '10th Standard',
        section: student ? student.section : 'A',
        examId: examId || 'EXM-2026-01',
        examName: 'Quarterly Examination 2026',
        marks: {},
        totalMax: 0,
        totalObtained: 0,
        percentage: 0,
        grade: 'F',
        rank: 1,
        result: 'Pass'
      };
      allMarks.push(newEntry);
      entryIndex = allMarks.length - 1;
    }

    const entry = allMarks[entryIndex];
    const subjectGrade = calculateGrade((numericObtained / maxMarks) * 100);
    
    entry.marks[subject] = {
      max: maxMarks,
      obtained: numericObtained,
      grade: subjectGrade
    };

    // Recalculate totals
    let totalMax = 0;
    let totalObt = 0;
    Object.values(entry.marks).forEach(sub => {
      totalMax += (sub.max || 100);
      totalObt += (sub.obtained || 0);
    });
    entry.totalMax = totalMax;
    entry.totalObtained = totalObt;
    entry.percentage = Number(((totalObt / totalMax) * 100).toFixed(1));
    entry.grade = calculateGrade(entry.percentage);
    entry.result = entry.percentage >= 35 ? 'Pass' : 'Fail';

    allMarks[entryIndex] = entry;
    this.saveMarks(allMarks);

    // Synchronize directly with student in studentService
    const student = studentService.getStudentById(studentId);
    if (student) {
      const studentMarks = Array.isArray(student.marks) ? [...student.marks] : [];
      const subIndex = studentMarks.findIndex(sm => sm.subject.toLowerCase() === subject.toLowerCase());
      const markEntry = {
        subject,
        maxMarks,
        obtainedMarks: numericObtained,
        grade: subjectGrade,
        exam: 'Quarterly Examination 2026'
      };

      if (subIndex !== -1) {
        studentMarks[subIndex] = markEntry;
      } else {
        studentMarks.push(markEntry);
      }

      studentService.updateStudent(studentId, { marks: studentMarks });
    }

    return entry;
  },

  addExam(examData) {
    const exams = this.getExams();
    const newExam = {
      id: `EXM-2026-${String(exams.length + 1).padStart(2, '0')}`,
      status: examData.status || 'Upcoming',
      gradingSystem: examData.gradingSystem || 'Tamil Nadu State Board 10-Point Scale',
      targetClasses: examData.targetClasses || ['10th Standard', '11th Standard', '12th Standard'],
      ...examData
    };
    const updated = [...exams, newExam];
    localStorage.setItem(EXAMS_KEY, JSON.stringify(updated));
    return newExam;
  },

  updateExam(id, updates) {
    const exams = this.getExams();
    const idx = exams.findIndex(e => e.id === id);
    if (idx !== -1) {
      exams[idx] = { ...exams[idx], ...updates };
      localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
      return exams[idx];
    }
    return null;
  },

  getSchedules() {
    return examSchedules;
  }
};
