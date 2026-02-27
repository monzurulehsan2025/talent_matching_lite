'use client';

import React from 'react';
import {
    Users,
    CheckCircle2,
    BarChart3,
    Award,
    Star,
    MapPin,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';
import { Person } from '@/app/data/people';
import { cn } from '@/lib/utils';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ElementType;
    trend?: string;
    color: 'blue' | 'emerald' | 'amber' | 'indigo' | 'rose' | 'purple';
    isPositive?: boolean;
}

function StatCard({ label, value, icon: Icon, trend, color, isPositive = true }: StatCardProps) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100 ring-blue-500/10',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-500/10',
        amber: 'bg-amber-50 text-amber-600 border-amber-100 ring-amber-500/10',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 ring-indigo-500/10',
        rose: 'bg-rose-50 text-rose-600 border-rose-100 ring-rose-500/10',
        purple: 'bg-purple-50 text-purple-600 border-purple-100 ring-purple-500/10',
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110", colors[color])}>
                    <Icon className="h-6 w-6" />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-bold py-1 px-2.5 rounded-full",
                        isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    )}>
                        <TrendingUp className={cn("h-3 w-3", isPositive ? "" : "rotate-180")} />
                        {trend}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold text-slate-500 mb-1">{label}</p>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
            </div>
        </div>
    );
}

export function StatCards({ people }: { people: Person[] }) {
    // Calculate Top Location
    const locationCounts = people.reduce((acc, p) => {
        acc[p.location] = (acc[p.location] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topLocation = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const avgRating = (people.reduce((sum, p) => sum + p.performanceRating, 0) / people.length).toFixed(1);

    const stats = [
        {
            label: 'Total People',
            value: people.length,
            icon: Users,
            trend: '+12%',
            color: 'blue' as const,
            isPositive: true
        },
        {
            label: 'Available Now',
            value: people.filter(p => p.availabilityStatus === 'Available').length,
            icon: CheckCircle2,
            trend: '5 new',
            color: 'emerald' as const,
            isPositive: true
        },
        {
            label: 'Avg Utilization',
            value: `${Math.round(people.reduce((sum, p) => sum + p.utilizationPercent, 0) / people.length)}%`,
            icon: BarChart3,
            trend: '-2%',
            color: 'amber' as const,
            isPositive: false
        },
        {
            label: 'High Performers',
            value: people.filter(p => p.performanceRating >= 4).length,
            icon: Award,
            trend: '85%',
            color: 'indigo' as const,
            isPositive: true
        },
        {
            label: 'Avg Rating',
            value: `${avgRating} / 5`,
            icon: Star,
            trend: 'Top Tier',
            color: 'rose' as const,
            isPositive: true
        },
        {
            label: 'Top Location',
            value: topLocation.split(',')[0],
            icon: MapPin,
            trend: 'Hub',
            color: 'purple' as const,
            isPositive: true
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    );
}
