import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import { AdminLayout } from './components/layout/AdminLayout';
import { TeacherLayout } from './components/layout/TeacherLayout';
import { ParentLayout } from './components/layout/ParentLayout';
import { LibrarianLayout } from './components/layout/LibrarianLayout';
import { AccountantLayout } from './components/layout/AccountantLayout';
import { OfficeLayout } from './components/layout/OfficeLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StudentsPage } from './pages/admin/StudentsPage';
import { StudentDetailPage } from './pages/admin/StudentDetailPage';
import { StaffPage } from './pages/admin/StaffPage';
import { AcademicsPage } from './pages/admin/AcademicsPage';
import { TimetablePage } from './pages/admin/TimetablePage';
import { AttendancePage } from './pages/admin/AttendancePage';
import { FeesPage } from './pages/admin/FeesPage';
import { ExamsPage } from './pages/admin/ExamsPage';
import { HomeworkPage } from './pages/admin/HomeworkPage';
import { LibraryPage } from './pages/admin/LibraryPage';
import { TransportPage } from './pages/admin/TransportPage';
import { InventoryPage } from './pages/admin/InventoryPage';
import { CommunicationPage } from './pages/admin/CommunicationPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { CertificatesPage } from './pages/admin/CertificatesPage';
import { SettingsPage } from './pages/admin/SettingsPage';

// Teacher Portal Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherAttendance } from './pages/teacher/TeacherAttendance';
import { TeacherMarks } from './pages/teacher/TeacherMarks';
import { TeacherClassContent } from './pages/teacher/TeacherClassContent';
import { TeacherHomework } from './pages/teacher/TeacherHomework';
import { TeacherStudents } from './pages/teacher/TeacherStudents';

// Parent Portal Pages
import { ParentDashboard } from './pages/parent/ParentDashboard';
import { ParentAttendance } from './pages/parent/ParentAttendance';
import { ParentFees } from './pages/parent/ParentFees';
import { ParentMarks } from './pages/parent/ParentMarks';
import { ParentHomework } from './pages/parent/ParentHomework';
import { ParentTimetable } from './pages/parent/ParentTimetable';
import { ParentLeave } from './pages/parent/ParentLeave';

// Student Portal Page
import { StudentDashboard } from './pages/student/StudentDashboard';

// Role-specific Portals
import { LibrarianDashboard } from './pages/librarian/LibrarianDashboard';
import { AccountantDashboard } from './pages/accountant/AccountantDashboard';
import { OfficeStaffDashboard } from './pages/office/OfficeStaffDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Portal Nested Routes (Universal Oversight & Overrides) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:id" element={<StudentDetailPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="timetable" element={<TimetablePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="fees" element={<FeesPage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="homework" element={<HomeworkPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="transport" element={<TransportPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="communication" element={<CommunicationPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Teacher Portal Nested Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="marks" element={<TeacherMarks />} />
          <Route path="content" element={<TeacherClassContent />} />
          <Route path="homework" element={<TeacherHomework />} />
          <Route path="students" element={<TeacherStudents />} />
        </Route>

        {/* Parent Portal Nested Routes */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<ParentDashboard />} />
          <Route path="attendance" element={<ParentAttendance />} />
          <Route path="fees" element={<ParentFees />} />
          <Route path="marks" element={<ParentMarks />} />
          <Route path="academic" element={<ParentMarks />} />
          <Route path="homework" element={<ParentHomework />} />
          <Route path="timetable" element={<ParentTimetable />} />
          <Route path="leave" element={<ParentLeave />} />
        </Route>

        {/* Student Portal Route */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* Librarian Portal Nested Routes */}
        <Route path="/librarian" element={<LibrarianLayout />}>
          <Route index element={<LibrarianDashboard />} />
        </Route>

        {/* Accountant Portal Nested Routes */}
        <Route path="/accountant" element={<AccountantLayout />}>
          <Route index element={<AccountantDashboard />} />
        </Route>

        {/* Office Staff Portal Nested Routes */}
        <Route path="/office" element={<OfficeLayout />}>
          <Route index element={<OfficeStaffDashboard />} />
        </Route>

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
