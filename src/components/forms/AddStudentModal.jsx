import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Check, ChevronRight, ChevronLeft, User, Users, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

const steps = [
  { id: 1, title: 'Personal', icon: User },
  { id: 2, title: 'Parent', icon: Users },
  { id: 3, title: 'Academic', icon: GraduationCap },
  { id: 4, title: 'Documents', icon: FileText },
  { id: 5, title: 'Review', icon: CheckCircle2 }
];

export function AddStudentModal({ isOpen, onClose }) {
  const { addStudent } = useSchool();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    dob: '2012-06-15',
    bloodGroup: 'O+',
    house: 'Emerald',
    parent: '',
    parentRelation: 'Father',
    phone: '+91 9840',
    email: '',
    address: '',
    emergencyContact: '+91 9444',
    class: '10th Standard',
    section: 'A',
    rollNo: '',
    admissionNo: '',
    totalFee: 45000,
    transportOpted: true,
    busRoute: 'Route 3 (Anna Nagar - School)'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.name.trim()) errs.name = 'Student name is required';
      if (!formData.dob) errs.dob = 'Date of birth is required';
    } else if (step === 2) {
      if (!formData.parent.trim()) errs.parent = 'Parent name is required';
      if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Valid phone is required';
      if (!formData.address.trim()) errs.address = 'Residential address is required';
    } else if (step === 3) {
      if (!formData.class) errs.class = 'Class is required';
      if (!formData.section) errs.section = 'Section is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(s => Math.min(5, s + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(s => Math.max(1, s - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      addStudent(formData);
      onClose();
      setCurrentStep(1);
      setFormData({
        name: '',
        gender: 'Male',
        dob: '2012-06-15',
        bloodGroup: 'O+',
        house: 'Emerald',
        parent: '',
        parentRelation: 'Father',
        phone: '+91 9840',
        email: '',
        address: '',
        emergencyContact: '+91 9444',
        class: '10th Standard',
        section: 'A',
        rollNo: '',
        admissionNo: '',
        totalFee: 45000,
        transportOpted: true,
        busRoute: 'Route 3 (Anna Nagar - School)'
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-2xl"
      title="Add New Student Admission"
      subtitle="Complete student registration wizard"
      footer={
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handleBack}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Enroll Student</span>
            </button>
          )}
        </div>
      }
    >
      {/* Steps Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-brand-600 text-white ring-4 ring-brand-500/20 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[11px] mt-1 font-medium hidden sm:block ${isCurrent ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors ${
                      currentStep > idx + 1 ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="e.g. S. Vigneshwaran"
                className={`w-full px-3 py-2 rounded-xl border ${errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500`}
              />
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={e => handleChange('gender', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={e => handleChange('dob', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={e => handleChange('bloodGroup', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">School House</label>
                <select
                  value={formData.house}
                  onChange={e => handleChange('house', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Emerald">Emerald (Green)</option>
                  <option value="Ruby">Ruby (Red)</option>
                  <option value="Sapphire">Sapphire (Blue)</option>
                  <option value="Topaz">Topaz (Yellow)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Parent Info */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Parent / Guardian Full Name *</label>
                <input
                  type="text"
                  value={formData.parent}
                  onChange={e => handleChange('parent', e.target.value)}
                  placeholder="e.g. K. Sundararajan"
                  className={`w-full px-3 py-2 rounded-xl border ${errors.parent ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                />
                {errors.parent && <p className="text-[11px] text-rose-500 mt-1">{errors.parent}</p>}
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Relationship</label>
                <select
                  value={formData.parentRelation}
                  onChange={e => handleChange('parentRelation', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Primary Phone Number *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder="+91 98401 XXXXX"
                  className={`w-full px-3 py-2 rounded-xl border ${errors.phone ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Emergency Contact</label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={e => handleChange('emergencyContact', e.target.value)}
                  placeholder="+91 94440 XXXXX"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Parent Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Residential Address *</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={e => handleChange('address', e.target.value)}
                placeholder="Door No, Street, Area, Chennai Pin Code"
                className={`w-full px-3 py-2 rounded-xl border ${errors.address ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
              />
              {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Academic Info */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Enrolling Class *</label>
                <select
                  value={formData.class}
                  onChange={e => handleChange('class', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {['1st Standard', '2nd Standard', '3rd Standard', '4th Standard', '5th Standard', '6th Standard', '7th Standard', '8th Standard', '9th Standard', '10th Standard', '11th Standard', '12th Standard'].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Section *</label>
                <select
                  value={formData.section}
                  onChange={e => handleChange('section', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Annual Tuition Fee (₹)</label>
                <input
                  type="number"
                  value={formData.totalFee}
                  onChange={e => handleChange('totalFee', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">School Transport</label>
                <select
                  value={formData.transportOpted ? 'Yes' : 'No'}
                  onChange={e => handleChange('transportOpted', e.target.value === 'Yes')}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Yes">Yes, School Bus Required</option>
                  <option value="No">No, Self-Arranged Transport</option>
                </select>
              </div>
            </div>

            {formData.transportOpted && (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Bus Route</label>
                <select
                  value={formData.busRoute}
                  onChange={e => handleChange('busRoute', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Route 1 (T. Nagar - School)">Route 1 (T. Nagar - School)</option>
                  <option value="Route 2 (Kilpauk - School)">Route 2 (Kilpauk - School)</option>
                  <option value="Route 3 (Anna Nagar - School)">Route 3 (Anna Nagar - School)</option>
                  <option value="Route 4 (Adyar - School)">Route 4 (Adyar - School)</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Documents */}
        {currentStep === 4 && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs text-slate-500 mb-2">Check mandatory documents received during admission:</p>
            {[
              'Birth Certificate (Original / Copy)',
              'Previous School Transfer Certificate (TC)',
              'Student Aadhaar Card Copy',
              'Community Certificate (if applicable)',
              'Passport Size Photographs (4 Nos)',
              'Immunization / Blood Group Medical Record'
            ].map((doc, idx) => (
              <label key={doc} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                <input
                  type="checkbox"
                  defaultChecked={idx < 4}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{doc}</span>
              </label>
            ))}
          </div>
        )}

        {/* Step 5: Review & Confirm */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-800 dark:text-emerald-200">
                Please review all registration details before finalizing the admission. An admission number and student ID will be generated automatically.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div><span className="text-slate-400 block">Name:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.name || 'Not specified'}</span></div>
              <div><span className="text-slate-400 block">Class & Section:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.class} - {formData.section}</span></div>
              <div><span className="text-slate-400 block">Gender & DOB:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.gender} • {formData.dob}</span></div>
              <div><span className="text-slate-400 block">House:</span> <span className="font-bold text-emerald-600">{formData.house}</span></div>
              <div><span className="text-slate-400 block">Parent / Guardian:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.parent} ({formData.parentRelation})</span></div>
              <div><span className="text-slate-400 block">Phone:</span> <span className="font-bold text-slate-900 dark:text-white">{formData.phone}</span></div>
              <div className="col-span-2"><span className="text-slate-400 block">Address:</span> <span className="font-medium text-slate-700 dark:text-slate-300">{formData.address}</span></div>
              <div><span className="text-slate-400 block">Annual Tuition Fee:</span> <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{formData.totalFee.toLocaleString('en-IN')}</span></div>
              <div><span className="text-slate-400 block">Transport:</span> <span className="font-medium text-slate-700 dark:text-slate-300">{formData.transportOpted ? formData.busRoute : 'Self'}</span></div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
