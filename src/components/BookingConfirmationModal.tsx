"use client";

import React, { useState } from "react";
import { BookingDetails } from "../data/consultationData";
import { generateWhatsAppUrl, formatWhatsAppMessage } from "../utils/whatsapp";

interface BookingConfirmationModalProps {
  booking: BookingDetails | null;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onViewAllBookings,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!booking) return null;

  const waUrl = generateWhatsAppUrl(booking);
  const formattedText = formatWhatsAppMessage(booking);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-botanical-lg border border-[#14422d]/10 overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f4ef] text-[#414943] hover:text-[#14422d] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Success Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#d4e4ce] text-[#14422d] flex items-center justify-center mx-auto shadow-sm animate-pulse-subtle">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#536251] block">
            Dossier Compiled Successfully
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#14422d] font-normal">
            Booking Dispatched to WhatsApp
          </h2>
          <div className="inline-block px-3 py-1 rounded-full bg-[#f5f4ef] text-[#14422d] font-mono text-xs font-bold">
            Ref: {booking.bookingId}
          </div>
        </div>

        {/* Structured Summary Card */}
        <div className="p-4 rounded-2xl bg-[#f5f4ef] border border-[#14422d]/10 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#14422d]/10">
            <span className="text-[#717973]">Patient Name:</span>
            <span className="font-bold text-[#1b1c19]">{booking.patientName}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#14422d]/10">
            <span className="text-[#717973]">Program / Package:</span>
            <span className="font-bold text-[#14422d]">{booking.selectedPackage}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#14422d]/10">
            <span className="text-[#717973]">Assigned Doctor:</span>
            <span className="font-semibold text-[#1b1c19]">{booking.selectedDoctor}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#14422d]/10">
            <span className="text-[#717973]">Slot & Mode:</span>
            <span className="font-semibold text-[#1b1c19]">
              {booking.selectedSlot} • {booking.consultationMode}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#14422d]/10">
            <span className="text-[#717973]">Metabolic Agni:</span>
            <span className="font-semibold text-[#14422d]">{booking.agniStatus}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#717973]">Total Consultation Fee:</span>
            <span className="font-bold text-sm text-[#14422d]">
              ₹{booking.packagePrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="p-4 rounded-2xl bg-[#d4e4ce]/40 border border-[#14422d]/15 text-xs text-[#14422d] space-y-1.5">
          <span className="font-bold block flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">info</span>
            What Happens Next?
          </span>
          <p className="leading-relaxed text-[11px] text-[#414943]">
            1. Click below to open your pre-filled WhatsApp conversation with our doctor triage desk.
            <br />
            2. Our senior naturopath will confirm your slot within 10 minutes and provide your direct HD Video Consultation link.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-xl bg-[#c26d49] hover:bg-[#843d1d] active:scale-95 text-white font-bold text-base shadow-terracotta transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            <span>Open WhatsApp Chat Now</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl border border-[#14422d]/20 text-[#14422d] font-semibold text-xs hover:bg-[#f5f4ef] flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? "done" : "content_copy"}
              </span>
              <span>{copied ? "Copied!" : "Copy Text"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl border border-[#14422d]/20 text-[#14422d] font-semibold text-xs hover:bg-[#f5f4ef] flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Dossier</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onViewAllBookings();
            }}
            className="w-full py-2 text-xs font-semibold text-[#536251] hover:text-[#14422d] transition-colors"
          >
            View in My Consultation History
          </button>
        </div>
      </div>
    </div>
  );
};
