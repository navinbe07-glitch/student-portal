export const initialExams = [
  {
    id: 'EXM-2026-01',
    name: 'Quarterly Examination 2026',
    term: 'Term 1',
    academicYear: '2026–2027',
    startDate: '2026-09-10',
    endDate: '2026-09-18',
    status: 'Completed',
    classes: ['6th Standard', '7th Standard', '8th Standard', '9th Standard', '10th Standard', '11th Standard', '12th Standard'],
    description: 'First term comprehensive assessment covering 40% syllabus'
  },
  {
    id: 'EXM-2026-02',
    name: 'Mid-Term Unit Test II',
    term: 'Term 2',
    academicYear: '2026–2027',
    startDate: '2026-10-20',
    endDate: '2026-10-25',
    status: 'Upcoming',
    classes: ['1st Standard', '2nd Standard', '3rd Standard', '4th Standard', '5th Standard', '6th Standard', '7th Standard', '8th Standard', '9th Standard', '10th Standard'],
    description: 'Monthly revision assessment for foundational topics'
  },
  {
    id: 'EXM-2026-03',
    name: 'Half-Yearly Examination 2026',
    term: 'Term 2',
    academicYear: '2026–2027',
    startDate: '2026-12-10',
    endDate: '2026-12-22',
    status: 'Scheduled',
    classes: ['All Classes (1st to 12th)'],
    description: 'Mid-year state board pattern comprehensive examination'
  }
];

export const examSchedules = [
  { examId: 'EXM-2026-01', class: '10th Standard', date: '2026-09-10', day: 'Thursday', subject: 'Tamil', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
  { examId: 'EXM-2026-01', class: '10th Standard', date: '2026-09-12', day: 'Saturday', subject: 'English', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
  { examId: 'EXM-2026-01', class: '10th Standard', date: '2026-09-14', day: 'Monday', subject: 'Mathematics', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
  { examId: 'EXM-2026-01', class: '10th Standard', date: '2026-09-16', day: 'Wednesday', subject: 'Science', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
  { examId: 'EXM-2026-01', class: '10th Standard', date: '2026-09-18', day: 'Friday', subject: 'Social Science', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' }
];

export const initialMarks10A = [
  {
    studentId: 'STU-1001',
    rollNo: '101',
    name: 'Arun Kumar',
    examId: 'EXM-2026-01',
    class: '10th Standard',
    section: 'A',
    marks: {
      Tamil: { max: 100, obtained: 91, grade: 'A+' },
      English: { max: 100, obtained: 94, grade: 'A+' },
      Mathematics: { max: 100, obtained: 95, grade: 'A+' },
      Science: { max: 100, obtained: 88, grade: 'A' },
      SocialScience: { max: 100, obtained: 89, grade: 'A' }
    },
    totalMax: 500,
    totalObtained: 457,
    percentage: 91.4,
    grade: 'A+',
    result: 'Pass',
    rank: 3,
    teacherRemarks: 'Exceptional mathematical aptitude and consistent work habits.'
  },
  {
    studentId: 'STU-1002',
    rollNo: '102',
    name: 'Priya Sundaram',
    examId: 'EXM-2026-01',
    class: '10th Standard',
    section: 'A',
    marks: {
      Tamil: { max: 100, obtained: 96, grade: 'A+' },
      English: { max: 100, obtained: 98, grade: 'A+' },
      Mathematics: { max: 100, obtained: 99, grade: 'A+' },
      Science: { max: 100, obtained: 95, grade: 'A+' },
      SocialScience: { max: 100, obtained: 97, grade: 'A+' }
    },
    totalMax: 500,
    totalObtained: 485,
    percentage: 97.0,
    grade: 'A+',
    result: 'Pass',
    rank: 1,
    teacherRemarks: 'Outstanding overall performance. Model student in all subjects.'
  },
  {
    studentId: 'STU-1003',
    rollNo: '103',
    name: 'Kavin Raj',
    examId: 'EXM-2026-01',
    class: '10th Standard',
    section: 'A',
    marks: {
      Tamil: { max: 100, obtained: 82, grade: 'A' },
      English: { max: 100, obtained: 84, grade: 'A' },
      Mathematics: { max: 100, obtained: 76, grade: 'B+' },
      Science: { max: 100, obtained: 80, grade: 'A' },
      SocialScience: { max: 100, obtained: 79, grade: 'B+' }
    },
    totalMax: 500,
    totalObtained: 401,
    percentage: 80.2,
    grade: 'A',
    result: 'Pass',
    rank: 8,
    teacherRemarks: 'Very good effort. Needs slight practice in Mathematics problem solving.'
  }
];

export function calculateGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 35) return 'D';
  return 'F';
}
