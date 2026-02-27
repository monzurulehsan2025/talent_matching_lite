'use client';

import React, { useState, useMemo } from 'react';
import {
    ChevronDown,
    ChevronUp,
    MapPin,
    Clock,
    Star,
    Search,
    Filter,
    ArrowUpDown,
    MoreVertical,
    Briefcase
} from 'lucide-react';
import { Person, AvailabilityStatus } from '@/app/data/people';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface PeopleTableProps {
    people: Person[];
}

export function PeopleTable({ people }: PeopleTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<AvailabilityStatus | 'All'>('All');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Person;
        direction: 'asc' | 'desc'
    } | null>(null);

    const filteredAndSortedPeople = useMemo(() => {
        let result = [...people];

        // Search filter
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(p =>
                p.fullName.toLowerCase().includes(lowerSearch) ||
                p.role.toLowerCase().includes(lowerSearch) ||
                p.primarySkills.some(s => s.toLowerCase().includes(lowerSearch))
            );
        }

        // Status filter
        if (statusFilter !== 'All') {
            result = result.filter(p => p.availabilityStatus === statusFilter);
        }

        // Sorting
        if (sortConfig) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [people, searchTerm, statusFilter, sortConfig]);

    const handleSort = (key: keyof Person) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getStatusBadge = (status: AvailabilityStatus) => {
        switch (status) {
            case 'Available': return <Badge variant="success">Available</Badge>;
            case 'Limited': return <Badge variant="warning">Limited</Badge>;
            case 'Assigned': return <Badge variant="error">Assigned</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const getRatingStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={cn(
                            "h-3.5 w-3.5",
                            i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name, role, or skills..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        className="w-full md:w-auto px-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer pr-10 relative"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%2394a3b8%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27 /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Available">Available</option>
                        <option value="Limited">Limited</option>
                        <option value="Assigned">Assigned</option>
                    </select>

                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('All');
                            setSortConfig(null);
                        }}
                        className="px-4 py-2.5 text-slate-500 hover:text-slate-900 font-semibold text-sm transition-colors whitespace-nowrap"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Name & Role
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Location & Timezone
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Availability
                                </th>
                                <th
                                    className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
                                    onClick={() => handleSort('utilizationPercent')}
                                >
                                    <div className="flex items-center gap-1.5">
                                        Utilization
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors text-right"
                                    onClick={() => handleSort('performanceRating')}
                                >
                                    <div className="flex items-center justify-end gap-1.5">
                                        Rating
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAndSortedPeople.length > 0 ? (
                                filteredAndSortedPeople.map((person) => (
                                    <tr key={person.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                                                    {person.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                        {person.fullName}
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-medium">{person.role}</p>
                                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                                        {person.primarySkills.slice(0, 3).map(skill => (
                                                            <span key={skill} className="px-1.5 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 rounded-md">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {person.primarySkills.length > 3 && (
                                                            <span className="text-[10px] text-slate-400 self-center">+{person.primarySkills.length - 3}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                    {person.location}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                    <Clock className="h-3 w-3" />
                                                    {person.timezone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                {getStatusBadge(person.availabilityStatus)}
                                                <span className="text-[10px] text-slate-400 font-medium">Active {person.lastActiveDate}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="w-24">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-bold text-slate-700">{person.utilizationPercent}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-500",
                                                            person.utilizationPercent > 80 ? "bg-rose-500" :
                                                                person.utilizationPercent > 50 ? "bg-amber-500" : "bg-blue-500"
                                                        )}
                                                        style={{ width: `${person.utilizationPercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex flex-col items-end gap-1">
                                                {getRatingStars(person.performanceRating)}
                                                <span className="text-[11px] font-bold text-slate-900">{person.performanceRating}.0 / 5.0</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                                <Search className="h-6 w-6" />
                                            </div>
                                            <p className="text-slate-500 font-medium">No talent found matching your criteria.</p>
                                            <button
                                                onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                                                className="text-blue-600 font-bold text-sm hover:underline"
                                            >
                                                Clear Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
