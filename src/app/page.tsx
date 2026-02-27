'use client';

import React, { useState } from 'react';
import { people as initialPeople, Person } from './data/people';
import { StatCards } from '@/components/dashboard/StatCards';
import { PeopleTable } from '@/components/dashboard/PeopleTable';
import { AddTalentModal } from '@/components/dashboard/AddTalentModal';
import { ArrowRight, Download, Filter, Plus, Users } from 'lucide-react';

export default function Dashboard() {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleUpdatePerson = (updatedPerson: Person) => {
    setPeople(prev => prev.map(p => p.id === updatedPerson.id ? updatedPerson : p));
  };

  const handleAddPerson = (newPerson: Person) => {
    setPeople(prev => [newPerson, ...prev]);
  };

  const handleDeletePerson = (id: string) => {
    if (window.confirm('Are you sure you want to remove this talent from the pool?')) {
      setPeople(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest animate-fade-in">
            <Users className="h-4 w-4" />
            Talent Management
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none animate-slide-in">
            Talent Ops Dashboard
          </h1>
          <p className="text-slate-500 font-medium max-w-xl animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Coordinate your engineering talent, track utilization, and manage your bench in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="h-4 w-4" />
            Export Data
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all border border-blue-500"
          >
            <Plus className="h-4 w-4" />
            Add Talent
          </button>
        </div>
      </section>

      {/* Statistics Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Key Metrics
          </h2>
          <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1 group">
            View Reports
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        <StatCards people={people} />
      </section>

      {/* Main Table Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Active Talent Pool
          </h2>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Filter className="h-3 w-3" />
            AUTO-SYNC ENABLED
          </div>
        </div>

        <PeopleTable
          people={people}
          onUpdatePerson={handleUpdatePerson}
          onDeletePerson={handleDeletePerson}
        />
      </section>

      {/* Footer / Info */}
      <footer className="pt-10 pb-6 border-t border-slate-200 text-center">
        <p className="text-slate-400 font-medium text-xs">
          &copy; {new Date().getFullYear()} Talent Ops Dashboard. All rights reserved.
        </p>
      </footer>

      <AddTalentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPerson}
      />
    </div>
  );
}
