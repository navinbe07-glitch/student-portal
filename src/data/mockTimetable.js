export const initialTimetable = {
  periods: [
    { period: 1, time: '08:45 – 09:30', type: 'class' },
    { period: 2, time: '09:30 – 10:15', type: 'class' },
    { period: 3, time: '10:15 – 11:00', type: 'class' },
    { period: 'Break', time: '11:00 – 11:15', type: 'break', label: 'Morning Tea / Refreshment' },
    { period: 4, time: '11:15 – 12:00', type: 'class' },
    { period: 5, time: '12:00 – 12:45', type: 'class' },
    { period: 'Lunch', time: '12:45 – 01:30', type: 'break', label: 'Lunch Break' },
    { period: 6, time: '01:30 – 02:15', type: 'class' },
    { period: 7, time: '02:15 – 03:00', type: 'class' },
    { period: 8, time: '03:00 – 03:45', type: 'class' }
  ],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  // Default weekly matrix for 10th Standard - Section A (Arun Kumar's class)
  '10th Standard-A': {
    Monday: [
      { period: 1, subject: 'Mathematics', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 2, subject: 'English', teacher: 'Mrs. Malini Jayaram', room: 'Room 204', color: 'blue' },
      { period: 3, subject: 'Science (Physics)', teacher: 'Mr. R. Parthiban', room: 'Physics Lab', color: 'emerald' },
      { period: 4, subject: 'Tamil', teacher: 'Mr. G. Muthukumar', room: 'Room 204', color: 'amber' },
      { period: 5, subject: 'Computer Science', teacher: 'Mrs. Jayalakshmi S.', room: 'Computer Lab 1', color: 'purple' },
      { period: 6, subject: 'Social Science', teacher: 'Mrs. Sunita Venkat', room: 'Room 204', color: 'rose' },
      { period: 7, subject: 'Science (Chemistry)', teacher: 'Mr. R. Parthiban', room: 'Chemistry Lab', color: 'emerald' },
      { period: 8, subject: 'Physical Education / Games', teacher: 'Mr. S. Annamalai', room: 'School Ground', color: 'teal' }
    ],
    Tuesday: [
      { period: 1, subject: 'Tamil', teacher: 'Mr. G. Muthukumar', room: 'Room 204', color: 'amber' },
      { period: 2, subject: 'Mathematics', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 3, subject: 'Social Science', teacher: 'Mrs. Sunita Venkat', room: 'Room 204', color: 'rose' },
      { period: 4, subject: 'English', teacher: 'Mrs. Malini Jayaram', room: 'Room 204', color: 'blue' },
      { period: 5, subject: 'Science (Biology)', teacher: 'Mr. R. Parthiban', room: 'Bio Lab', color: 'emerald' },
      { period: 6, subject: 'Mathematics Problem Solving', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 7, subject: 'Library & Reading', teacher: 'Mrs. Shakuntala Devi', room: 'Central Library', color: 'cyan' },
      { period: 8, subject: 'Value Education & Moral Sci', teacher: 'Dr. K. Sivasankaran', room: 'Auditorium', color: 'sky' }
    ],
    Wednesday: [
      { period: 1, subject: 'Science (Chemistry)', teacher: 'Mr. R. Parthiban', room: 'Chemistry Lab', color: 'emerald' },
      { period: 2, subject: 'Mathematics', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 3, subject: 'English Grammar', teacher: 'Mrs. Malini Jayaram', room: 'Room 204', color: 'blue' },
      { period: 4, subject: 'Tamil Literature', teacher: 'Mr. G. Muthukumar', room: 'Room 204', color: 'amber' },
      { period: 5, subject: 'Computer Science Lab', teacher: 'Mrs. Jayalakshmi S.', room: 'Computer Lab 1', color: 'purple' },
      { period: 6, subject: 'Computer Science Lab', teacher: 'Mrs. Jayalakshmi S.', room: 'Computer Lab 1', color: 'purple' },
      { period: 7, subject: 'Social Science (Civics)', teacher: 'Mrs. Sunita Venkat', room: 'Room 204', color: 'rose' },
      { period: 8, subject: 'Yoga & Meditation', teacher: 'Mr. S. Annamalai', room: 'Activity Hall', color: 'teal' }
    ],
    Thursday: [
      { period: 1, subject: 'English', teacher: 'Mrs. Malini Jayaram', room: 'Room 204', color: 'blue' },
      { period: 2, subject: 'Tamil', teacher: 'Mr. G. Muthukumar', room: 'Room 204', color: 'amber' },
      { period: 3, subject: 'Mathematics', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 4, subject: 'Science (Physics)', teacher: 'Mr. R. Parthiban', room: 'Room 204', color: 'emerald' },
      { period: 5, subject: 'Social Science (Geography)', teacher: 'Mrs. Sunita Venkat', room: 'Room 204', color: 'rose' },
      { period: 6, subject: 'Mathematics Revision', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 7, subject: 'Art & SUPW', teacher: 'Mrs. Shanthi Mohan', room: 'Art Studio', color: 'pink' },
      { period: 8, subject: 'Club Activities (Science/Robotics)', teacher: 'Mr. R. Parthiban', room: 'STEM Lab', color: 'violet' }
    ],
    Friday: [
      { period: 1, subject: 'Mathematics Test / Practice', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 2, subject: 'Science', teacher: 'Mr. R. Parthiban', room: 'Room 204', color: 'emerald' },
      { period: 3, subject: 'English Communication & Debate', teacher: 'Mrs. Malini Jayaram', room: 'AV Hall', color: 'blue' },
      { period: 4, subject: 'Tamil', teacher: 'Mr. G. Muthukumar', room: 'Room 204', color: 'amber' },
      { period: 5, subject: 'Social Science', teacher: 'Mrs. Sunita Venkat', room: 'Room 204', color: 'rose' },
      { period: 6, subject: 'Career Guidance & Counseling', teacher: 'Mrs. Deepa Rajendran', room: 'Seminar Hall', color: 'cyan' },
      { period: 7, subject: 'Sports & Games', teacher: 'Mr. S. Annamalai', room: 'School Ground', color: 'teal' },
      { period: 8, subject: 'Sports & Games', teacher: 'Mr. S. Annamalai', room: 'School Ground', color: 'teal' }
    ],
    Saturday: [
      { period: 1, subject: 'Special Mathematics Coaching', teacher: 'Mrs. Revathi Ramanathan', room: 'Room 204', color: 'indigo' },
      { period: 2, subject: 'Science Practical Revision', teacher: 'Mr. R. Parthiban', room: 'Physics Lab', color: 'emerald' },
      { period: 3, subject: 'Robotics & STEM Workshop', teacher: 'Mr. R. Parthiban', room: 'STEM Lab', color: 'violet' },
      { period: 4, subject: 'Library & Reading Hour', teacher: 'Mrs. Shakuntala Devi', room: 'Central Library', color: 'cyan' },
      { period: 5, subject: 'Inter-House Sports Practice', teacher: 'Mr. S. Annamalai', room: 'School Ground', color: 'teal' }
    ]
  },
  // Default weekly matrix for 6th Standard - Section B (Ananya Kumar's class)
  '6th Standard-B': {
    Monday: [
      { period: 1, subject: 'Science', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'emerald' },
      { period: 2, subject: 'Mathematics', teacher: 'Mr. K. Narayanan', room: 'Room 102', color: 'indigo' },
      { period: 3, subject: 'Tamil', teacher: 'Mr. G. Muthukumar', room: 'Room 102', color: 'amber' },
      { period: 4, subject: 'English', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'blue' },
      { period: 5, subject: 'Social Studies', teacher: 'Mrs. Sunita Venkat', room: 'Room 102', color: 'rose' },
      { period: 6, subject: 'Computer Basics', teacher: 'Mrs. Jayalakshmi S.', room: 'Computer Lab 2', color: 'purple' },
      { period: 7, subject: 'Games & Physical Ed', teacher: 'Mr. S. Annamalai', room: 'Playground', color: 'teal' },
      { period: 8, subject: 'Storytelling & Reading', teacher: 'Mrs. Shakuntala Devi', room: 'Library', color: 'cyan' }
    ],
    Tuesday: [
      { period: 1, subject: 'English', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'blue' },
      { period: 2, subject: 'Science', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'emerald' },
      { period: 3, subject: 'Mathematics', teacher: 'Mr. K. Narayanan', room: 'Room 102', color: 'indigo' },
      { period: 4, subject: 'Social Studies', teacher: 'Mrs. Sunita Venkat', room: 'Room 102', color: 'rose' },
      { period: 5, subject: 'Tamil', teacher: 'Mr. G. Muthukumar', room: 'Room 102', color: 'amber' },
      { period: 6, subject: 'Art & Craft', teacher: 'Mrs. Shanthi Mohan', room: 'Art Room', color: 'pink' },
      { period: 7, subject: 'Music & Chants', teacher: 'Mrs. Radhika S.', room: 'Music Room', color: 'violet' },
      { period: 8, subject: 'Value Education', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'sky' }
    ],
    Wednesday: [
      { period: 1, subject: 'Mathematics', teacher: 'Mr. K. Narayanan', room: 'Room 102', color: 'indigo' },
      { period: 2, subject: 'Tamil', teacher: 'Mr. G. Muthukumar', room: 'Room 102', color: 'amber' },
      { period: 3, subject: 'Science Experiment', teacher: 'Mrs. Malathi Natarajan', room: 'Junior Science Lab', color: 'emerald' },
      { period: 4, subject: 'English Grammar', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'blue' },
      { period: 5, subject: 'Social Studies', teacher: 'Mrs. Sunita Venkat', room: 'Room 102', color: 'rose' },
      { period: 6, subject: 'Yoga & Aerobics', teacher: 'Mr. S. Annamalai', room: 'Activity Hall', color: 'teal' },
      { period: 7, subject: 'Computer Lab Practice', teacher: 'Mrs. Jayalakshmi S.', room: 'Computer Lab 2', color: 'purple' },
      { period: 8, subject: 'Homework Assistance', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'indigo' }
    ],
    Thursday: [
      { period: 1, subject: 'Tamil Literature', teacher: 'Mr. G. Muthukumar', room: 'Room 102', color: 'amber' },
      { period: 2, subject: 'English Reading', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'blue' },
      { period: 3, subject: 'Mathematics Practice', teacher: 'Mr. K. Narayanan', room: 'Room 102', color: 'indigo' },
      { period: 4, subject: 'Science', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'emerald' },
      { period: 5, subject: 'General Knowledge & Quiz', teacher: 'Mrs. Sunita Venkat', room: 'Room 102', color: 'rose' },
      { period: 6, subject: 'Library Hour', teacher: 'Mrs. Shakuntala Devi', room: 'Central Library', color: 'cyan' },
      { period: 7, subject: 'Clay Modeling & SUPW', teacher: 'Mrs. Shanthi Mohan', room: 'Art Room', color: 'pink' },
      { period: 8, subject: 'Physical Training', teacher: 'Mr. S. Annamalai', room: 'Playground', color: 'teal' }
    ],
    Friday: [
      { period: 1, subject: 'Mathematics Quiz', teacher: 'Mr. K. Narayanan', room: 'Room 102', color: 'indigo' },
      { period: 2, subject: 'Science Project Work', teacher: 'Mrs. Malathi Natarajan', room: 'Junior Science Lab', color: 'emerald' },
      { period: 3, subject: 'English Recitation', teacher: 'Mrs. Malathi Natarajan', room: 'Room 102', color: 'blue' },
      { period: 4, subject: 'Social Studies', teacher: 'Mrs. Sunita Venkat', room: 'Room 102', color: 'rose' },
      { period: 5, subject: 'Tamil Dictation', teacher: 'Mr. G. Muthukumar', room: 'Room 102', color: 'amber' },
      { period: 6, subject: 'Audio-Visual Smart Class', teacher: 'Mrs. Malathi Natarajan', room: 'AV Room', color: 'purple' },
      { period: 7, subject: 'Outdoor Sports / Games', teacher: 'Mr. S. Annamalai', room: 'Playground', color: 'teal' },
      { period: 8, subject: 'Weekly Assembly & Values', teacher: 'Dr. K. Sivasankaran', room: 'Auditorium', color: 'sky' }
    ],
    Saturday: [
      { period: 1, subject: 'Mathematics Olympiad Practice', teacher: 'Mr. K. Narayanan', room: 'Room 102', color: 'indigo' },
      { period: 2, subject: 'Spoken English & Elocution', teacher: 'Mrs. Malathi Natarajan', room: 'AV Hall', color: 'blue' },
      { period: 3, subject: 'Junior Science Club', teacher: 'Mrs. Malathi Natarajan', room: 'Junior Science Lab', color: 'emerald' },
      { period: 4, subject: 'Drawing, Painting & Crafts', teacher: 'Mrs. Shanthi Mohan', room: 'Art Studio', color: 'pink' },
      { period: 5, subject: 'Karate & Self Defense', teacher: 'Master K. Velu', room: 'Activity Hall', color: 'teal' }
    ]
  }
};
