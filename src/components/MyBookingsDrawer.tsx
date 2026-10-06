"use client";

import React, { useState, useEffect } from "react";
import { BookingDetails } from "../data/consultationData";
import { getLocalBookings, generateWhatsAppUrl } from "../utils/whatsapp";

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNewBookingClick: () => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  onNewBookingClick,
}) => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);

  useEffect(() => {
    if (isOpen) {
      setBookings(getLocalBookings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearHistory = () => {
    if (typeof window !== "undefined") {
      if (confirm("Clear local booking history on this device?")) {
        localStorage.removeItem("pranaveda_user_bookings");
        setBookings([]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-[#faf9f4] shadow-2xl border-l border-[#14422d]/10 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#14422d]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] text-[#14422d] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#14422d]">
                My Consultations
              </h3>
              <p className="text-xs text-[#536251]">Zero-login local device records</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f4ef] text-[#414943] hover:text-[#14422d] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#efeee9] text-[#717973] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">event_busy</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-medium text-[#1b1c19]">
                  No Bookings Recorded Yet
                </h4>
                <p className="text-xs text-[#536251] max-w-xs mx-auto">
                  When you submit an intake dossier, your consultation receipt will be preserved here automatically.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#14422d] text-white font-semibold text-xs hover:bg-[#2d5a43] transition-all shadow-sm"
              >
                Book Your First Session
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#717973]">
                <span>{bookings.length} Saved Receipts</span>
                <button
                  onClick={handleClearHistory}
                  className="hover:text-[#ba1a1a] transition-colors"
                >
                  Clear History
                </button>
              </div>

              {bookings.map((item, idx) => {
                const waUrl = generateWhatsAppUrl(item);
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#14422d]/10 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-[#c26d49]">
                          {item.bookingId}
                        </span>
                        <h4 className="font-serif text-base font-medium text-[#1b1c19]">
                          {item.selectedPackage}
                        </h4>
                        <p className="text-xs text-[#536251]">{item.selectedDoctor}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#d4e4ce] text-[#14422d] text-[10px] font-bold">
                        WhatsApp Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#414943] bg-[#f5f4ef] p-2.5 rounded-xl">
                      <div>
                        <span className="text-[#717973] block">Patient:</span>
                        <span className="font-semibold">{item.patientName}</span>
                      </div>
                      <div>
                        <span className="text-[#717973] block">Slot:</span>
                        <span className="font-semibold">{item.selectedSlot}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-sm text-[#14422d]">
                        ₹{item.packagePrice.toLocaleString("en-IN")}
                      </span>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#c26d49] hover:bg-[#843d1d] text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-all"
                      >
                        <span className="material-symbols-outlined text-[14px]">chat</span>
                        <span>Re-Open WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#14422d]/10 text-center">
          <button
            onClick={() => {
              onClose();
              onNewBookingClick();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#14422d] text-white font-semibold text-xs hover:bg-[#2d5a43] transition-all shadow-sm"
          >
            Create New Consultation Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
