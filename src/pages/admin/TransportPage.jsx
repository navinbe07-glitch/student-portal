import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Users,
  User,
  Phone,
  Navigation,
  Compass,
  Radio,
  Clock,
  ShieldCheck,
  Fuel
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';

export function TransportPage() {
  const { buses } = useSchool();
  const [selectedBus, setSelectedBus] = useState(buses[0] || null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transport & Fleet Logistics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            School bus fleet tracking, driver allocation, safety audits, and transit stops
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            GPS Fleet Telemetry Online
          </span>
        </div>
      </div>

      {/* 4 KPIs required by Section 18 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Buses" value="14" icon={Bus} color="indigo" />
        <StatCard title="Active Routes" value="12" icon={Navigation} color="blue" />
        <StatCard title="Students Using Transport" value="640" icon={Users} color="emerald" />
        <StatCard title="Licensed Drivers" value="16" icon={User} color="purple" />
      </div>

      {/* Fleet Grid & Interactive Radar Map Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bus Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
            School Bus Fleet Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {buses.map(bus => {
              const isSelected = selectedBus?.id === bus.id;
              return (
                <div
                  key={bus.id}
                  onClick={() => setSelectedBus(bus)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-card ${
                    isSelected
                      ? 'bg-brand-50/50 dark:bg-slate-800 border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white text-base block">
                        {bus.busNumber}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {bus.vehicleNumber}
                      </span>
                    </div>
                    <Badge variant={bus.status === 'In Transit' ? 'success' : 'neutral'} size="sm">
                      {bus.status}
                    </Badge>
                  </div>

                  <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 mb-3 truncate">
                    {bus.route}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        Driver:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{bus.driver}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        Contact:
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">{bus.driverPhone}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        Occupancy:
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {bus.studentsAssigned} / {bus.capacity} Seats
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Mock GPS Live Radar Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Live GPS Radar & Stops
              </h3>
              <p className="text-[11px] text-slate-400">
                {selectedBus ? `${selectedBus.busNumber} • ${selectedBus.vehicleNumber}` : 'Select a vehicle'}
              </p>
            </div>
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          </div>

          {/* Radar Screen Graphic */}
          <div className="relative h-44 rounded-xl bg-slate-900 overflow-hidden border border-slate-700 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="w-36 h-36 rounded-full border border-emerald-500/30 animate-pulse flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-emerald-500/50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400" />
              </div>
            </div>
            <div className="absolute bottom-2 left-3 text-[10px] text-emerald-400 font-mono">
              Speed: {selectedBus?.speedKmH || 0} km/h • GPS OK
            </div>
            <div className="absolute top-2 right-3 text-[10px] text-slate-400 font-mono">
              Chennai Zone 4
            </div>
          </div>

          {/* Current Location description */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="text-slate-400 block text-[11px]">Current Telemetry Location:</span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
              {selectedBus?.currentLocation}
            </span>
          </div>

          {/* Route Stops Timeline */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Route Stops & Halts
            </span>
            <div className="space-y-2 text-xs">
              {(selectedBus?.stops || []).map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[10px] flex items-center justify-center shrink-0 border border-brand-200 dark:border-brand-800">
                    {idx + 1}
                  </div>
                  <span className="truncate font-medium">{stop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
