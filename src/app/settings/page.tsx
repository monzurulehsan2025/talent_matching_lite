'use client';

import React from 'react';
import { Settings, Bell, Shield, Users, Mail, BellOff, Link2 } from 'lucide-react';

export default function SettingsPage() {
    const sections = [
        { name: 'Profile Settings', icon: Users, description: 'Manage your personal details and preferences.' },
        { name: 'Notifications', icon: Bell, description: 'Customize your email and push notification settings.' },
        { name: 'Security', icon: Shield, description: 'Update your password and security credentials.' },
        { name: 'Integrations', icon: Link2, description: 'Connect your talent data to external platforms.' },
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest">
                    <Settings className="h-4 w-4" />
                    System Preferences
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                    Settings Console
                </h1>
                <p className="text-slate-500 font-medium max-w-xl">
                    Configure your workspace, security, and notification preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section) => (
                    <div key={section.name} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <section.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{section.name}</h3>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">{section.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
