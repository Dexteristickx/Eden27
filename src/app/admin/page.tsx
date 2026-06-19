"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, CheckCircle, Ticket, Download, Settings } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRegistered: 0,
    vipRegistered: 0,
    checkedIn: 0,
  });
  const [guests, setGuests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this page would be protected by Supabase Auth middleware.
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .order('registered_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching guests:", error);
        return;
      }

      setGuests(data || []);
      
      const total = data?.length || 0;
      const vip = data?.filter(g => g.guest_type === 'vip').length || 0;
      const checked = data?.filter(g => g.checked_in).length || 0;
      
      setStats({
        totalRegistered: total,
        vipRegistered: vip,
        checkedIn: checked
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportCSV = () => {
    if (!guests.length) return;
    
    const headers = ["Full Name", "Phone", "Email", "Guest Type", "Seat Number", "Checked In", "Registered At"];
    const csvContent = [
      headers.join(","),
      ...guests.map(g => [
        `"${g.full_name}"`,
        `"${g.phone}"`,
        `"${g.email || ''}"`,
        g.guest_type,
        g.seat_number,
        g.checked_in,
        new Date(g.registered_at).toLocaleString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "wedding_guests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif text-foreground">Admin Dashboard</h1>
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-foreground/10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-foreground/60 font-medium">Total Registered</p>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-serif text-foreground">{stats.totalRegistered}</p>
          </div>
          
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-foreground/10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-foreground/60 font-medium">VIP Guests</p>
              <Ticket className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-serif text-foreground">{stats.vipRegistered}</p>
          </div>
          
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-foreground/10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-foreground/60 font-medium">Checked In (Door)</p>
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-serif text-foreground">{stats.checkedIn}</p>
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-sm border border-foreground/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-foreground/10 flex justify-between items-center bg-foreground/5">
            <h2 className="text-xl font-medium text-foreground">Recent Registrations</h2>
            <Settings className="w-5 h-5 text-foreground/60 cursor-pointer" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-foreground/5 text-foreground/60 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">Guest Name</th>
                  <th className="px-6 py-4 font-medium">Seat No.</th>
                  <th className="px-6 py-4 font-medium">Tier</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-foreground/60">Loading guests...</td>
                  </tr>
                ) : guests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-foreground/60">No guests registered yet.</td>
                  </tr>
                ) : (
                  guests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{guest.full_name}</p>
                        <p className="text-sm text-foreground/60">{guest.phone}</p>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-primary">
                        {guest.seat_number}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                          guest.guest_type === 'vip' ? 'bg-primary/20 text-primary' : 'bg-foreground/10 text-foreground'
                        }`}>
                          {guest.guest_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          guest.checked_in ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {guest.checked_in ? 'Checked In' : 'Pending'}
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
