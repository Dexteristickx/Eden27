"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid PIN");
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 md:p-10 shadow-xl max-w-md w-full text-center relative overflow-hidden"
      >
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-serif text-foreground mb-2">Organizer Access</h1>
        <p className="text-foreground/70 text-sm mb-6">
          Enter your organizer PIN to access the event management portal and door check-in.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-pin" className="sr-only">
              Organizer PIN
            </label>
            <input
              id="admin-pin"
              type="password"
              inputMode="numeric"
              maxLength={12}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full bg-background border border-foreground/20 text-center text-2xl tracking-[0.5em] rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary font-mono"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !pin}
            className="w-full bg-primary text-white font-medium py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-foreground/10 flex justify-between items-center text-xs text-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">
            ← Return to Website
          </Link>
          <span className="flex items-center gap-1 text-primary">
            <ShieldCheck className="w-3.5 h-3.5" /> Protected Portal
          </span>
        </div>
      </motion.div>
    </div>
  );
}
