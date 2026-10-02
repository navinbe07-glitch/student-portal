import { initialBuses, initialTransportStats } from '../data/mockTransport';

const BUSES_KEY = 'edusphere_buses';

export const transportService = {
  getBuses() {
    const data = localStorage.getItem(BUSES_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(BUSES_KEY, JSON.stringify(initialBuses));
    return initialBuses;
  },

  getStats() {
    return initialTransportStats;
  },

  updateBusLocation(busId, newLocation, speed) {
    const buses = this.getBuses();
    const bus = buses.find(b => b.id === busId);
    if (bus) {
      bus.currentLocation = newLocation;
      if (speed !== undefined) bus.speedKmH = speed;
      localStorage.setItem(BUSES_KEY, JSON.stringify(buses));
      return bus;
    }
    return null;
  }
};
