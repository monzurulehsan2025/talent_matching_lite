'use client';

import React, { useState } from 'react';
import { projects as initialProjects } from '@/app/data/projects';
import { ProjectsTable } from '@/components/dashboard/ProjectsTable';
import { StatCards } from '@/components/dashboard/StatCards';
import { ArrowRight, Download, Filter, Plus, Briefcase, TrendingUp, BadgeDollarSign, Clock } from 'lucide-react';

export default function ProjectsPage() {
    const [projects] = useState(initialProjects);

    // Calculate quick stats
    const stats = [
        {
            label: 'Total Projects',
            value: projects.length,
            icon: Briefcase,
            color: 'blue' as const,
            trend: '+2 this month'
        },
        {
            label: 'Active (In Progress)',
            value: projects.filter(p => p.status === 'In Progress').length,
            icon: TrendingUp,
            color: 'emerald' as const,
            trend: '75% of total'
        },
        {
            label: 'Total Budget (USD)',
            value: `$${(projects.reduce((acc, p) => acc + p.budget, 0) / 1000).toFixed(0)}k`,
            icon: BadgeDollarSign,
            color: 'rose' as const,
            trend: 'Budget Allocated'
        },
        {
            label: 'Pending (On Hold)',
            value: projects.filter(p => p.status === 'On Hold').length,
            icon: Clock,
            color: 'amber' as const,
            trend: 'Requires attention'
        }
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header Section */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest">
                        <Briefcase className="h-4 w-4" />
                        Project Tracking
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                        All Projects
                    </h1>
                    <p className="text-slate-500 font-medium max-w-xl">
                        Monitor project lifecycles, budgets, and team allocations across your entire portfolio.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="h-4 w-4" />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all border border-blue-500">
                        <Plus className="h-4 w-4" />
                        Create Project
                    </button>
                </div>
            </section>

            {/* Stats Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn(
                                "p-3 rounded-2xl",
                                stat.color === 'blue' && "bg-blue-50 text-blue-600",
                                stat.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                                stat.color === 'rose' && "bg-rose-50 text-rose-600",
                                stat.color === 'amber' && "bg-amber-50 text-amber-600",
                            )}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{stat.trend}</span>
                        </div>
                        <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
                        <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Main Table Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">
                        Active & Recent Projects
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Filter className="h-3 w-3" />
                        LIVE TRACKING ENABLED
                    </div>
                </div>

                <ProjectsTable projects={projects} />
            </section>
        </div>
    );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
