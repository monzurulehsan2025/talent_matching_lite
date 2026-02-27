'use client';

import React, { useState, useEffect } from 'react';
import { Person } from '@/app/data/people';
import { PeopleTable } from '@/components/dashboard/PeopleTable';
import { Users, Filter, Download } from 'lucide-react';

const API_BASE = 'http://localhost:3001/api/people';

export default function PeoplePage() {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPeople = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(API_BASE);
            if (res.ok) {
                const data = await res.json();
                setPeople(data);
            }
        } catch (error) {
            console.error('Failed to fetch people:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    const handleUpdatePerson = async (updatedPerson: Person) => {
        try {
            const res = await fetch(API_BASE, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPerson),
            });
            if (res.ok) {
                const data = await res.json();
                setPeople(prev => prev.map(p => p.id === data.id ? data : p));
            }
        } catch (error) {
            console.error('Failed to update person:', error);
        }
    };

    const handleDeletePerson = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this talent from the pool?')) return;
        try {
            const res = await fetch(`${API_BASE}?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPeople(prev => prev.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete person:', error);
        }
    };

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest">
                        <Users className="h-4 w-4" />
                        Directory Pool
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                        All Talent Specialists
                    </h1>
                    <p className="text-slate-500 font-medium max-w-xl">
                        A centralized directory of all your engineering resources. Use filters to narrow down by skill or availability.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="h-4 w-4" />
                        Export Pool
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all border border-blue-500">
                        <Filter className="h-4 w-4 rotate-90" />
                        Advanced Filter
                    </button>
                </div>
            </div>

            <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <PeopleTable
                    people={people}
                    onUpdatePerson={handleUpdatePerson}
                    onDeletePerson={handleDeletePerson}
                />
            </div>
        </div>
    );
}
