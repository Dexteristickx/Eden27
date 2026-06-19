"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "Can I bring a plus one?",
    answer: "Due to venue capacity constraints, we can only accommodate guests who are formally invited and listed on your registration form. Please check your invitation or RSVP form for details on your allowed guests."
  },
  {
    question: "What is the dress code?",
    answer: "Please see our dedicated Dress Code page for detailed information on what to wear to both the traditional and white wedding events."
  },
  {
    question: "Are children allowed?",
    answer: "While we love your little ones, our wedding will be an adults-only event to allow everyone to relax and celebrate with us."
  },
  {
    question: "What time should I arrive?",
    answer: "We recommend arriving at least 30 minutes before the scheduled start time of each event to allow time for parking, seating, and check-in."
  },
  {
    question: "Do I need to print my registration ticket?",
    answer: "No need to print! Once you register, you will receive an email with a QR code. Simply show that QR code on your phone at the entrance for quick check-in."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Q&A</h1>
          <p className="text-lg text-foreground/80">
            Common questions about our wedding weekend.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-md border border-foreground/5"
            >
              <h3 className="text-xl font-medium text-foreground mb-3">{faq.question}</h3>
              <p className="text-foreground/80 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
