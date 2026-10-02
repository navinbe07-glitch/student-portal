import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Users,
  CheckCircle2,
  DollarSign,
  Plus,
  Minus,
  Search,
  Building
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';

export function InventoryPage() {
  const { inventoryItems, adjustStock } = useSchool();
  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'suppliers'
  const [adjustModalItem, setAdjustModalItem] = useState(null);
  const [stockChange, setStockChange] = useState(10);

  const lowStockItems = inventoryItems.filter(i => i.quantity <= i.minThreshold);

  const handleStockSubmit = () => {
    if (adjustModalItem) {
      adjustStock(adjustModalItem.id, Number(stockChange));
      setAdjustModalItem(null);
    }
  };

  const columns = [
    {
      header: 'Item Name & SKU',
      key: 'name',
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">
            {item.name}
          </span>
          <span className="font-mono text-xs text-slate-400">
            SKU: {item.sku}
          </span>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'category',
      sortable: true,
      render: (item) => (
        <Badge variant="neutral" size="sm">{item.category}</Badge>
      )
    },
    {
      header: 'Stock In Hand',
      key: 'quantity',
      sortable: true,
      render: (item) => (
        <div>
          <span className={`font-extrabold text-sm ${item.quantity <= item.minThreshold ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
            {item.quantity} {item.unit}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Threshold: {item.minThreshold}
          </span>
        </div>
      )
    },
    {
      header: 'Unit Cost',
      key: 'costPerUnit',
      render: (item) => (
        <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">
          {formatCurrency(item.costPerUnit)}
        </span>
      )
    },
    {
      header: 'Location',
      key: 'location',
      render: (item) => (
        <span className="text-xs text-slate-500">{item.location}</span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => (
        <Badge variant={item.status === 'Low Stock' ? 'danger' : 'success'} size="sm">
          {item.status}
        </Badge>
      )
    },
    {
      header: 'Action',
      key: 'action',
      render: (item) => (
        <button
          onClick={() => {
            setAdjustModalItem(item);
            setStockChange(10);
          }}
          className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded-lg text-xs font-semibold transition-colors"
        >
          Adjust Stock
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Inventory & Asset Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Science labs, classroom stationery, athletics equipment, and stock procurement
          </p>
        </div>

        <button
          onClick={() => alert('Add Item feature ready for production.')}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Stock Item</span>
        </button>
      </div>

      {/* 4 KPIs required by Section 19 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Assets Value" value="₹28.5 L" icon={Package} color="indigo" />
        <StatCard title="Stock Items" value="148" icon={CheckCircle2} color="blue" />
        <StatCard title="Low Stock Items" value={String(lowStockItems.length)} icon={AlertTriangle} color="rose" />
        <StatCard title="Registered Suppliers" value="24" icon={Building} color="purple" />
      </div>

      {/* Low Stock Warning Cards Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-4 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Urgent: Low Stock Purchase Requisition Alerts ({lowStockItems.length} Items)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockItems.map(item => (
              <div key={item.id} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200/80 dark:border-rose-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">{item.name}</h4>
                  <span className="text-[11px] text-rose-600 font-semibold">
                    {item.quantity} remaining (Min: {item.minThreshold})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setAdjustModalItem(item);
                    setStockChange(20);
                  }}
                  className="px-2 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-rose-700"
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={inventoryItems}
        searchable={true}
        searchPlaceholder="Search inventory by item name, SKU, category..."
        pageSize={10}
      />

      {/* Adjust Stock Modal */}
      <Modal
        isOpen={!!adjustModalItem}
        onClose={() => setAdjustModalItem(null)}
        maxWidth="max-w-md"
        title="Stock Adjustment / Procurement"
        subtitle={adjustModalItem ? `${adjustModalItem.name} (Current: ${adjustModalItem.quantity})` : ''}
        footer={
          <>
            <button
              onClick={() => setAdjustModalItem(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={handleStockSubmit}
              className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm"
            >
              Save Stock Update
            </button>
          </>
        }
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Quantity Adjustment (Positive to add stock, negative to log consumption):
            </label>
            <input
              type="number"
              value={stockChange}
              onChange={e => setStockChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
            />
          </div>
          <p className="text-xs text-slate-500">
            Updated balance will be:{' '}
            <strong className="text-brand-600 font-bold">
              {Math.max(0, (adjustModalItem?.quantity || 0) + Number(stockChange))} {adjustModalItem?.unit}
            </strong>
          </p>
        </div>
      </Modal>
    </div>
  );
}
