import { generateAllStudents } from '../data/mockStudents';

const STORAGE_KEY = 'edusphere_students';

export const studentService = {
  getStudents() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const hasAnanya = parsed.some(s => s.id === 'STU-1004');
        if (hasAnanya) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing students from localStorage', e);
      }
    }
    const initial = generateAllStudents();
    this.saveStudents(initial);
    return initial;
  },

  saveStudents(students) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  },

  getStudentById(id) {
    const students = this.getStudents();
    return students.find(s => s.id === id || s.admissionNo === id || s.rollNo === id) || null;
  },

  addStudent(newStudentData) {
    const students = this.getStudents();
    const newId = `STU-${1000 + students.length + 1}`;
    const student = {
      id: newId,
      admissionNo: `GV-2026-${100 + students.length + 1}`,
      rollNo: String(students.length + 1),
      ...newStudentData,
      avatar: newStudentData.avatar || (newStudentData.gender === 'Female' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80'),
      attendance: 100,
      presentToday: true,
      feeStatus: 'Pending',
      totalFee: newStudentData.totalFee || 45000,
      paidFee: 0,
      pendingFee: newStudentData.totalFee || 45000,
      feeDueDate: '2026-10-15',
      marks: [],
      homework: [],
      documents: [
        { name: 'Birth Certificate', status: 'Submitted', date: new Date().toLocaleDateString('en-GB') },
        { name: 'Transfer Certificate', status: 'Submitted', date: new Date().toLocaleDateString('en-GB') }
      ],
      paymentHistory: []
    };
    const updated = [student, ...students];
    this.saveStudents(updated);
    return student;
  },

  updateStudent(id, partialData) {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...partialData };
      this.saveStudents(students);
      return students[index];
    }
    return null;
  },

  resetToDefault() {
    localStorage.removeItem(STORAGE_KEY);
    return this.getStudents();
  }
};
