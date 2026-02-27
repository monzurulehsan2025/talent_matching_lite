'use client';

import React from 'react';
import Link from 'next/link';
import {
    Users,
    LayoutDashboard,
    Briefcase,
    Settings,
    ChevronRight,
    TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/', active: true },
    { name: 'People', icon: Users, href: '/people' },
    { name: 'Projects', icon: Briefcase, href: '/projects' },
    { name: 'Reports', icon: TrendingUp, href: '/reports' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white border-r border-slate-800 hidden md:flex flex-col z-50">
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg">
                        T
                    </div>
                    <span className="text-xl font-bold tracking-tight">Talent Ops</span>
                </div>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200",
                            item.active
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                        onClick={(e) => {
                            if (!item.active) e.preventDefault();
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={cn("h-5 w-5", item.active ? "text-white" : "group-hover:text-white")} />
                            <span className="font-medium">{item.name}</span>
                        </div>
                        {item.active && <ChevronRight className="h-4 w-4" />}
                    </Link>
                ))}
            </nav>

            <div className="p-6 mt-auto">
                <div className="rounded-2xl bg-slate-800/50 p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">Quick Actions</p>
                    <button className="w-full bg-slate-700 hover:bg-slate-600 text-sm py-2 px-3 rounded-lg transition-colors font-medium">
                        New Hire Request
                    </button>
                </div>
            </div>
        </aside>
    );
}
