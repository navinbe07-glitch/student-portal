import { initialStaff } from '../data/mockStaff';

const STAFF_KEY = 'edusphere_staff';

export const staffService = {
  getStaff() {
    const data = localStorage.getItem(STAFF_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(STAFF_KEY, JSON.stringify(initialStaff));
    return initialStaff;
  },

  getStaffById(id) {
    const staff = this.getStaff();
    return staff.find(s => s.id === id) || null;
  },

  addStaff(staffMember) {
    const staff = this.getStaff();
    const newStaff = {
      id: `EMP-${1000 + staff.length + 1}`,
      status: 'Active',
      attendance: 100,
      avatar: staffMember.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
      ...staffMember
    };
    const updated = [newStaff, ...staff];
    localStorage.setItem(STAFF_KEY, JSON.stringify(updated));
    return newStaff;
  }
};
