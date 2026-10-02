// Realistic Indian student data generator and curated students
const firstNamesMale = [
  'Arun', 'Kavin', 'Rohit', 'Sanjay', 'Vignesh', 'Aditya', 'Deepak', 'Karthik', 'Madhavan', 
  'Manoj', 'Naveen', 'Pranav', 'Rithvik', 'Sai', 'Saravanan', 'Siddharth', 'Surya', 'Vijay',
  'Vishal', 'Aakash', 'Balaji', 'Dhanush', 'Ganesh', 'Hari', 'Irfan', 'Jagan', 'Kishore',
  'Lakshman', 'Mukesh', 'Nithesh', 'Parthiv', 'Raghav', 'Shankar', 'Tarun', 'Yogesh'
];

const firstNamesFemale = [
  'Priya', 'Ananya', 'Deepa', 'Sneha', 'Meenakshi', 'Divya', 'Harini', 'Janani', 'Kavitha',
  'Lakshmi', 'Nandhini', 'Pavithra', 'Pooja', 'Ragini', 'Shreya', 'Swathi', 'Trisha', 'Vaishnavi',
  'Aishwarya', 'Bhavani', 'Charumathi', 'Gayathri', 'Keerthana', 'Lavanya', 'Malathi', 'Nithya',
  'Preethi', 'Radhika', 'Sangeetha', 'Shalini', 'Supriya', 'Vandana', 'Varsha', 'Yuvashree'
];

const lastNames = [
  'Kumar', 'Sundaram', 'Raj', 'Sharma', 'Verma', 'Krishnan', 'Ramesh', 'Reddy', 'Natarajan',
  'Balasubramanian', 'Swaminathan', 'Murugan', 'Venkatesh', 'Subramanian', 'Iyer', 'Srinivasan',
  'Gopal', 'Narayanan', 'Chandran', 'Pillai', 'Menon', 'Rao', 'Patel', 'Das', 'Sen'
];

const houses = ['Emerald', 'Ruby', 'Sapphire', 'Topaz'];
const classesList = [
  '1st Standard', '2nd Standard', '3rd Standard', '4th Standard', '5th Standard',
  '6th Standard', '7th Standard', '8th Standard', '9th Standard', '10th Standard',
  '11th Standard', '12th Standard'
];
const sections = ['A', 'B', 'C'];

// Curated primary student required for scenario: Arun Kumar
export const initialStudents = [
  {
    id: 'STU-1001',
    admissionNo: 'GV-2024-101',
    rollNo: '101',
    name: 'Arun Kumar',
    gender: 'Male',
    dob: '2011-05-14',
    class: '10th Standard',
    section: 'A',
    house: 'Emerald',
    bloodGroup: 'B+',
    parent: 'Ramesh Kumar',
    parentRelation: 'Father',
    phone: '+91 98401 23456',
    parentPhone: '+91 98401 23456',
    email: 'ramesh.kumar@example.com',
    emergencyContact: '+91 98401 98765',
    address: 'Plot No. 42, Anna Nagar 2nd Avenue, Chennai, Tamil Nadu 600040',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    aadhaar: '7492 8193 4012',
    attendance: 94,
    presentDays: 78,
    absentDays: 4,
    leaveDays: 2,
    classroomRank: 3,
    classTeacher: 'Mrs. Revathi Ramanathan',
    classTeacherSubject: 'Mathematics',
    classTeacherPhone: '+91 94441 55667',
    whatsappGroupUrl: 'https://chat.whatsapp.com/GreenValleyClass10A',
    presentToday: true,
    feeStatus: 'Pending', // Scenario: Arun has pending fee
    totalFee: 45000,
    paidFee: 40000,
    pendingFee: 5000,
    feeDueDate: '2026-10-15',
    transportOpted: true,
    busRoute: 'Route 3 (Anna Nagar - School)',
    busStop: 'Roundtana Junction',
    marks: [
      { subject: 'Tamil', maxMarks: 100, obtainedMarks: 91, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'English', maxMarks: 100, obtainedMarks: 94, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 95, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 88, grade: 'A', exam: 'Quarterly Examination 2026' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 89, grade: 'A', exam: 'Quarterly Examination 2026' }
    ],
    homework: [
      { id: 'HW-101', subject: 'Mathematics', title: 'Trigonometry & Quadratic Identities', assignedDate: '2026-09-20', dueDate: '2026-09-25', status: 'Pending' },
      { id: 'HW-102', subject: 'Science', title: 'Carbon and its Compounds Experiment Record', assignedDate: '2026-09-21', dueDate: '2026-09-28', status: 'Pending' },
      { id: 'HW-103', subject: 'English', title: 'Formal Letter to the Municipal Commissioner', assignedDate: '2026-09-15', dueDate: '2026-09-18', status: 'Completed' }
    ],
    documents: [
      { name: 'Birth Certificate', status: 'Verified', date: '10 Jun 2024' },
      { name: 'Previous School TC', status: 'Verified', date: '10 Jun 2024' },
      { name: 'Aadhaar Card Copy', status: 'Verified', date: '12 Jun 2024' },
      { name: 'Student ID Card', status: 'Active', date: '01 Jul 2026' }
    ],
    paymentHistory: [
      { receiptNo: 'REC-2026-4401', date: '2026-06-12', amount: 25000, type: 'Term 1 Tuition Fee', method: 'Online UPI', status: 'Success' },
      { receiptNo: 'REC-2026-5820', date: '2026-08-04', amount: 15000, type: 'Term 2 Part Payment', method: 'Net Banking', status: 'Success' }
    ]
  },
  {
    id: 'STU-1002',
    admissionNo: 'GV-2024-102',
    rollNo: '102',
    name: 'Priya Sundaram',
    gender: 'Female',
    dob: '2011-08-22',
    class: '10th Standard',
    section: 'A',
    house: 'Sapphire',
    bloodGroup: 'O+',
    parent: 'Sundaram Natarajan',
    parentRelation: 'Father',
    phone: '+91 98402 33445',
    parentPhone: '+91 98402 33445',
    email: 'sundaram.n@example.com',
    emergencyContact: '+91 98402 99887',
    address: 'Flat 3B, Ceebros Park, Kilpauk, Chennai 600010',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    attendance: 98,
    presentToday: true,
    feeStatus: 'Paid',
    totalFee: 45000,
    paidFee: 45000,
    pendingFee: 0,
    feeDueDate: '2026-10-15',
    transportOpted: true,
    busRoute: 'Route 2 (Kilpauk - School)',
    busStop: 'Kilpauk Water Works',
    marks: [
      { subject: 'Tamil', maxMarks: 100, obtainedMarks: 96, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'English', maxMarks: 100, obtainedMarks: 98, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 99, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 95, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 97, grade: 'A+', exam: 'Quarterly Examination 2026' }
    ],
    homework: [
      { id: 'HW-101', subject: 'Mathematics', title: 'Trigonometry & Quadratic Identities', assignedDate: '2026-09-20', dueDate: '2026-09-25', status: 'Completed' },
      { id: 'HW-102', subject: 'Science', title: 'Carbon and its Compounds Experiment Record', assignedDate: '2026-09-21', dueDate: '2026-09-28', status: 'Pending' }
    ],
    documents: [
      { name: 'Birth Certificate', status: 'Verified', date: '05 Jun 2024' },
      { name: 'Aadhaar Card Copy', status: 'Verified', date: '05 Jun 2024' }
    ],
    paymentHistory: [
      { receiptNo: 'REC-2026-3109', date: '2026-06-08', amount: 45000, type: 'Full Annual Fee', method: 'Credit Card', status: 'Success' }
    ]
  },
  {
    id: 'STU-1003',
    admissionNo: 'GV-2024-103',
    rollNo: '103',
    name: 'Kavin Raj',
    gender: 'Male',
    dob: '2011-03-10',
    class: '10th Standard',
    section: 'A',
    house: 'Ruby',
    bloodGroup: 'A+',
    parent: 'Rajasekaran M.',
    parentRelation: 'Father',
    phone: '+91 97910 11223',
    parentPhone: '+91 97910 11223',
    email: 'rajasekaran.m@example.com',
    emergencyContact: '+91 97910 99001',
    address: '14, 5th Cross Street, Shenoy Nagar, Chennai 600030',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    attendance: 88,
    presentToday: false,
    feeStatus: 'Overdue',
    totalFee: 45000,
    paidFee: 20000,
    pendingFee: 25000,
    feeDueDate: '2026-08-31',
    transportOpted: false,
    busRoute: 'None',
    busStop: 'Self Transport',
    marks: [
      { subject: 'Tamil', maxMarks: 100, obtainedMarks: 82, grade: 'A', exam: 'Quarterly Examination 2026' },
      { subject: 'English', maxMarks: 100, obtainedMarks: 84, grade: 'A', exam: 'Quarterly Examination 2026' },
      { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 76, grade: 'B+', exam: 'Quarterly Examination 2026' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 80, grade: 'A', exam: 'Quarterly Examination 2026' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 79, grade: 'B+', exam: 'Quarterly Examination 2026' }
    ],
    homework: [
      { id: 'HW-101', subject: 'Mathematics', title: 'Trigonometry & Quadratic Identities', assignedDate: '2026-09-20', dueDate: '2026-09-25', status: 'Pending' }
    ],
    documents: [
      { name: 'Birth Certificate', status: 'Verified', date: '02 Jun 2024' }
    ],
    paymentHistory: [
      { receiptNo: 'REC-2026-2180', date: '2026-06-05', amount: 20000, type: 'Term 1 Fee', method: 'Cash', status: 'Success' }
    ]
  },
  {
    id: 'STU-1004',
    admissionNo: 'GV-2024-614',
    rollNo: '614',
    name: 'Ananya Kumar',
    gender: 'Female',
    dob: '2015-07-19',
    class: '6th Standard',
    section: 'B',
    house: 'Ruby',
    bloodGroup: 'A+',
    parent: 'Ramesh Kumar',
    parentRelation: 'Father',
    phone: '+91 98401 23456',
    parentPhone: '+91 98401 23456',
    email: 'ramesh.kumar@example.com',
    emergencyContact: '+91 98401 98765',
    address: 'Plot No. 42, Anna Nagar 2nd Avenue, Chennai, Tamil Nadu 600040',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=256&q=80',
    aadhaar: '8492 4102 9183',
    attendance: 97,
    presentDays: 82,
    absentDays: 2,
    leaveDays: 1,
    classroomRank: 2,
    classTeacher: 'Mrs. Malathi Natarajan',
    classTeacherSubject: 'Science & English',
    classTeacherPhone: '+91 94442 77889',
    whatsappGroupUrl: 'https://chat.whatsapp.com/GreenValleyClass6B',
    presentToday: true,
    feeStatus: 'Partially Paid',
    totalFee: 38000,
    paidFee: 35500,
    pendingFee: 2500,
    feeDueDate: '2026-10-20',
    transportOpted: true,
    busRoute: 'Route 3 (Anna Nagar - School)',
    busStop: 'Roundtana Junction',
    marks: [
      { subject: 'Tamil', maxMarks: 100, obtainedMarks: 96, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'English', maxMarks: 100, obtainedMarks: 92, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 84, grade: 'A', exam: 'Quarterly Examination 2026' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 95, grade: 'A+', exam: 'Quarterly Examination 2026' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 91, grade: 'A+', exam: 'Quarterly Examination 2026' }
    ],
    homework: [
      { id: 'HW-601', subject: 'Science', title: 'Plant Cell & Animal Cell Chart Model', assignedDate: '2026-09-21', dueDate: '2026-09-27', status: 'Pending' },
      { id: 'HW-602', subject: 'English', title: 'Creative Story Writing: The Wise Owl', assignedDate: '2026-09-19', dueDate: '2026-09-24', status: 'Completed' }
    ],
    documents: [
      { name: 'Birth Certificate', status: 'Verified', date: '08 Jun 2024' },
      { name: 'Previous School TC', status: 'Verified', date: '08 Jun 2024' },
      { name: 'Aadhaar Card Copy', status: 'Verified', date: '08 Jun 2024' },
      { name: 'Student ID Card', status: 'Active', date: '01 Jul 2026' }
    ],
    paymentHistory: [
      { receiptNo: 'REC-2026-3108', date: '2026-06-14', amount: 20000, type: 'Term 1 Tuition Fee', method: 'Online UPI', status: 'Success' },
      { receiptNo: 'REC-2026-4991', date: '2026-08-10', amount: 15500, type: 'Term 2 Part Payment', method: 'Net Banking', status: 'Success' }
    ]
  }
];

// Generate remaining 105 students distributed across 1st to 12th standards
export function generateAllStudents() {
  const students = [...initialStudents];
  let studentCounter = 1005;

  classesList.forEach((cls, classIdx) => {
    sections.forEach((sec) => {
      // 3 to 4 students per section to reach 108+ total students
      const countInSec = (classIdx === 9 && sec === 'A') ? 1 : 3; // 10th-A already has 3
      for (let i = 0; i < countInSec; i++) {
        const isMale = (studentCounter % 2 === 0);
        const firstName = isMale
          ? firstNamesMale[studentCounter % firstNamesMale.length]
          : firstNamesFemale[studentCounter % firstNamesFemale.length];
        const lastName = lastNames[(studentCounter + classIdx) % lastNames.length];
        const fullName = `${firstName} ${lastName}`;
        const parentLastName = lastNames[(studentCounter + 3) % lastNames.length];
        const parentName = `${firstNamesMale[(studentCounter + 5) % firstNamesMale.length]} ${parentLastName}`;
        
        const standardNum = classIdx + 1;
        const birthYear = 2026 - 6 - standardNum;
        const birthMonth = String((studentCounter % 12) + 1).padStart(2, '0');
        const birthDay = String((studentCounter % 28) + 1).padStart(2, '0');
        const roll = 104 + (i * 3) + (classIdx * 4);
        
        const feeStatuses = ['Paid', 'Paid', 'Partially Paid', 'Pending', 'Overdue'];
        const feeStatus = feeStatuses[studentCounter % feeStatuses.length];
        const baseFee = 35000 + (standardNum * 1200);
        let paid = baseFee;
        let pending = 0;
        if (feeStatus === 'Partially Paid') {
          paid = Math.round(baseFee * 0.6);
          pending = baseFee - paid;
        } else if (feeStatus === 'Pending' || feeStatus === 'Overdue') {
          paid = Math.round(baseFee * 0.3);
          pending = baseFee - paid;
        }

        const attendancePct = 78 + (studentCounter % 22);
        const presentToday = attendancePct > 80 ? (studentCounter % 9 !== 0) : false;

        students.push({
          id: `STU-${studentCounter}`,
          admissionNo: `GV-202${(studentCounter % 4) + 1}-${studentCounter}`,
          rollNo: String(roll),
          name: fullName,
          gender: isMale ? 'Male' : 'Female',
          dob: `${birthYear}-${birthMonth}-${birthDay}`,
          class: cls,
          section: sec,
          house: houses[studentCounter % houses.length],
          bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-'][studentCounter % 5],
          parent: parentName,
          parentRelation: (studentCounter % 8 === 0) ? 'Mother' : 'Father',
          phone: `+91 ${98400 + (studentCounter % 800)} ${String(10000 + studentCounter).slice(-5)}`,
          parentPhone: `+91 ${98400 + (studentCounter % 800)} ${String(10000 + studentCounter).slice(-5)}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${studentCounter % 99}@example.com`,
          emergencyContact: `+91 94440 ${String(20000 + studentCounter).slice(-5)}`,
          address: `${(studentCounter % 150) + 1}, Gandhi Road, Chennai, Tamil Nadu 6000${(studentCounter % 80) + 10}`,
          avatar: isMale 
            ? `https://images.unsplash.com/photo-${1500000000000 + (studentCounter * 1234567) % 999999999}?auto=format&fit=crop&w=256&q=80`
            : `https://images.unsplash.com/photo-${1540000000000 + (studentCounter * 1234567) % 999999999}?auto=format&fit=crop&w=256&q=80`,
          attendance: attendancePct,
          presentToday,
          feeStatus,
          totalFee: baseFee,
          paidFee: paid,
          pendingFee: pending,
          feeDueDate: '2026-10-15',
          transportOpted: (studentCounter % 3 !== 0),
          busRoute: `Route ${(studentCounter % 8) + 1}`,
          busStop: `Stop ${(studentCounter % 12) + 1}`,
          marks: [
            { subject: 'English', maxMarks: 100, obtainedMarks: 75 + (studentCounter % 25), grade: 'A', exam: 'Quarterly Examination 2026' },
            { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 70 + (studentCounter % 30), grade: 'A', exam: 'Quarterly Examination 2026' },
            { subject: 'Science', maxMarks: 100, obtainedMarks: 72 + (studentCounter % 26), grade: 'B+', exam: 'Quarterly Examination 2026' }
          ],
          homework: [
            { id: `HW-${studentCounter}-1`, subject: 'Mathematics', title: 'Chapter Practice Problems', assignedDate: '2026-09-20', dueDate: '2026-09-25', status: (studentCounter % 2 === 0) ? 'Completed' : 'Pending' }
          ],
          documents: [
            { name: 'Birth Certificate', status: 'Verified', date: '15 Jun 2024' },
            { name: 'Aadhaar Card Copy', status: 'Verified', date: '15 Jun 2024' }
          ],
          paymentHistory: [
            { receiptNo: `REC-2026-${7000 + studentCounter}`, date: '2026-06-15', amount: paid, type: 'Tuition Fee Instalment', method: 'UPI', status: 'Success' }
          ]
        });

        studentCounter++;
      }
    });
  });

  return students;
}
