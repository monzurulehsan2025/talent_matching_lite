'use client';

import React from 'react';
import { TrendingUp, FileText, Download, Filter, Calendar } from 'lucide-react';

export default function ReportsPage() {
    const reportCategories = [
        { name: 'Talent Utilization', icon: TrendingUp, status: 'Completed', date: 'Feb 27, 2026' },
        { name: 'Monthly Budget Breakdown', icon: FileText, status: 'Draft', date: 'Feb 26, 2026' },
        { name: 'Performance Analytics', icon: TrendingUp, status: 'Scheduled', date: 'Mar 01, 2026' },
        { name: 'Skill Gap Analysis', icon: FileText, status: 'Completed', date: 'Jan 15, 2026' },
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest">
                    <TrendingUp className="h-4 w-4" />
                    Insight Center
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                    Analytics & Reports
                </h1>
                <p className="text-slate-500 font-medium max-w-xl">
                    Generate and download comprehensive reports on talent performance and project efficiency.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCategories.map((report) => (
                    <div key={report.name} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
                                <report.icon className="h-6 w-6" />
                            </div>
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{report.name}</h3>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {report.date}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                            <span>{report.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
