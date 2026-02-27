'use client';

import React, { useState, useEffect } from 'react';
import { Person } from './data/people';
import { StatCards } from '@/components/dashboard/StatCards';
import { PeopleTable } from '@/components/dashboard/PeopleTable';
import { AddTalentModal } from '@/components/dashboard/AddTalentModal';
import { ArrowRight, Download, Filter, Plus, Users, Loader2 } from 'lucide-react';

const API_BASE = 'http://localhost:3001/api/people';

export default function Dashboard() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const handleAddPerson = async (newPerson: Person) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerson),
      });
      if (res.ok) {
        const data = await res.json();
        setPeople(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add person:', error);
    }
  };

  const handleDeletePerson = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this talent from the pool?')) return;

    try {
      const res = await fetch(`${API_BASE}?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPeople(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete person:', error);
    }
  };

  useEffect(() => {
    const handleBodyClick = () => {
      // Dummy to ensure useEffect is correctly imported if needed elsewhere
    };
    return () => { };
  }, []);

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

      {/* Loading State or Main Content */}
      {isLoading && people.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-in fade-in duration-500">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-bold italic tracking-wide">Syncing with Perl Backend...</p>
        </div>
      ) : (
        <>
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
        </>
      )}

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
