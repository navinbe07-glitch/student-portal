export const initialAnnouncements = [
  {
    id: 'ANC-2026-01',
    title: 'Parent-Teacher Meeting (PTM) for Term 1 Review',
    content: 'Dear Parents, the Parent-Teacher Meeting for evaluating the Quarterly Examination performance will be held on Saturday, 26th September 2026, from 09:00 AM to 01:00 PM. Parents are requested to adhere to their designated time slots.',
    targetAudience: 'Parents',
    targetClass: 'All Classes (1st to 12th)',
    publishedDate: '2026-09-21',
    author: 'Principal Office',
    priority: 'High',
    attachmentName: 'PTM_Schedule_Slot_Matrix.pdf'
  },
  {
    id: 'ANC-2026-02',
    title: 'Annual Sports Day 2026 - Registration Open',
    content: 'Inter-house athletic trials for Ruby, Emerald, Sapphire, and Topaz houses commence next Monday on the main school ground. House captains should submit participant rosters by Friday.',
    targetAudience: 'All School',
    targetClass: 'All Classes',
    publishedDate: '2026-09-18',
    author: 'Physical Education Dept',
    priority: 'Normal',
    attachmentName: 'Sports_Day_Events_List.pdf'
  },
  {
    id: 'ANC-2026-03',
    title: 'Science Olympiad & National Talent Search Examination (NTSE)',
    content: 'Students of classes 9th and 10th interested in participating in the Science Olympiad should submit the registration form and fee to Mr. R. Parthiban before 30th September.',
    targetAudience: 'Specific Class',
    targetClass: '10th Standard',
    publishedDate: '2026-09-16',
    author: 'Science Department',
    priority: 'Normal',
    attachmentName: null
  },
  {
    id: 'ANC-2026-04',
    title: 'School Holiday Notice - Gandhi Jayanti',
    content: 'The school will remain closed on Friday, 2nd October 2026 on the occasion of Gandhi Jayanti. Regular classes will resume on Monday, 5th October.',
    targetAudience: 'All School',
    targetClass: 'All Classes',
    publishedDate: '2026-09-14',
    author: 'Administration',
    priority: 'Low',
    attachmentName: null
  }
];

export const initialNotifications = [
  {
    id: 'NOTIF-01',
    title: 'Term 2 Fee Reminder',
    message: 'Pending fee notice: ₹5,000 due for Arun Kumar (Class 10-A). Due date is 15th October 2026.',
    category: 'Fees',
    time: '10 minutes ago',
    timestamp: '2026-09-22T10:15:00',
    unread: true,
    link: '/parent/fees',
    forRoles: ['Parent', 'Admin', 'Super Admin']
  },
  {
    id: 'NOTIF-02',
    title: 'New Mathematics Homework',
    message: 'Mrs. Revathi Ramanathan assigned: Trigonometry & Quadratic Identities. Due on 25 Sep 2026.',
    category: 'Homework',
    time: '1 hour ago',
    timestamp: '2026-09-22T09:30:00',
    unread: true,
    link: '/parent/homework',
    forRoles: ['Parent', 'Student', 'Teacher']
  },
  {
    id: 'NOTIF-03',
    title: 'Parent-Teacher Meeting Announcement',
    message: 'Term 1 PTM scheduled for Saturday, 26th September from 9:00 AM to 1:00 PM.',
    category: 'Announcements',
    time: 'Yesterday',
    timestamp: '2026-09-21T14:00:00',
    unread: false,
    link: '/parent',
    forRoles: ['Parent', 'Teacher', 'Admin']
  },
  {
    id: 'NOTIF-04',
    title: 'Quarterly Examination Marks Published',
    message: 'Quarterly Exam marksheets for Class 10th Standard are now available for review.',
    category: 'Exams',
    time: '2 days ago',
    timestamp: '2026-09-20T11:00:00',
    unread: false,
    link: '/parent/marks',
    forRoles: ['Parent', 'Student', 'Admin', 'Teacher']
  },
  {
    id: 'NOTIF-05',
    title: 'Daily Attendance Marked',
    message: 'Class 10-A attendance for today has been marked by Mrs. Revathi Ramanathan.',
    category: 'Attendance',
    time: '3 hours ago',
    timestamp: '2026-09-22T08:50:00',
    unread: true,
    link: '/admin/attendance',
    forRoles: ['Admin', 'Teacher']
  }
];
