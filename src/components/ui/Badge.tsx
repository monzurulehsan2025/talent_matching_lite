import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info';
}

export function Badge({ children, variant = 'neutral', className, ...props }: BadgeProps) {
    const variants = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20',
        warning: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20',
        error: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20',
        neutral: 'bg-slate-50 text-slate-700 border-slate-200 ring-slate-600/20',
        info: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20',
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
