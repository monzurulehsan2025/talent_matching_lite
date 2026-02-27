'use client';

import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Person, AvailabilityStatus } from '@/app/data/people';
import { cn } from '@/lib/utils';

interface EditTalentModalProps {
    isOpen: boolean;
    onClose: () => void;
    person: Person | null;
    onSave: (updatedPerson: Person) => void;
}

export function EditTalentModal({ isOpen, onClose, person, onSave }: EditTalentModalProps) {
    const [formData, setFormData] = useState<Person | null>(null);

    useEffect(() => {
        if (person) {
            setFormData({ ...person });
        }
    }, [person]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? {
            ...prev,
            [name]: name === 'utilizationPercent' || name === 'performanceRating' ? Number(value) : value
        } : null);
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const skills = e.target.value.split(',').map(s => s.trim());
        setFormData(prev => prev ? { ...prev, primarySkills: skills } : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Edit Talent Profile</h2>
                        <p className="text-sm text-slate-500 font-medium">Update details for {person?.fullName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Timezone</label>
                            <input
                                type="text"
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Availability Status</label>
                            <select
                                name="availabilityStatus"
                                value={formData.availabilityStatus}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            >
                                <option value="Available">Available</option>
                                <option value="Limited">Limited</option>
                                <option value="Assigned">Assigned</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Utilization %</label>
                            <input
                                type="number"
                                name="utilizationPercent"
                                min="0"
                                max="100"
                                value={formData.utilizationPercent}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Rating (1-5)</label>
                            <input
                                type="number"
                                name="performanceRating"
                                min="1"
                                max="5"
                                step="0.1"
                                value={formData.performanceRating}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Skills (comma separated)</label>
                            <input
                                type="text"
                                name="primarySkills"
                                value={formData.primarySkills.join(', ')}
                                onChange={handleSkillsChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                placeholder="e.g. React, Node.js, AWS"
                                required
                            />
                        </div>
                    </div>
                </form>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                    >
                        <Save className="h-4 w-4" />
                        Save Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
