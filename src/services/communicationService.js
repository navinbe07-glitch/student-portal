import { initialAnnouncements, initialNotifications } from '../data/mockCommunication';

const ANNOUNCEMENTS_KEY = 'edusphere_announcements';
const NOTIFICATIONS_KEY = 'edusphere_notifications';

export const communicationService = {
  getAnnouncements() {
    const data = localStorage.getItem(ANNOUNCEMENTS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(initialAnnouncements));
    return initialAnnouncements;
  },

  addAnnouncement(announcementData) {
    const all = this.getAnnouncements();
    const newAnc = {
      id: `ANC-2026-${String(all.length + 1).padStart(2, '0')}`,
      publishedDate: new Date().toISOString().split('T')[0],
      priority: announcementData.priority || 'Normal',
      ...announcementData
    };
    const updated = [newAnc, ...all];
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(updated));

    // Also push a global notification
    this.addNotification({
      title: `Announcement: ${newAnc.title}`,
      message: newAnc.content.slice(0, 100) + '...',
      category: 'Announcements',
      link: '/admin/communication',
      forRoles: ['Admin', 'Teacher', 'Parent', 'Student']
    });

    return newAnc;
  },

  getNotifications() {
    const data = localStorage.getItem(NOTIFICATIONS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(initialNotifications));
    return initialNotifications;
  },

  addNotification(notifData) {
    const all = this.getNotifications();
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      time: 'Just now',
      timestamp: new Date().toISOString(),
      unread: true,
      ...notifData
    };
    const updated = [newNotif, ...all];
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    return newNotif;
  },

  markAsRead(id) {
    const all = this.getNotifications();
    const notif = all.find(n => n.id === id);
    if (notif) {
      notif.unread = false;
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
    }
  },

  markAllAsRead() {
    const all = this.getNotifications();
    all.forEach(n => { n.unread = false; });
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
  }
};
