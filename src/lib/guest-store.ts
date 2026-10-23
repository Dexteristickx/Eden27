import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface PlusOne {
  name: string;
}

export interface GuestRecord {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  guest_type: 'general' | 'vip';
  seat_number: string;
  seat_count: number;
  events_attending: string[];
  plus_ones: PlusOne[];
  dietary_note: string;
  vip_code_used: string | null;
  checked_in: boolean;
  checked_in_at?: string | null;
  registered_at: string;
}

interface GuestStoreData {
  nextSeatIndex: number;
  guests: GuestRecord[];
}

export const MAX_RECEPTION_SEATS = Number(
  process.env.RECEPTION_SEAT_CAPACITY || 300
);

const DEFAULT_VIP_CODES: Record<string, { label: string; maxUses: number }> = {
  EDEN27VIP: { label: 'VIP Guest of Honour', maxUses: 60 },
  FAMILY27: { label: 'Parents & Immediate Family', maxUses: 40 },
  BRIDE27: { label: "Bride's Special VIP", maxUses: 30 },
  GROOM27: { label: "Groom's Special VIP", maxUses: 30 },
};

function getDataFilePath(): string {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'guests.json');
}

function readStore(): GuestStoreData {
  try {
    const filePath = getDataFilePath();
    if (!fs.existsSync(filePath)) {
      return { nextSeatIndex: 1, guests: [] };
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      nextSeatIndex: Number(parsed.nextSeatIndex || 1),
      guests: Array.isArray(parsed.guests) ? parsed.guests : [],
    };
  } catch (err) {
    console.error('Error reading guest store:', err);
    return { nextSeatIndex: 1, guests: [] };
  }
}

function writeStore(store: GuestStoreData): void {
  const filePath = getDataFilePath();
  fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf-8');
}

export function getAllocatedSeatsCount(guests?: GuestRecord[]): number {
  const list = guests ?? readStore().guests;
  return list.reduce((sum, g) => sum + (Number(g.seat_count) || 1), 0);
}

export function verifyLocalVipCode(rawCode: string): {
  valid: boolean;
  label?: string;
  error?: string;
} {
  const code = (rawCode || '').trim().toUpperCase();
  const config = DEFAULT_VIP_CODES[code];
  if (!config) {
    return { valid: false, error: 'Invalid VIP access code.' };
  }
  const store = readStore();
  const usedCount = store.guests.filter(
    (g) => (g.vip_code_used || '').toUpperCase() === code
  ).length;
  if (usedCount >= config.maxUses) {
    return {
      valid: false,
      error: 'This VIP code has reached its maximum usage limit.',
    };
  }
  return { valid: true, label: config.label };
}

export function registerGuestInStore(input: {
  fullName: string;
  phone: string;
  email?: string;
  guestType?: 'general' | 'vip';
  eventsAttending?: string[];
  plusOnes?: PlusOne[];
  dietaryNote?: string;
  vipCode?: string | null;
}): {
  guest: GuestRecord;
  alreadyRegistered: boolean;
  totalSeatsAllocated: number;
  maxSeats: number;
} {
  const store = readStore();
  const normalizedPhone = input.phone.replace(/\s+/g, '');
  const normalizedEmail = (input.email || '').trim().toLowerCase();

  // Check if guest already registered by phone or email so we don't double-allocate out of 300 seats
  const existing = store.guests.find(
    (g) =>
      g.phone.replace(/\s+/g, '') === normalizedPhone ||
      (normalizedEmail && g.email.toLowerCase() === normalizedEmail)
  );

  if (existing) {
    return {
      guest: existing,
      alreadyRegistered: true,
      totalSeatsAllocated: getAllocatedSeatsCount(store.guests),
      maxSeats: MAX_RECEPTION_SEATS,
    };
  }

  const validPlusOnes = (input.plusOnes || []).filter(
    (p) => p && typeof p.name === 'string' && p.name.trim().length > 0
  );
  const partySize = 1 + validPlusOnes.length;

  const currentAllocated = getAllocatedSeatsCount(store.guests);
  const remaining = MAX_RECEPTION_SEATS - currentAllocated;

  if (remaining <= 0) {
    throw new Error(
      `Reception seating is now full (${MAX_RECEPTION_SEATS}/${MAX_RECEPTION_SEATS} seats allocated).`
    );
  }

  if (partySize > remaining) {
    throw new Error(
      `Only ${remaining} reception seat(s) remaining out of ${MAX_RECEPTION_SEATS}. Please reduce your plus-ones.`
    );
  }

  const guestType = input.guestType === 'vip' ? 'vip' : 'general';
  if (guestType === 'vip' && input.vipCode) {
    const check = verifyLocalVipCode(input.vipCode);
    if (!check.valid) {
      throw new Error(check.error || 'Invalid VIP code');
    }
  }

  const prefix = guestType === 'vip' ? 'VIP' : 'R';
  const startSeat = store.nextSeatIndex;
  const endSeat = startSeat + partySize - 1;

  const formatNum = (n: number) => String(n).padStart(3, '0');
  const seatNumber =
    partySize === 1
      ? `${prefix}-${formatNum(startSeat)}`
      : `${prefix}-${formatNum(startSeat)} to ${prefix}-${formatNum(endSeat)}`;

  const newGuest: GuestRecord = {
    id: crypto.randomUUID(),
    full_name: input.fullName.trim(),
    phone: input.phone.trim(),
    email: (input.email || '').trim(),
    guest_type: guestType,
    seat_number: seatNumber,
    seat_count: partySize,
    events_attending: input.eventsAttending || [],
    plus_ones: validPlusOnes,
    dietary_note: (input.dietaryNote || '').trim(),
    vip_code_used: input.vipCode ? input.vipCode.trim().toUpperCase() : null,
    checked_in: false,
    checked_in_at: null,
    registered_at: new Date().toISOString(),
  };

  store.nextSeatIndex = endSeat + 1;
  store.guests.unshift(newGuest);
  writeStore(store);

  return {
    guest: newGuest,
    alreadyRegistered: false,
    totalSeatsAllocated: currentAllocated + partySize,
    maxSeats: MAX_RECEPTION_SEATS,
  };
}

export function listGuestsFromStore(): {
  guests: GuestRecord[];
  totalSeatsAllocated: number;
  maxSeats: number;
} {
  const store = readStore();
  return {
    guests: store.guests,
    totalSeatsAllocated: getAllocatedSeatsCount(store.guests),
    maxSeats: MAX_RECEPTION_SEATS,
  };
}

export function searchGuestInStore(rawQuery: string): GuestRecord | null {
  const q = (rawQuery || '').trim().toLowerCase();
  if (!q) return null;
  const store = readStore();
  return (
    store.guests.find(
      (g) =>
        g.id.toLowerCase() === q ||
        g.seat_number.toLowerCase() === q ||
        g.seat_number.toLowerCase().includes(q) ||
        g.full_name.toLowerCase().includes(q) ||
        g.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''))
    ) || null
  );
}

export function checkInGuestInStore(guestId: string): GuestRecord | null {
  const store = readStore();
  const idx = store.guests.findIndex((g) => g.id === guestId);
  if (idx === -1) return null;
  store.guests[idx].checked_in = true;
  store.guests[idx].checked_in_at = new Date().toISOString();
  writeStore(store);
  return store.guests[idx];
}

export async function triggerGoogleSheetWebhook(
  payload: Record<string, any>
): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.includes('placeholder')) {
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.error('Google Sheet Webhook error:', err);
    return false;
  }
}
