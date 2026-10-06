"use client";

import React, { useState, useEffect } from "react";
import {
  DEFAULT_WHATSAPP_NUMBER,
  getStoredWhatsAppNumber,
  saveStoredWhatsAppNumber,
} from "../utils/whatsapp";

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [phone, setPhone] = useState<string>(DEFAULT_WHATSAPP_NUMBER);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setPhone(getStoredWhatsAppNumber());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const clean = phone.replace(/[^0-9]/g, "");
    if (clean.length >= 8) {
      saveStoredWhatsAppNumber(clean);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    }
  };

  const handleResetDefault = () => {
    setPhone(DEFAULT_WHATSAPP_NUMBER);
    saveStoredWhatsAppNumber(DEFAULT_WHATSAPP_NUMBER);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-botanical-lg border border-[#14422d]/10 overflow-hidden space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f4ef] text-[#414943] hover:text-[#14422d] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] flex items-center justify-center text-[#14422d] mb-2">
            <span className="material-symbols-outlined text-[22px]">settings</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#14422d] font-normal">
            WhatsApp Dispatch Settings
          </h3>
          <p className="text-xs text-[#536251] leading-relaxed">
            Configure the production clinic WhatsApp phone number receiving all incoming e-consultation dossiers.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-[#414943] uppercase tracking-wider block">
            Target WhatsApp Number (With Country Code)
          </label>
          <div className="relative">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 919845012345"
              className="w-full bg-[#f5f4ef] rounded-xl px-4 py-3 text-sm font-mono text-[#1b1c19] outline-none focus:bg-white focus:ring-2 focus:ring-[#14422d] transition-all"
            />
            <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-[#717973] text-[18px]">
              call
            </span>
          </div>
          <p className="text-[11px] text-[#717973]">
            Format: Country Code + Phone Number without special characters (e.g. 91 for India).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#f5f4ef] text-xs text-[#414943] space-y-1">
          <span className="font-bold text-[#14422d] block">⚡ Production Static Architecture:</span>
          <p className="text-[11px] leading-relaxed">
            Because this application is 100% static, it connects seamlessly through WhatsApp’s standard click-to-chat protocol without requiring servers, database subscriptions, or middleware.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-[#d4e4ce] text-[#14422d] text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Settings updated successfully!</span>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDefault}
            className="px-3 py-2 text-xs font-semibold text-[#717973] hover:text-[#14422d] transition-colors"
          >
            Reset Default
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#14422d]/20 text-[#14422d] font-semibold text-xs hover:bg-[#faf9f4]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[#14422d] text-white font-semibold text-xs hover:bg-[#2d5a43] shadow-sm transition-all"
            >
              Save Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
