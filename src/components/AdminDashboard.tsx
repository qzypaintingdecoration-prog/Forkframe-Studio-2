import React, { useState, useEffect } from 'react';
import { Lock, Search, Filter, Mail, Phone, Calendar, Clock, CheckCircle2, AlertCircle, FileText, RefreshCw, LogOut, ShieldCheck } from 'lucide-react';

interface Enquiry {
  id: string;
  venueName: string;
  venueType: string;
  selectedServices: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  currentUrl?: string;
  timeline: string;
  budgetRange: string;
  notes?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'quoted' | 'completed' | 'archived';
  adminNotes?: string;
  deliveryStatus: 'delivered' | 'pending' | 'failed';
  deliveryTimestamp?: string;
}

export const AdminDashboard: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('forkframe_admin_token');
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Load enquiries if authenticated
  useEffect(() => {
    if (authToken) {
      fetchEnquiries();
    }
  }, [authToken]);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        setAuthToken(null);
        localStorage.removeItem('forkframe_admin_token');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        if (data.enquiries?.length > 0 && !selectedEnquiry) {
          setSelectedEnquiry(data.enquiries[0]);
          setEditingNotes(data.enquiries[0].adminNotes || '');
        }
      }
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAuthToken(data.token);
        localStorage.setItem('forkframe_admin_token', data.token);
      } else {
        setLoginError(data.error || 'Invalid administration password.');
      }
    } catch (err) {
      setLoginError('Authentication server error.');
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('forkframe_admin_token');
  };

  const handleUpdateStatus = async (id: string, newStatus: Enquiry['status']) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Error updating status', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ adminNotes: editingNotes }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, adminNotes: editingNotes } : e))
        );
        setSelectedEnquiry({ ...selectedEnquiry, adminNotes: editingNotes });
      }
    } catch (err) {
      console.error('Error saving notes', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Filtered list
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // If unauthenticated: Login View
  if (!authToken) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/30 text-[#FF6A2A] mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-display text-[var(--text-primary)]">
              Studio Administration Portal
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Authorized access to quotation pipeline and customer enquiries.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                Admin Passphrase
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
              />
              <span className="text-[10px] text-[var(--text-secondary)] block mt-1">
                Default demonstration key: <code className="text-[#FF6A2A]">forkframe2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-[#FF6A2A] hover:bg-[#e95620] text-white shadow-md shadow-[#FF6A2A]/20 transition-all"
            >
              Authenticate Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6A2A]">
            <span>Secure Admin</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>Hospitality Lead Management</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
            Enquiry & Quotation Pipeline
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Audit inbound venue requests, update project statuses, and track dispatch to studioforkframe@gmail.com.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white transition-colors"
            title="Refresh Enquiries"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-red-500/20 text-[var(--text-secondary)] hover:text-red-400 border border-[var(--border-subtle)] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by venue name, contact or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'new', 'contacted', 'in_progress', 'quoted', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                statusFilter === st
                  ? 'bg-[#FF6A2A] text-white'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enquiry Cards List */}
        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
          {filteredEnquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--text-secondary)] bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)]">
              No matching enquiries found.
            </div>
          ) : (
            filteredEnquiries.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              return (
                <div
                  key={enq.id}
                  onClick={() => {
                    setSelectedEnquiry(enq);
                    setEditingNotes(enq.adminNotes || '');
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#FF6A2A] bg-[var(--bg-elevated)] shadow-md'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--text-primary)] font-display">
                      {enq.venueName}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono-nums uppercase ${
                        enq.status === 'new'
                          ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                          : enq.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-300'
                          : enq.status === 'quoted'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-white/10 text-[var(--text-secondary)]'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)]">
                    {enq.contactName} · {enq.venueType}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--text-secondary)] border-t border-white/5 pt-2">
                    <span className="font-mono-nums">{enq.budgetRange}</span>
                    <span>{new Date(enq.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Enquiry Detail Panel */}
        <div className="lg:col-span-7">
          {selectedEnquiry ? (
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl space-y-6">
              {/* Header and status dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
                    {selectedEnquiry.venueName}
                  </h3>
                  <span className="text-xs text-[var(--text-secondary)] font-mono-nums">
                    Enquiry ID: {selectedEnquiry.id} · Received {new Date(selectedEnquiry.submittedAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--text-secondary)]">Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value as any)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="quoted">Quoted</option>
                    <option value="completed">Completed / Signed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Delivery Audit Log */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Server email dispatched to <strong className="text-white">studioforkframe@gmail.com</strong>
                  </span>
                </div>
                <span className="font-mono-nums text-[11px] opacity-80">
                  {selectedEnquiry.deliveryStatus.toUpperCase()}
                </span>
              </div>

              {/* Client & Venue Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">
                    Contact Name
                  </span>
                  <span className="font-semibold text-[var(--text-primary)]">{selectedEnquiry.contactName}</span>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">
                    Email Address
                  </span>
                  <a href={`mailto:${selectedEnquiry.contactEmail}`} className="font-semibold text-[#FF6A2A] hover:underline truncate block">
                    {selectedEnquiry.contactEmail}
                  </a>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">
                    Phone / Mobile
                  </span>
                  <span className="font-semibold text-[var(--text-primary)] font-mono-nums">
                    {selectedEnquiry.contactPhone || 'Not provided'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">
                    Venue Category
                  </span>
                  <span className="font-semibold text-[var(--text-primary)]">{selectedEnquiry.venueType}</span>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">
                    Budget Target
                  </span>
                  <span className="font-semibold text-[var(--accent-champagne)] font-mono-nums">
                    {selectedEnquiry.budgetRange}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-elevated)]">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">
                    Timeline
                  </span>
                  <span className="font-semibold text-[var(--text-primary)]">{selectedEnquiry.timeline}</span>
                </div>
              </div>

              {/* Requested Services */}
              <div>
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                  Requested Capabilities ({selectedEnquiry.selectedServices.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedEnquiry.selectedServices.map((srv) => (
                    <span
                      key={srv}
                      className="px-3 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)]"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Notes */}
              {selectedEnquiry.notes && (
                <div>
                  <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                    Client Initial Notes
                  </span>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
                    {selectedEnquiry.notes}
                  </div>
                </div>
              )}

              {/* Private Admin Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Internal Studio Notes & Follow-ups
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    disabled={isUpdating}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#FF6A2A] hover:bg-[#e95620] text-white transition-all"
                  >
                    {isUpdating ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="Record quote amounts, client phone discussions, menu sample notes..."
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[var(--text-secondary)] bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]">
              Select an enquiry on the left to review proposal parameters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
