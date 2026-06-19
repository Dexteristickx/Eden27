"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Search, QrCode, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckIn() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSearchResult(null);
    setIsProcessing(true);

    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .or(`seat_number.eq.${searchQuery},full_name.ilike.%${searchQuery}%`)
        .limit(1)
        .single();

      if (error || !data) {
        throw new Error("Guest not found.");
      }

      setSearchResult(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckIn = async () => {
    if (!searchResult) return;
    setIsProcessing(true);
    
    try {
      const { error } = await supabase
        .from('guests')
        .update({ checked_in: true })
        .eq('id', searchResult.id);

      if (error) throw error;
      
      setSearchResult({ ...searchResult, checked_in: true });
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <QrCode className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-serif text-foreground">Guest Check-In</h1>
          <p className="text-foreground/80">Scan QR or manually search by seat number / name.</p>
        </div>

        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-foreground/10 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Seat No. (e.g. A-001) or Name"
              className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
            />
            <button 
              type="submit"
              disabled={isProcessing || !searchQuery}
              className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-5 h-5" /> Search
            </button>
          </form>
          {errorMsg && <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>}
        </div>

        {searchResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-8 border-2 shadow-xl ${
              searchResult.checked_in 
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                : "bg-white dark:bg-black/40 border-primary/20"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-serif font-medium text-foreground">{searchResult.full_name}</h2>
                <p className="text-foreground/60">{searchResult.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm uppercase tracking-wider text-foreground/60 mb-1">Seat</p>
                <p className="text-3xl font-mono text-primary font-bold">{searchResult.seat_number}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-background/50 p-3 rounded-lg border border-foreground/5">
                <p className="text-foreground/60 mb-1">Tier</p>
                <p className="font-medium uppercase">{searchResult.guest_type}</p>
              </div>
              <div className="bg-background/50 p-3 rounded-lg border border-foreground/5">
                <p className="text-foreground/60 mb-1">Plus Ones</p>
                <p className="font-medium">{searchResult.plus_ones?.length || 0}</p>
              </div>
            </div>

            {searchResult.checked_in ? (
              <div className="flex items-center justify-center gap-3 text-green-600 bg-green-100 p-4 rounded-xl">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium text-lg">Already Checked In</span>
              </div>
            ) : (
              <button 
                onClick={handleCheckIn}
                disabled={isProcessing}
                className="w-full bg-primary text-white py-4 rounded-xl text-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-6 h-6" />
                Check In Guest
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
