'use client';

import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Person, AvailabilityStatus } from '@/app/data/people';
import { cn } from '@/lib/utils';

interface AddTalentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (person: Person) => void;
}

export function AddTalentModal({ isOpen, onClose, onAdd }: AddTalentModalProps) {
    const [formData, setFormData] = useState<Partial<Person>>({
        fullName: '',
        role: '',
        location: '',
        timezone: 'UTC',
        availabilityStatus: 'Available',
        utilizationPercent: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        performanceRating: 5,
        primarySkills: [],
    });

    const [skillsInput, setSkillsInput] = useState('');

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'utilizationPercent' || name === 'performanceRating' ? Number(value) : value
        }));
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkillsInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s !== '');

        const newPerson: Person = {
            ...formData as Person,
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
            primarySkills: skills,
        };

        onAdd(newPerson);
        onClose();
        // Reset form
        setFormData({
            fullName: '',
            role: '',
            location: '',
            timezone: 'UTC',
            availabilityStatus: 'Available',
            utilizationPercent: 0,
            lastActiveDate: new Date().toISOString().split('T')[0],
            performanceRating: 5,
            primarySkills: [],
        });
        setSkillsInput('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Add New Talent</h2>
                        <p className="text-sm text-slate-500 font-medium">Onboard a new engineering specialist to the pool.</p>
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
                                placeholder="e.g. John Doe"
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
                                placeholder="e.g. Senior Frontend Engineer"
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
                                placeholder="e.g. London, UK"
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
                                placeholder="e.g. UTC+1"
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
                                value={skillsInput}
                                onChange={handleSkillsChange}
                                placeholder="e.g. React, TypeScript, GraphQL"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
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
                        <UserPlus className="h-4 w-4" />
                        Add Talent
                    </button>
                </div>
            </div>
        </div>
    );
}
