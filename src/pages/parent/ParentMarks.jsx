import React, { useState } from 'react';
import { Award, Printer, AlertTriangle, Sparkles, CheckCircle2, BookOpen, TrendingUp, Compass } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useParentLanguage } from '../../context/ParentLanguageContext';
import { Badge } from '../../components/common/Badge';
import { ReportCardModal } from '../../components/preview/ReportCardModal';

export function ParentMarks() {
  const { selectedChild } = useSchool();
  const { t, lang } = useParentLanguage();

  const child = selectedChild;
  const [reportCardOpen, setReportCardOpen] = useState(false);

  // Subject marks calculation
  const marksList = child?.marks || [];
  const totalMax = marksList.reduce((acc, m) => acc + (m.maxMarks || 100), 0) || 500;
  const totalObtained = marksList.reduce((acc, m) => acc + (m.obtainedMarks || 0), 0) || 457;
  const percentage = Math.round((totalObtained / totalMax) * 1000) / 10;
  const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : percentage >= 35 ? 'C' : 'Fail';
  const rank = child?.classroomRank || 3;

  // Identify lowest scoring subject for "Subjects to Focus On"
  const sortedByMarks = [...marksList].sort((a, b) => (a.obtainedMarks || 0) - (b.obtainedMarks || 0));
  const focusSubject = sortedByMarks[0] || { subject: 'Science', obtainedMarks: 88, maxMarks: 100 };

  // Diagnostic advice customized per child / subject
  const isArun = child?.id === 'STU-1001';
  const diagnosticAdvice = isArun
    ? (lang === 'ta'
        ? 'அறிவியல் பாடத்தில் (இயற்பியல் & வேதியியல்) கணக்கீட்டு சூத்திரங்கள் மற்றும் கதிர் வரைபடங்களில் கூடுதல் கவனம் தேவைப்படுகிறது. வியாழக்கிழமை நடைபெறும் சிறப்பு வழிகாட்டல் வகுப்பில் பங்கேற்க பரிந்துரைக்கப்படுகிறது.'
        : 'Needs focused practice on numerical derivations in Electricity and Ray optics ray-diagram practice. Recommended to attend Thursday remedial sessions.')
    : (lang === 'ta'
        ? 'கணிதப் பாடத்தில் பின்னங்கள் மற்றும் தசம எண்களின் வகுத்தல் கணக்குகளில் கூடுதல் பயிற்சி தேவை. தினசரி 5 மாதிரி வினாக்களை தீர்த்துப் பார்க்க ஆசிரியரால் பரிந்துரைக்கப்படுகிறது.'
        : 'Needs structured practice with fraction conversions, decimal division, and word problems. Recommended to complete 5 daily practice problems.');

  const parentActionPlan = isArun
    ? (lang === 'ta'
        ? '1. தினசரி 15 நிமிடங்கள் சூத்திரங்களை மனனம் செய்தல்.\n2. ஆய்வகப் பதிவேட்டை வாரந்தோறும் சரிபார்த்தல்.\n3. முந்தைய ஆண்டு வினாத்தாள்களை எழுதிப் பழகுதல்.'
        : '1. Review physics and chemistry formulas 15 minutes daily.\n2. Inspect science experiment observation record weekly.\n3. Practice solving previous year board model questions.')
    : (lang === 'ta'
        ? '1. வாய்ப்பாடுகளை (Multiplication tables) தினமும் வாய்விட்டு சொல்லுதல்.\n2. வீட்டுப்பாடக் கணக்குகளை தாமாகவே தீர்க்க ஊக்கப்படுத்துதல்.\n3. பாடப்புத்தக பயிற்சி 3.2 மற்றும் 4.1 கணக்குகளை மீண்டும் செய்தல்.'
        : '1. Supervise 15 minutes of multiplication tables recitation.\n2. Encourage solving chapter exercises 3.2 and 4.1 independently.\n3. Verify completed homework sheets before morning submission.');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('academicTitle', 'Academic Performance & Marksheets')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {child?.name} • {child?.class} ({child?.section}) • {t('examTitle', 'Quarterly Examination 2026')}
          </p>
        </div>

        <button
          onClick={() => setReportCardOpen(true)}
          className="px-5 py-2.5 text-xs sm:text-sm font-extrabold bg-brand-600 hover:bg-brand-700 text-white rounded-2xl shadow-md shadow-brand-500/25 flex items-center gap-2 self-start sm:self-auto cursor-pointer transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>{t('viewReportCard', 'View / Print Report Card')}</span>
        </button>
      </div>

      {/* Academic Highlights Banner: Percentage, Grade, Rank, Total */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
            {t('overallPercentage', 'Overall Percentage')}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {percentage}%
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            Distinction Category
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
            {t('overallGrade', 'Overall Grade')}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {grade}
          </div>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">
            Quarterly Assessment
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
            {t('classroomRank', 'Classroom Rank')}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 mt-1 flex items-center gap-1.5">
            <Award className="w-6 h-6 shrink-0" />
            <span>#{rank}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">
            Out of 42 Students
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
            {t('totalScore', 'Total Score')}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {totalObtained} / {totalMax}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            Passed with High Merit
          </span>
        </div>
      </div>

      {/* "Subjects to Focus On" for Low-Performing Subjects Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 dark:from-amber-950/40 dark:via-slate-900 dark:to-rose-950/30 rounded-3xl border-2 border-amber-300 dark:border-amber-800/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-start sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/60 dark:border-amber-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                {t('focusSubjectIdentified', 'Target Academic Improvement Area')}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {t('subjectsToFocusTitle', 'Subjects to Focus On')}: {focusSubject.subject} ({focusSubject.obtainedMarks} / {focusSubject.maxMarks || 100})
              </h3>
            </div>
          </div>

          <Badge variant="warning" size="md">
            Priority Attention
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Diagnostic Recommendation */}
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{t('focusDiagnosticAdvice', 'Diagnostic Recommendation')}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {diagnosticAdvice}
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400 font-bold">
              {t('remedialSessionSchedule', 'Remedial Support Coaching')}: {t('remedialDetails', 'Every Thursday 03:45 PM – 04:30 PM with subject teacher in Room 204.')}
            </div>
          </div>

          {/* Action Plan for Parents at Home */}
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t('actionPlanForParents', 'Action Plan for Parents at Home')}</span>
            </div>
            <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed font-medium">
              {parentActionPlan}
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Marks Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t('subjectCol', 'Subject-wise')} {t('examTitle', 'Quarterly Examination 2026')}
            </h3>
            <p className="text-xs text-slate-400">
              {child?.name} • Class {child?.class} - {child?.section}
            </p>
          </div>
          <Badge variant="success" size="sm">
            {marksList.length} Subjects Evaluated
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 font-extrabold text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">{t('subjectCol', 'Subject')}</th>
                <th className="py-3 px-3 text-center">{t('maxMarksCol', 'Max Marks')}</th>
                <th className="py-3 px-3 text-center">{t('obtainedMarksCol', 'Marks Scored')}</th>
                <th className="py-3 px-3 text-center">{t('gradeCol', 'Grade')}</th>
                <th className="py-3 px-3 text-right">{t('resultCol', 'Result')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {marksList.map((m) => {
                const isFocus = m.subject === focusSubject.subject;
                return (
                  <tr
                    key={m.subject}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                      isFocus ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{m.subject}</span>
                      {isFocus && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold border border-amber-300 dark:border-amber-800">
                          Focus Area
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-400 font-medium">
                      {m.maxMarks || 100}
                    </td>
                    <td className="py-3 px-3 text-center font-extrabold text-sm text-slate-900 dark:text-white">
                      {m.obtainedMarks}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Badge variant={m.grade === 'A+' ? 'success' : m.grade === 'A' ? 'info' : 'warning'} size="sm">
                        {m.grade}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                      {t('passBadge', 'Pass')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Report Card Modal */}
      <ReportCardModal
        isOpen={reportCardOpen}
        onClose={() => setReportCardOpen(false)}
        reportData={{
          name: child?.name,
          rollNo: child?.rollNo,
          class: child?.class,
          section: child?.section,
          marks: marksList.reduce((acc, curr) => {
            acc[curr.subject] = { max: curr.maxMarks || 100, obtained: curr.obtainedMarks, grade: curr.grade };
            return acc;
          }, {}),
          totalMax,
          totalObtained,
          percentage,
          grade,
          result: 'Pass',
          rank
        }}
      />
    </div>
  );
}
