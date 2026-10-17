'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Building2, Landmark } from 'lucide-react';

export interface BankAccount {
  label: string;          // e.g. "Naira Account" or "USD Account (Diaspora)"
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: string;       // e.g. "NGN", "USD", "GBP"
  flag: string;           // emoji flag, e.g. "🇳🇬", "🇺🇸"
  note?: string;          // optional helper text
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs uppercase 
                 tracking-wider text-primary hover:text-[#2c241b] 
                 transition-colors px-2.5 py-1 rounded-md bg-primary/10 hover:bg-primary/20 cursor-pointer font-sans font-medium"
      aria-label={`Copy account number ${text}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-600">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default function BankTransferCard({
  accounts,
}: {
  accounts: BankAccount[];
}) {
  return (
    <section className="py-12 px-4 w-full">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Landmark className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
            Cash Gift & Bank Transfer
          </h2>
          <p className="text-sm text-foreground/70 max-w-md mx-auto leading-relaxed">
            Your presence is the greatest gift of all. However, if you wish to bless 
            the couple with a monetary gift, here are the bank details.
          </p>
        </motion.div>

        {/* Account Cards */}
        <div className="grid gap-5 sm:grid-cols-2 text-left">
          {accounts.map((acct, i) => (
            <motion.div
              key={acct.label + acct.currency}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative glass-card rounded-2xl p-6 shadow-sm 
                         hover:shadow-md transition-shadow border border-foreground/10"
            >
              {/* Flag + Label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl" role="img" aria-label={acct.currency}>{acct.flag}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans font-semibold">
                  {acct.label}
                </span>
              </div>

              {/* Bank Name */}
              <div className="flex items-center gap-2 text-sm text-foreground/70 mb-3 font-medium">
                <Building2 className="w-4 h-4 text-primary shrink-0" />
                <span>{acct.bankName}</span>
              </div>

              {/* Account Name */}
              <div className="mb-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/50 mb-0.5 font-sans">
                  Account Name
                </p>
                <p className="text-sm font-medium text-foreground">
                  {acct.accountName}
                </p>
              </div>

              {/* Account Number + Copy */}
              <div className="mb-3">
                <p className="text-[10px] uppercase tracking-wider text-foreground/50 mb-0.5 font-sans">
                  Account Number
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-mono text-foreground font-semibold tracking-wider">
                    {acct.accountNumber}
                  </p>
                  <CopyButton text={acct.accountNumber} />
                </div>
              </div>

              {/* Optional Note */}
              {acct.note && (
                <p className="text-[11px] text-foreground/60 italic border-t border-foreground/10 pt-3 mt-2">
                  {acct.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Aso-Ebi Reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-foreground/50 mt-8"
        >
          For Aso-Ebi fabric payments, please see the{' '}
          <a href="/dress-code" className="text-primary underline underline-offset-2 hover:text-foreground transition-colors">
            Dress Code page
          </a>{' '}
          for dedicated package and account details.
        </motion.p>
      </div>
    </section>
  );
}
