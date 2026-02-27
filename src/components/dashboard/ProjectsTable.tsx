'use client';

import React, { useState, useMemo } from 'react';
import {
    Search,
    ArrowUpDown,
    MoreVertical,
    Briefcase,
    Calendar,
    Users,
    BadgeDollarSign,
    ExternalLink,
    Filter
} from 'lucide-react';
import { Project, ProjectStatus } from '@/app/data/projects';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProjectsTableProps {
    projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Project;
        direction: 'asc' | 'desc'
    } | null>(null);

    const filteredAndSorted = useMemo(() => {
        let result = [...projects];

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerSearch) ||
                p.client.toLowerCase().includes(lowerSearch) ||
                p.description.toLowerCase().includes(lowerSearch)
            );
        }

        if (statusFilter !== 'All') {
            result = result.filter(p => p.status === statusFilter);
        }

        if (sortConfig) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key] ?? '';
                const bValue = b[sortConfig.key] ?? '';
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [projects, searchTerm, statusFilter, sortConfig]);

    const handleSort = (key: keyof Project) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getStatusBadge = (status: ProjectStatus) => {
        switch (status) {
            case 'In Progress': return <Badge variant="info">In Progress</Badge>;
            case 'Completed': return <Badge variant="success">Completed</Badge>;
            case 'On Hold': return <Badge variant="warning">On Hold</Badge>;
            case 'Archived': return <Badge variant="neutral">Archived</Badge>;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-rose-600 bg-rose-50 border-rose-100';
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            default: return 'text-slate-600 bg-slate-50 border-slate-100';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search projects or clients..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        className="w-full md:w-auto px-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer pr-10"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%2394a3b8%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27 /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Archived">Archived</option>
                    </select>

                    <button
                        onClick={() => { setSearchTerm(''); setStatusFilter('All'); setSortConfig(null); }}
                        className="px-4 py-2.5 text-slate-500 hover:text-slate-900 font-semibold text-sm transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project & Client</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600" onClick={() => handleSort('startDate')}>
                                    <div className="flex items-center gap-1">Timeline <ArrowUpDown className="h-3 w-3" /></div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right cursor-pointer hover:text-blue-600" onClick={() => handleSort('budget')}>
                                    <div className="flex items-center justify-end gap-1">Budget <ArrowUpDown className="h-3 w-3" /></div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Team</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAndSorted.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                                <Briefcase className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</p>
                                                    <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full border", getPriorityColor(project.priority))}>
                                                        {project.priority}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium mb-1">{project.client}</p>
                                                <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{project.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        {getStatusBadge(project.status)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                Started {project.startDate}
                                            </div>
                                            {project.endDate && (
                                                <div className="text-[10px] text-slate-400 pl-5">Ended {project.endDate}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-slate-700 text-sm">
                                        ${project.budget.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-5 text-right text-xs font-bold text-slate-600">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Users className="h-3.5 w-3.5 text-slate-400" />
                                            {project.assignedTalentCount} Specialists
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                            <ExternalLink className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
