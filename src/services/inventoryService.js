import { initialInventoryItems, initialInventoryStats, initialSuppliers } from '../data/mockInventory';

const INVENTORY_KEY = 'edusphere_inventory';

export const inventoryService = {
  getItems() {
    const data = localStorage.getItem(INVENTORY_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(initialInventoryItems));
    return initialInventoryItems;
  },

  getStats() {
    const items = this.getItems();
    const lowStockCount = items.filter(i => i.quantity <= i.minThreshold).length;
    return {
      ...initialInventoryStats,
      lowStockItemsCount: lowStockCount
    };
  },

  getSuppliers() {
    return initialSuppliers;
  },

  adjustStock(itemId, changeAmount) {
    const items = this.getItems();
    const item = items.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(0, item.quantity + changeAmount);
      item.status = item.quantity <= item.minThreshold ? 'Low Stock' : 'In Stock';
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
      return item;
    }
    return null;
  },

  addItem(newItem) {
    const items = this.getItems();
    const item = {
      id: `INV-${items.length + 101}`,
      status: newItem.quantity <= newItem.minThreshold ? 'Low Stock' : 'In Stock',
      ...newItem
    };
    const updated = [item, ...items];
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));
    return item;
  }
};
