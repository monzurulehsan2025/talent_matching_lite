'use client';

import React, { useState } from 'react';
import { X, Save, Camera } from 'lucide-react';

interface UserProfile {
    name: string;
    role: string;
    email: string;
    location: string;
}

interface EditUserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
    onSave: (updatedUser: UserProfile) => void;
}

export function EditUserProfileModal({ isOpen, onClose, user, onSave }: EditUserProfileModalProps) {
    const [formData, setFormData] = useState<UserProfile>(user);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-900">Edit Your Profile</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="flex flex-col items-center gap-4 mb-2">
                        <div className="relative group cursor-pointer">
                            <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:opacity-90 transition-opacity text-4xl font-bold">
                                {formData.name.charAt(0)}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                                <Camera className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest cursor-pointer hover:underline">Change Photo</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Work Role</label>
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
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Office Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
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
                        Discard
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                    >
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
