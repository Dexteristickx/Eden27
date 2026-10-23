"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, CheckCircle, Ticket, Download, LogOut, QrCode, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSeatsAllocated: 0,
    maxSeats: 300,
    vipRegistered: 0,
    checkedIn: 0,
  });
  const [guests, setGuests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/guests");
      if (!res.ok) {
        console.error("Error fetching guests:", await res.text());
        return;
      }

      const { guests: data, totalSeatsAllocated, maxSeats } = await res.json();
      const guestList = data || [];
      setGuests(guestList);

      const vip = guestList.filter((g: any) => g.guest_type === "vip").length;
      const checked = guestList.filter((g: any) => g.checked_in).length;

      setStats({
        totalSeatsAllocated:
          typeof totalSeatsAllocated === "number"
            ? totalSeatsAllocated
            : guestList.reduce((acc: number, g: any) => acc + (g.seat_count || 1), 0),
        maxSeats: maxSeats || 300,
        vipRegistered: vip,
        checkedIn: checked,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportCSV = () => {
    if (!guests.length) return;

    const headers = [
      "Seat Number",
      "Seats Reserved",
      "Full Name",
      "Phone",
      "Email",
      "Guest Tier",
      "Events Attending",
      "Plus Ones",
      "Dietary / Wishes",
      "Checked In",
      "Registered At",
    ];
    const csvContent = [
      headers.join(","),
      ...guests.map((g) =>
        [
          `"${g.seat_number}"`,
          g.seat_count || 1,
          `"${g.full_name}"`,
          `"${g.phone}"`,
          `"${g.email || ""}"`,
          g.guest_type,
          `"${(g.events_attending || []).join("; ")}"`,
          `"${(g.plus_ones || []).map((p: any) => p.name).join("; ")}"`,
          `"${(g.dietary_note || "").replace(/"/g, '""')}"`,
          g.checked_in ? "YES" : "NO",
          `"${new Date(g.registered_at).toLocaleString()}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "eden27_reception_guests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const capacityPercent = Math.min(
    100,
    Math.round((stats.totalSeatsAllocated / stats.maxSeats) * 100)
  );

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-serif text-foreground">
              EDEN27 Reception & RSVP Admin
            </h1>
            <p className="text-sm text-foreground/60">
              300-Seat Ibadan Reception Allocation & Door Check-In Overview
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-1.5 border border-foreground/20 text-foreground/80 hover:text-primary px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer"
              title="Refresh guest list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              href="/admin/checkin"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <QrCode className="w-4 h-4" /> Door QR Check-In
            </Link>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors text-sm cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-foreground/20 text-foreground/80 hover:text-red-600 hover:border-red-300 px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-foreground/10">
            <div className="flex justify-between items-start mb-3">
              <p className="text-foreground/60 font-medium">
                Reception Seats Allocated
              </p>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-4xl font-serif text-foreground">
                {stats.totalSeatsAllocated}
              </p>
              <span className="text-lg text-foreground/50 font-serif">
                / {stats.maxSeats} seats
              </span>
            </div>
            <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <p className="text-xs text-foreground/60 mt-2">
              {stats.maxSeats - stats.totalSeatsAllocated} reception seats remaining
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-foreground/10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-foreground/60 font-medium">VIP Registrations</p>
              <Ticket className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-serif text-foreground">
              {stats.vipRegistered}
            </p>
            <p className="text-xs text-foreground/60 mt-4">
              Codes: EDEN27VIP, FAMILY27, BRIDE27, GROOM27
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-foreground/10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-foreground/60 font-medium">
                Checked In (Reception Door)
              </p>
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-serif text-foreground">
              {stats.checkedIn}
            </p>
            <p className="text-xs text-foreground/60 mt-4">
              Out of {guests.length} total RSVP parties
            </p>
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-foreground/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-foreground/10 flex justify-between items-center bg-foreground/5">
            <h2 className="text-xl font-medium text-foreground">
              Allocated Reception Guest List
            </h2>
            <span className="text-xs text-foreground/60">
              Auto-synced with Google Sheet Hook
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-foreground/5 text-foreground/60 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">Seat No.</th>
                  <th className="px-6 py-4 font-medium">Guest Details</th>
                  <th className="px-6 py-4 font-medium">Seats</th>
                  <th className="px-6 py-4 font-medium">Tier</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-foreground/60"
                    >
                      Loading guests...
                    </td>
                  </tr>
                ) : guests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-foreground/60"
                    >
                      No guests registered yet.
                    </td>
                  </tr>
                ) : (
                  guests.map((guest) => (
                    <tr
                      key={guest.id}
                      className="hover:bg-foreground/5 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-primary">
                        {guest.seat_number}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">
                          {guest.full_name}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {guest.phone} {guest.email ? `· ${guest.email}` : ""}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {guest.seat_count || 1}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                            guest.guest_type === "vip"
                              ? "bg-primary/20 text-primary"
                              : "bg-foreground/10 text-foreground"
                          }`}
                        >
                          {guest.guest_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            guest.checked_in
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {guest.checked_in ? "Checked In" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">
                        {new Date(guest.registered_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
