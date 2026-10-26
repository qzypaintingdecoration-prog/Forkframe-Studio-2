import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const VENUE_TYPES = [
  'Independent Restaurant',
  'Takeaway / Fast Casual',
  'Café & Bakery',
  'Gastropub / Bar',
  'Dark Kitchen / Ghost Brand',
  'Multi-Unit Hospitality Group',
];

const AVAILABLE_SERVICES = [
  'Bespoke Website Development',
  'Digital Menus & QR Systems',
  'Direct Online Ordering (0% Commission)',
  'Web App & Loyalty Stamp Club',
  'Print-Ready Menus & Collateral',
  'Social Studio Creative & Campaigns',
  'Website Speed & SEO Tune-up',
];

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [venueName, setVenueName] = useState('');
  const [venueType, setVenueType] = useState(VENUE_TYPES[0]);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : [AVAILABLE_SERVICES[0]]
  );
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [timeline, setTimeline] = useState('Within 2–4 Weeks');
  const [budgetRange, setBudgetRange] = useState('£1,500 – £3,500');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== s));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!venueName.trim() || !contactName.trim() || !contactEmail.trim()) {
      setErrorMessage('Please fill in your Venue Name, Contact Name, and Email.');
      return;
    }

    if (!contactEmail.includes('@') || !contactEmail.includes('.')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venueName,
          venueType,
          selectedServices,
          contactName,
          contactEmail,
          contactPhone,
          currentUrl,
          timeline,
          budgetRange,
          notes,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit quote request.');
      }

      setSubmissionSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submissionSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">
              Quotation Request Received
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[var(--text-primary)]">{contactName}</strong>. Your enquiry for <strong className="text-[var(--text-primary)]">{venueName}</strong> has been secured in our administration system and dispatched to <span className="text-[#FF6A2A]">studioforkframe@gmail.com</span>.
            </p>
            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] max-w-md mx-auto text-xs text-left text-[var(--text-secondary)] space-y-1 font-mono-nums">
              <div className="flex justify-between">
                <span>Services:</span>
                <span className="text-[var(--text-primary)] font-semibold">{selectedServices.length} Selected</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Response:</span>
                <span className="text-emerald-400 font-semibold">&lt; 24 Hours</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#FF6A2A] hover:bg-[#e95620] text-white font-semibold text-sm transition-all"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6A2A]">
                <span>Forkframe Studio</span>
                <span aria-hidden="true" className="text-white/20">/</span>
                <span>Bespoke Project Proposal</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
                Request a Detailed Quotation
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Every quote is tailored directly to your food business model and revenue goals.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Venue Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Restaurant / Venue Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Copper Hearth Dining"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Venue Concept / Category
                </label>
                <select
                  value={venueType}
                  onChange={(e) => setVenueType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                >
                  {VENUE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Services required */}
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                Services You Require
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AVAILABLE_SERVICES.map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`px-3 py-2 text-left text-xs rounded-lg border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#FF6A2A] bg-[#FF6A2A]/10 text-white font-medium'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white'
                      }`}
                    >
                      <span className="truncate">{srv}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A2A] shrink-0 ml-1.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Hughes"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="marcus@copperhearth.co.uk"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+44 7..."
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>
            </div>

            {/* Step 4: Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Current Website / Instagram (if any)
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Desired Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                >
                  <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
                  <option value="Within 2–4 Weeks">Within 2–4 Weeks</option>
                  <option value="1–2 Months">1–2 Months</option>
                  <option value="Planning for New Launch">Planning for New Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Target Budget
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                >
                  <option value="£1,000 – £2,000">£1,000 – £2,000</option>
                  <option value="£2,000 – £4,000">£2,000 – £4,000</option>
                  <option value="£4,000 – £8,000+">£4,000 – £8,000+</option>
                  <option value="Monthly Retainer (£350/mo)">Monthly Retainer (£350/mo)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                Key Objectives or Special Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your menu, current pain points with third-party delivery apps, or upcoming seasonal promotions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Direct submission to studioforkframe@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium rounded-lg text-[var(--text-secondary)] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-semibold rounded-xl bg-[#FF6A2A] hover:bg-[#e95620] text-white shadow-lg shadow-[#FF6A2A]/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Securing Submission...' : 'Send Quotation Request'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
