import { initialHomework } from '../data/mockHomework';

const HOMEWORK_KEY = 'edusphere_homework';

export const homeworkService = {
  getHomework() {
    const data = localStorage.getItem(HOMEWORK_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(HOMEWORK_KEY, JSON.stringify(initialHomework));
    return initialHomework;
  },

  addHomework(hwData) {
    const all = this.getHomework();
    const newHw = {
      id: `HW-2026-${String(all.length + 101)}`,
      assignedDate: new Date().toISOString().split('T')[0],
      totalStudents: 42,
      submittedCount: 0,
      status: 'Active',
      ...hwData
    };
    const updated = [newHw, ...all];
    localStorage.setItem(HOMEWORK_KEY, JSON.stringify(updated));
    return newHw;
  },

  submitHomework(hwId, studentId) {
    const all = this.getHomework();
    const hw = all.find(h => h.id === hwId);
    if (hw) {
      hw.submittedCount = Math.min(hw.totalStudents, hw.submittedCount + 1);
      localStorage.setItem(HOMEWORK_KEY, JSON.stringify(all));
      return hw;
    }
    return null;
  }
};
