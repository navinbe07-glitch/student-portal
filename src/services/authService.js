export const DEMO_ROLES = {
  SUPER_ADMIN: {
    id: 'USR-ADMIN-01',
    name: 'Dr. K. Sivasankaran',
    role: 'Super Admin',
    roleKey: 'admin',
    email: 'admin@greenvalleyschool.edu.in',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    title: 'Principal & Super Admin'
  },
  SCHOOL_ADMIN: {
    id: 'USR-ADMIN-02',
    name: 'Mrs. Deepa Rajendran',
    role: 'School Admin',
    roleKey: 'admin',
    email: 'deepa.admin@greenvalleyschool.edu.in',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&q=80',
    title: 'Admissions & Academic Coordinator'
  },
  TEACHER: {
    id: 'USR-TEA-01',
    name: 'Mrs. Revathi Ramanathan',
    role: 'Teacher',
    roleKey: 'teacher',
    email: 'revathi.math@greenvalleyschool.edu.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    title: 'PGT Mathematics & 10-A Class Teacher'
  },
  PARENT: {
    id: 'USR-PAR-01',
    name: 'Mr. Ramesh Kumar',
    role: 'Parent',
    roleKey: 'parent',
    email: 'ramesh.kumar@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    title: 'Parent of Arun Kumar (10-A)',
    studentId: 'STU-1001'
  },
  STUDENT: {
    id: 'USR-STU-01',
    name: 'Arun Kumar',
    role: 'Student',
    roleKey: 'student',
    email: 'arun.kumar@greenvalleyschool.edu.in',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    title: 'Class 10-A • Roll No. 101',
    studentId: 'STU-1001'
  },
  ACCOUNTANT: {
    id: 'USR-ACC-01',
    name: 'Mr. V. Sundaresan',
    role: 'Accountant',
    roleKey: 'accountant',
    email: 'accounts@greenvalleyschool.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    title: 'Senior Bursar & Chief Accountant'
  },
  LIBRARIAN: {
    id: 'USR-LIB-01',
    name: 'Mrs. Shakuntala Devi',
    role: 'Librarian',
    roleKey: 'librarian',
    email: 'library@greenvalleyschool.edu.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    title: 'Chief Information & Library Officer'
  },
  OFFICE_STAFF: {
    id: 'USR-OFF-01',
    name: 'Mr. R. Parthasarathy',
    role: 'Office Staff',
    roleKey: 'office',
    email: 'office@greenvalleyschool.edu.in',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    title: 'Senior Administrative & Admissions Officer'
  }
};

export const authService = {
  getCurrentUser() {
    const stored = localStorage.getItem('edusphere_auth');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    return DEMO_ROLES.SUPER_ADMIN; // Default demo login
  },

  setCurrentUser(user) {
    localStorage.setItem('edusphere_auth', JSON.stringify(user));
  },

  loginWithRole(roleType) {
    const roleKeyMap = {
      'Super Admin': DEMO_ROLES.SUPER_ADMIN,
      'School Admin': DEMO_ROLES.SCHOOL_ADMIN,
      'Teacher': DEMO_ROLES.TEACHER,
      'Parent': DEMO_ROLES.PARENT,
      'Student': DEMO_ROLES.STUDENT,
      'Accountant': DEMO_ROLES.ACCOUNTANT,
      'Librarian': DEMO_ROLES.LIBRARIAN,
      'Office Staff': DEMO_ROLES.OFFICE_STAFF,
      'admin': DEMO_ROLES.SUPER_ADMIN,
      'teacher': DEMO_ROLES.TEACHER,
      'parent': DEMO_ROLES.PARENT,
      'student': DEMO_ROLES.STUDENT,
      'accountant': DEMO_ROLES.ACCOUNTANT,
      'librarian': DEMO_ROLES.LIBRARIAN,
      'office': DEMO_ROLES.OFFICE_STAFF
    };

    const user = roleKeyMap[roleType] || DEMO_ROLES.SUPER_ADMIN;
    this.setCurrentUser(user);
    return user;
  },

  logout() {
    localStorage.removeItem('edusphere_auth');
  }
};
