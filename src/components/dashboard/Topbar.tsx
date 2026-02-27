'use client';

import React from 'react';
import {
    Bell,
    Search,
    Menu,
    UserCircle,
    HelpCircle,
    Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useState } from 'react';
import { EditUserProfileModal } from './EditUserProfileModal';

export function Topbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({
        name: 'Alex Rivera',
        role: 'Talent Manager',
        email: 'alex.rivera@andela.com',
        location: 'Austin, TX'
    });

    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-6 transition-all duration-300">
            <div className="flex items-center gap-6 w-1/2">
                <button className="md:hidden text-slate-500 hover:text-blue-600 transition-colors">
                    <Menu className="h-6 w-6" />
                </button>
                <div className="relative group w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-100 border-none rounded-2xl leading-5 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white sm:text-sm transition-all duration-200"
                        placeholder="Search talent, skills, or projects..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                    <HelpCircle className="h-5 w-5" />
                </button>
                <div className="h-8 w-px bg-slate-200 mx-1"></div>
                <div
                    className="flex items-center gap-3 pl-2 cursor-pointer group hover:bg-slate-50 p-2 rounded-2xl transition-all"
                    onClick={() => setIsModalOpen(true)}
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{user.name}</p>
                        <p className="text-xs text-slate-500 font-medium leading-tight text-right">{user.role}</p>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md cursor-pointer hover:shadow-lg transition-all group-hover:scale-110">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </div>

            <EditUserProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
                onSave={setUser}
            />
        </header>
    );
}
