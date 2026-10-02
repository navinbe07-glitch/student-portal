import React, { createContext, useContext, useState, useEffect } from 'react';

const ParentLanguageContext = createContext();

const translations = {
  en: {
    // Topbar & Nav
    portalTitle: 'Parent Portal',
    goodMorning: 'Good Morning',
    todayIs: 'Today is',
    activeStudent: 'Active Child',
    switchChild: 'Switch Child',
    rollNo: 'Roll',
    class: 'Class',
    section: 'Section',
    adminView: 'Admin View',
    logout: 'Logout',
    languageName: 'English',

    // Floating Nav Tabs
    navHome: 'Home',
    navAttendance: 'Attendance',
    navFees: 'Fees',
    navAcademic: 'Academic',

    // Home Tab
    welcomeParent: 'Welcome, Mr. Ramesh Kumar',
    pendingFeesDue: 'Pending Tuition & Lab Fee',
    dueBy: 'Due by',
    payFees: 'Pay Fees',
    payNow: 'Pay Now',
    allFeesPaid: 'All Fees Cleared',
    noDuesTitle: 'Nil Dues • Fully Settled',
    noDuesSubtitle: 'All term fees paid and verified by accounts office.',
    tuitionNotice: 'Term installments are due. Instant online UPI / card payment available.',
    
    todaySchedule: "Today's Class Schedule",
    weeklyTimetable: 'Monday – Saturday Timetable',
    timetableSubtitle: 'Curriculum & subject teacher schedule',
    classTeacher: 'Class Teacher',
    contactTeacher: 'Call Teacher',
    callNow: 'Call Now',
    classGroupWhatsApp: 'Class Parents WhatsApp Group',
    joinWhatsApp: 'Join Class WhatsApp Group',
    whatsappTooltip: 'Official WhatsApp group for announcements & parent discussions',
    period: 'Period',
    subject: 'Subject',
    teacher: 'Teacher',
    room: 'Room',
    time: 'Time',
    dayMonday: 'Monday',
    dayTuesday: 'Tuesday',
    dayWednesday: 'Wednesday',
    dayThursday: 'Thursday',
    dayFriday: 'Friday',
    daySaturday: 'Saturday',

    // Quick Stats
    statAttendance: 'Attendance',
    statAttendanceSub: 'Present Today: Yes',
    statFeeDue: 'Fee Due',
    statFeeDueSub: 'Due by 15 Oct 2026',
    statHomework: 'Homework',
    statHomeworkSub: 'Pending assignments',
    statNextExam: 'Next Exam',
    statNextExamSub: 'Half-Yearly Examination',

    // Attendance Tab
    attendanceTitle: 'Child Attendance Tracker',
    attendanceSubtitle: 'Comprehensive presence record and monthly breakdown',
    overallAttendance: 'Overall Attendance',
    goodStanding: 'Good Standing (Eligible for Exams)',
    needsAttention: 'Attendance below 75% threshold',
    statOverallPct: 'Overall %',
    statPresentDays: 'Present',
    statAbsentDays: 'Absent',
    statLeaveDays: 'Leave',
    daysUnit: 'Days',
    monthlyLogTitle: 'Monthly Attendance Log',
    attendanceTrendTitle: 'Monthly Attendance Percentage Trend',
    presentLegend: 'Present',
    absentLegend: 'Absent',
    leaveLegend: 'Leave',
    offLegend: 'Weekend / Off',
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',

    // Fees Tab
    feesTitle: 'Fee Dues & Online Payments',
    feesSubtitle: 'Transparent fee structures, online checkout & instant receipts',
    payPendingFees: 'Pay Pending Fees',
    totalAnnualFee: 'Total Prescribed Fee',
    totalPaidFee: 'Total Paid to Date',
    pendingOutstanding: 'Pending Outstanding Dues',
    feeDueDateLabel: 'Due Date',
    feeTuitionSubtitle: 'Tuition, Lab & Smart Classroom',
    feeVerifiedSubtitle: 'Verified by Accounts Department',
    paymentHistoryTitle: 'Payment History & Official Receipts',
    downloadReceipt: 'Download Receipt',
    downloadAllReceipts: 'Download All Receipts',
    receiptNo: 'Receipt No',
    date: 'Date',
    feeParticulars: 'Fee Particulars',
    paymentMode: 'Payment Method',
    amount: 'Amount',
    status: 'Status',
    statusSuccess: 'Success',
    sampleTransactionNote: 'Recent verified transactions recorded in school ERP',

    // Academic Tab
    academicTitle: 'Academic Performance & Marksheets',
    academicSubtitle: 'Quarterly examination scores, grades and personalized focus plan',
    viewReportCard: 'View / Print Report Card',
    examTitle: 'Quarterly Examination 2026 Marksheet',
    subjectCol: 'Subject',
    maxMarksCol: 'Max Marks',
    obtainedMarksCol: 'Marks Scored',
    gradeCol: 'Grade',
    resultCol: 'Result',
    passBadge: 'Pass',
    overallPercentage: 'Overall Percentage',
    overallGrade: 'Overall Grade',
    classroomRank: 'Classroom Rank',
    totalScore: 'Total Score',
    subjectsToFocusTitle: 'Subjects to Focus On',
    focusSubjectIdentified: 'Target Academic Improvement Area',
    focusDiagnosticAdvice: 'Diagnostic Recommendation',
    actionPlanForParents: 'Action Plan for Parents at Home',
    remedialSessionSchedule: 'Remedial Support Coaching',
    remedialDetails: 'Every Thursday 03:45 PM – 04:30 PM with subject teacher in Room 204.',
    
    // Receipt Modal
    consolidatedReceiptsTitle: 'Consolidated Payment Receipts Statement',
    institutionName: 'Green Valley Matriculation Higher Secondary School',
    academicYearLabel: 'Academic Year',
    studentNameLabel: 'Student Name',
    close: 'Close',
    print: 'Print Statement'
  },
  ta: {
    // Topbar & Nav
    portalTitle: 'பெற்றோர் தளம்',
    goodMorning: 'காலை வணக்கம்',
    todayIs: 'இன்று',
    activeStudent: 'செயலில் உள்ள மாணவர்',
    switchChild: 'மாணவரை மாற்றவும்',
    rollNo: 'வரிசை எண்',
    class: 'வகுப்பு',
    section: 'பிரிவு',
    adminView: 'நிர்வாகி பார்வை',
    logout: 'வெளியேறு',
    languageName: 'தமிழ்',

    // Floating Nav Tabs
    navHome: 'முகப்பு',
    navAttendance: 'வருகை',
    navFees: 'கட்டணம்',
    navAcademic: 'கல்வி',

    // Home Tab
    welcomeParent: 'வணக்கம், திரு. ரமேஷ் குமார்',
    pendingFeesDue: 'நிலுவை கல்விக் கட்டணம் & ஆய்வகம்',
    dueBy: 'செலுத்த வேண்டிய இறுதித் தேதி',
    payFees: 'கட்டணம் செலுத்தவும்',
    payNow: 'இப்போது செலுத்தவும்',
    allFeesPaid: 'அனைத்துக் கட்டணங்களும் செலுத்தப்பட்டன',
    noDuesTitle: 'நிலுவை இல்லை • முழுமையாக செலுத்தப்பட்டது',
    noDuesSubtitle: 'அனைத்து தவணைக் கட்டணங்களும் செலுத்தப்பட்டு கணக்கு அலுவலகத்தால் சரிபார்க்கப்பட்டது.',
    tuitionNotice: 'பருவக் கட்டணத் தவணை செலுத்த வேண்டும். இணையவழி UPI / கார்டு செலுத்துகை வசதி உள்ளது.',
    
    todaySchedule: 'இன்றைய பாடவேளை அட்டவணை',
    weeklyTimetable: 'திங்கள் முதல் சனி வரையிலான பாடவேளை அட்டவணை',
    timetableSubtitle: 'பாடத்திட்டம் மற்றும் பாட ஆசிரியர்களின் நேரம்',
    classTeacher: 'வகுப்பு ஆசிரியர்',
    contactTeacher: 'ஆசிரியரை அழைக்கவும்',
    callNow: 'அழைக்கவும்',
    classGroupWhatsApp: 'வகுப்பு பெற்றோர் வாட்ஸ்அப் குழு',
    joinWhatsApp: 'வகுப்பு வாட்ஸ்அப் குழுவில் இணையுங்கள்',
    whatsappTooltip: 'அறிவிப்புகள் மற்றும் பெற்றோர் ஆலோசனைகளுக்கான அதிகாரப்பூர்வ வாட்ஸ்அப் குழு',
    period: 'வேளை',
    subject: 'பாடம்',
    teacher: 'ஆசிரியர்',
    room: 'அறை',
    time: 'நேரம்',
    dayMonday: 'திங்கள்',
    dayTuesday: 'செவ்வாய்',
    dayWednesday: 'புதன்',
    dayThursday: 'வியாழன்',
    dayFriday: 'வெள்ளி',
    daySaturday: 'சனி',

    // Quick Stats
    statAttendance: 'வருகை சதவீதம்',
    statAttendanceSub: 'இன்றைய வருகை: உண்டு',
    statFeeDue: 'கட்டண நிலுவை',
    statFeeDueSub: '15 அக்டோபர் 2026-க்குள்',
    statHomework: 'வீட்டுப்பாடம்',
    statHomeworkSub: 'நிலுவையிலுள்ள பணிகள்',
    statNextExam: 'அடுத்த தேர்வு',
    statNextExamSub: 'அரை ஆண்டுப் பொதுத்தேர்வு',

    // Attendance Tab
    attendanceTitle: 'மாணவர் வருகை கண்காணிப்பு',
    attendanceSubtitle: 'முழுமையான வருகைப் பதிவு மற்றும் மாதாந்திர விபரம்',
    overallAttendance: 'ஒட்டுமொத்த வருகை',
    goodStanding: 'சிறந்த நிலை (தேர்வெழுத தகுதி பெற்றது)',
    needsAttention: 'வருகை 75%-க்கும் குறைவாக உள்ளது',
    statOverallPct: 'ஒட்டுமொத்த %',
    statPresentDays: 'வந்த நாட்கள்',
    statAbsentDays: 'வராத நாட்கள்',
    statLeaveDays: 'விடுமுறை நாட்கள்',
    daysUnit: 'நாட்கள்',
    monthlyLogTitle: 'மாதாந்திர வருகைப் பதிவு',
    attendanceTrendTitle: 'மாதாந்திர வருகை சதவீத வரைபடம்',
    presentLegend: 'வருகை (Present)',
    absentLegend: 'வராதது (Absent)',
    leaveLegend: 'விடுப்பு (Leave)',
    offLegend: 'வார விடுமுறை (Holiday)',
    mon: 'திங்கள்', tue: 'செவ்வாய்', wed: 'புதன்', thu: 'வியாழன்', fri: 'வெள்ளி', sat: 'சனி', sun: 'ஞாயிறு',

    // Fees Tab
    feesTitle: 'கட்டண விபரம் & இணையவழி செலுத்துகை',
    feesSubtitle: 'தெளிவான கட்டண அமைப்பு, உடனடி இணையவழி ரசீதுகள்',
    payPendingFees: 'நிலுவைக் கட்டணத்தைச் செலுத்தவும்',
    totalAnnualFee: 'மொத்த ஆண்டுக் கட்டணம்',
    totalPaidFee: 'செலுத்தப்பட்ட தொகை',
    pendingOutstanding: 'செலுத்த வேண்டிய நிலுவைத் தொகை',
    feeDueDateLabel: 'இறுதித் தேதி',
    feeTuitionSubtitle: 'கல்விக் கட்டணம், ஆய்வகம் & திறன் வகுப்பறை',
    feeVerifiedSubtitle: 'கணக்கு அலுவலகத்தால் சரிபார்க்கப்பட்டது',
    paymentHistoryTitle: 'கட்டண பரிவர்த்தனை வரலாறு & அதிகாரப்பூர்வ ரசீதுகள்',
    downloadReceipt: 'ரசீதை பதிவிறக்கவும்',
    downloadAllReceipts: 'அனைத்து ரசீதுகளையும் பதிவிறக்கவும்',
    receiptNo: 'ரசீது எண்',
    date: 'தேதி',
    feeParticulars: 'கட்டண விவரம்',
    paymentMode: 'செலுத்திய முறை',
    amount: 'தொகை',
    status: 'நிலை',
    statusSuccess: 'வெற்றி',
    sampleTransactionNote: 'பள்ளி ERP-இல் பதியப்பட்ட சமீபத்திய சரிபார்க்கப்பட்ட கட்டண பரிவர்த்தனைகள்',

    // Academic Tab
    academicTitle: 'கல்வித்திறன் & மதிப்பெண் பட்டியல்',
    academicSubtitle: 'காலாண்டுத் தேர்வு மதிப்பெண்கள், தரம் மற்றும் தனிப்பயன் வழிகாட்டல்',
    viewReportCard: 'மதிப்பெண் பட்டியலைக் காண்க / அச்சிடுக',
    examTitle: 'காலாண்டுத் தேர்வு 2026 மதிப்பெண் பட்டியல்',
    subjectCol: 'பாடம்',
    maxMarksCol: 'அதிகபட்ச மதிப்பெண்',
    obtainedMarksCol: 'பெற்ற மதிப்பெண்',
    gradeCol: 'தரம்',
    resultCol: 'முடிவு',
    passBadge: 'தேர்ச்சி',
    overallPercentage: 'ஒட்டுமொத்த சதவீதம்',
    overallGrade: 'ஒட்டுமொத்த தரம்',
    classroomRank: 'வகுப்பு தரவரிசை',
    totalScore: 'மொத்த மதிப்பெண்',
    subjectsToFocusTitle: 'கூடுதல் கவனம் செலுத்த வேண்டிய பாடங்கள்',
    focusSubjectIdentified: 'மேம்படுத்த வேண்டிய முக்கிய பாடம்',
    focusDiagnosticAdvice: 'ஆசிரியரின் விரிவான வழிகாட்டல்',
    actionPlanForParents: 'பெற்றோருக்கான வீட்டில் பின்பற்ற வேண்டிய செயல்திட்டம்',
    remedialSessionSchedule: 'சிறப்பு வழிகாட்டல் பயிற்சி நேரம்',
    remedialDetails: 'ஒவ்வொரு வியாழக்கிழமையும் மாலை 03:45 முதல் 04:30 வரை அறை எண் 204-இல் நடைபெறும்.',
    
    // Receipt Modal
    consolidatedReceiptsTitle: 'ஒருங்கிணைந்த கட்டண ரசீதுகளின் அறிக்கை',
    institutionName: 'கிரீன் வேலி மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி',
    academicYearLabel: 'கல்வி ஆண்டு',
    studentNameLabel: 'மாணவர் பெயர்',
    close: 'மூடுக',
    print: 'அச்சிடுக'
  }
};

export function ParentLanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('edusphere_parent_lang') || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('edusphere_parent_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ta' : 'en');
  };

  const t = (key, fallback) => {
    if (translations[lang] && translations[lang][key] !== undefined) {
      return translations[lang][key];
    }
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <ParentLanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </ParentLanguageContext.Provider>
  );
}

export function useParentLanguage() {
  const context = useContext(ParentLanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      lang: 'en',
      setLang: () => {},
      toggleLang: () => {},
      t: (key, fallback) => fallback || key
    };
  }
  return context;
}
