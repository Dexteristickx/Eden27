'use client';

import { useState } from 'react';
import { Calendar, Download, ChevronDown, ExternalLink } from 'lucide-react';

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startISO: string;  // e.g. "2026-12-30T10:00:00+01:00"
  endISO: string;    // e.g. "2026-12-30T14:00:00+01:00"
}

function toICSDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildICS(event: CalendarEvent): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EDEN27//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()}@eden27`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART;TZID=Africa/Lagos:${toICSDate(event.startISO)}`,
    `DTEND;TZID=Africa/Lagos:${toICSDate(event.endISO)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

function buildGoogleUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toICSDate(event.startISO)}/${toICSDate(event.endISO)}`,
    details: event.description,
    location: event.location,
    ctz: 'Africa/Lagos',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function AddToCalendar({ event }: { event: CalendarEvent }) {
  const [open, setOpen] = useState(false);

  const handleICS = () => {
    const blob = new Blob([buildICS(event)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/[^a-zA-Z0-9]/g, '-')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div className="relative inline-block mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 
                   border border-[#2c241b]/20 rounded-full text-[#2c241b]/80 
                   hover:bg-[#2c241b]/5 hover:text-[#2c241b] transition-all cursor-pointer font-sans"
        aria-expanded={open}
      >
        <Calendar className="w-3.5 h-3.5 text-primary" />
        <span>Add to Calendar</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div
            className="absolute top-full left-0 mt-2 z-40 bg-white 
                        rounded-xl shadow-xl border border-[#2c241b]/10 
                        overflow-hidden min-w-[200px]"
          >
            <button
              onClick={handleICS}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm 
                         text-[#2c241b] hover:bg-[#f9f6f0] transition-colors text-left cursor-pointer"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Apple / Outlook (.ics)</span>
            </button>
            <a
              href={buildGoogleUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm 
                         text-[#2c241b] hover:bg-[#f9f6f0] transition-colors 
                         border-t border-[#2c241b]/5 text-left"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
              <span>Google Calendar</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
