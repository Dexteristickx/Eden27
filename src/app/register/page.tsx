"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  eventsAttending: z.array(z.string()).min(1, "Please select at least one event"),
  plusOnes: z.array(z.object({ name: z.string() })).max(3, "Max 3 plus ones"),
  dietaryNote: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ seatNumber: string, qrCode: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { eventsAttending: [], plusOnes: [] }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plusOnes"
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, guestType: "general" })
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || "Failed to register");
      }
      
      setSuccessData({ seatNumber: result.seatNumber, qrCode: result.qrCode });
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
          className="glass-card rounded-3xl p-8 md:p-12 shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h2 className="text-3xl font-serif text-foreground mb-4">You're Registered!</h2>
          <p className="text-foreground/80 mb-6">We can't wait to see you.</p>
          
          <div className="bg-background rounded-xl p-6 mb-6">
            <p className="text-sm uppercase tracking-wider text-foreground/60 mb-2">Your Seat Number</p>
            <p className="text-5xl font-serif text-primary">{successData.seatNumber}</p>
          </div>
          
          {successData.qrCode && (
            <div className="mt-6 flex justify-center">
              <Image src={successData.qrCode} alt="E-Ticket QR Code" width={200} height={200} className="rounded-lg shadow-sm" />
            </div>
          )}
          <p className="text-sm text-foreground/60 mt-4">Save this QR code to show at the entrance.</p>
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
          <h1 className="text-4xl font-serif text-primary mb-4">RSVP</h1>
          <p className="text-foreground/80">Fill out the form below to secure your seat.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-8 shadow-xl max-w-md w-full text-center"
        >
          {errorMsg && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{errorMsg}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                <input {...register("fullName")} className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary" />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                <input {...register("phone")} className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address (Optional)</label>
              <input type="email" {...register("email")} className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Events Attending *</label>
              <div className="space-y-3">
                {["Traditional Wedding", "Church & Reception"].map((evt) => (
                  <label key={evt} className="flex items-center gap-3">
                    <input type="checkbox" value={evt} {...register("eventsAttending")} className="w-5 h-5 text-primary focus:ring-primary border-foreground/20 rounded" />
                    <span className="text-foreground">{evt}</span>
                  </label>
                ))}
              </div>
              {errors.eventsAttending && <p className="text-red-500 text-sm mt-1">{errors.eventsAttending.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-foreground">Plus Ones</label>
                <button type="button" onClick={() => append({ name: "" })} className="text-primary text-sm font-medium">
                  + Add Guest
                </button>
              </div>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input {...register(`plusOnes.${index}.name`)} placeholder="Guest Full Name" className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                    <button type="button" onClick={() => remove(index)} className="text-red-500 text-sm font-medium px-2">Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Dietary Requirements / Note</label>
              <textarea {...register("dietaryNote")} rows={3} className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-medium text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Complete Registration"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
