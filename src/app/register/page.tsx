"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import TicketCardDownload from "@/components/TicketCardDownload";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Please enter a valid email address so we can send your seat number"),
  eventsAttending: z.array(z.string()).min(1, "Please select at least one event"),
  plusOnes: z.array(z.object({ name: z.string() })).max(3, "Max 3 plus ones"),
  dietaryNote: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    fullName: string;
    seatNumber: string;
    seatCount: number;
    qrCode: string;
    alreadyRegistered?: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { eventsAttending: [], plusOnes: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plusOnes",
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, guestType: "general" }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to register");
      }

      setSuccessData({
        fullName: result.fullName || data.fullName,
        seatNumber: result.seatNumber,
        seatCount: result.seatCount || 1,
        qrCode: result.qrCode,
        alreadyRegistered: result.alreadyRegistered,
      });
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="min-h-screen bg-background py-20 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 md:p-12 shadow-xl max-w-lg w-full text-center border border-primary/20"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>
          <h2 className="text-3xl font-serif text-foreground mb-2">
            {successData.alreadyRegistered
              ? "Your Reception Seat Is Confirmed!"
              : "You're Registered!"}
          </h2>
          <p className="text-foreground/80 mb-6 text-sm">
            We have recorded your RSVP and sent a copy of your Reception Seat Pass to your email.
          </p>

          <div className="bg-background rounded-2xl p-6 mb-6 border border-primary/20">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 mb-2">
              Allocated Reception Seat Number
            </p>
            <p className="text-5xl font-serif text-primary font-bold">
              {successData.seatNumber}
            </p>
            <p className="text-xs text-foreground/60 mt-2">
              {successData.seatCount} Seat(s) Reserved · December 31, 2026 · Ibadan
            </p>
          </div>

          {successData.qrCode && (
            <div className="mt-6 flex justify-center">
              <Image
                src={successData.qrCode}
                alt="E-Ticket QR Code"
                width={200}
                height={200}
                className="rounded-xl shadow-sm border border-foreground/10"
              />
            </div>
          )}

          {successData.qrCode && (
            <div className="mt-6 flex justify-center">
              <TicketCardDownload
                fullName={successData.fullName}
                seatNumber={successData.seatNumber}
                seatCount={successData.seatCount}
                guestType="general"
                qrCodeDataUrl={successData.qrCode}
              />
            </div>
          )}
          <p className="text-xs text-foreground/60 mt-4">
            Save this pass on your phone to present at the Reception entrance in Ibadan.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            RSVP & Reception Seat Allocation
          </h1>
          <p className="text-foreground/80 max-w-xl mx-auto">
            Complete the form below to confirm your attendance in{" "}
            <strong>Ibadan</strong> and receive your allocated{" "}
            <strong>Reception Seat Number</strong> via email and instant download.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-10 shadow-xl w-full text-left"
        >
          {errorMsg && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg"
              role="alert"
            >
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="e.g. Oluwaseun Adeleke"
                  className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-foreground"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone Number (WhatsApp) *
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="e.g. +234 801 234 5678"
                  className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-foreground"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address *{" "}
                <span className="text-foreground/60 text-xs font-normal">
                  (Your allocated Reception Seat Number & E-Ticket will be emailed here)
                </span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="e.g. seun@example.com"
                className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-foreground"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <span className="block text-sm font-medium text-foreground mb-3">
                Events Attending in Ibadan *
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "evt-trad",
                    label: "Traditional Wedding (Dec 30 · Ibadan)",
                  },
                  {
                    id: "evt-church",
                    label: "Church & Reception (Dec 31 · Ibadan)",
                  },
                ].map((evt) => (
                  <label
                    key={evt.id}
                    htmlFor={evt.id}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-foreground/10 bg-background/50 hover:bg-background cursor-pointer transition-colors"
                  >
                    <input
                      id={evt.id}
                      type="checkbox"
                      value={evt.label}
                      {...register("eventsAttending")}
                      className="w-5 h-5 accent-primary text-primary focus:ring-primary rounded"
                    />
                    <span className="text-foreground text-sm font-medium">
                      {evt.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.eventsAttending && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eventsAttending.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Accompanying Guests / Plus-Ones (Up to 3)
                </label>
                {fields.length < 3 && (
                  <button
                    type="button"
                    onClick={() => append({ name: "" })}
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 cursor-pointer"
                  >
                    + Add Guest Seat
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      id={`plusOne-${index}`}
                      aria-label={`Plus one guest ${index + 1} full name`}
                      {...register(`plusOnes.${index}.name`)}
                      placeholder={`Guest ${index + 1} Full Name`}
                      className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium px-3 border border-red-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="dietaryNote"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Dietary Requirements / Well-Wishes for the Couple
              </label>
              <textarea
                id="dietaryNote"
                {...register("dietaryNote")}
                placeholder="Any allergies, dietary preferences, or a prayer/wish for Oluwadunsin & Ololade..."
                rows={3}
                className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-foreground resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-medium text-lg py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting
                ? "Allocating Your Reception Seat..."
                : "Complete RSVP & Get Seat Number"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
