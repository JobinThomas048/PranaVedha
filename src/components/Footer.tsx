"use client";

import React from "react";
import { getStoredWhatsAppNumber } from "../utils/whatsapp";

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenDoshaModal: () => void;
  onOpenWhatsAppConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDoshaModal,
  onOpenWhatsAppConfig,
}) => {
  const currentYear = new Date().getFullYear();
  const phone = getStoredWhatsAppNumber();

  return (
    <footer className="mt-16 bg-[#14422d] text-white border-t border-[#2d5a43]">
      {/* Top Banner Notice */}
      <div className="bg-[#2d5a43] py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#bceecf]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Registered Under Central Council of Indian Medicine & Ministry of AYUSH Guidelines</span>
          </div>
          <a
            href={`https://api.whatsapp.com/send?phone=${phone}&text=Hello%20Dr.%20PranaVeda,%20I%20have%20an%20urgent%20naturopathy%20consultation%20query.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c26d49] hover:bg-[#843d1d] text-white font-semibold transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Direct WhatsApp Desk: +{phone}</span>
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf9f4] p-0.5 border border-[#14422d]/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="46" fill="#F4F7F4" stroke="#2D5A43" strokeWidth="2.5" />
                  <path
                    d="M50 18 C35 34 26 50 30 68 C33 78 43 83 50 82 C57 83 67 78 70 68 C74 50 65 34 50 18 Z"
                    fill="#2D5A43"
                    opacity="0.9"
                  />
                  <path d="M50 25 C50 50 42 66 38 74" stroke="#E8EFE9" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="50" cy="22" r="3" fill="#D4A373" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block">
                  Prakriti
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#a1d1b4]">
                  PranaVeda Naturopathy
                </span>
              </div>
            </div>
            <p className="text-xs text-[#a1d1b4] leading-relaxed">
              Clinical naturopathy and Ayurvedic synergy. Non-invasive root-cause reversal with AYUSH-certified medical practitioners.
            </p>
          </div>

          {/* Quick Gateways */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#bceecf]">
              Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#d7e7d1]">
              <li>
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="hover:text-white transition-colors"
                >
                  Holistic Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("packages")}
                  className="hover:text-white transition-colors"
                >
                  Consultation Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("form")}
                  className="hover:text-white transition-colors"
                >
                  E-Consultation Intake Form
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDoshaModal}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>2-Min Dosha Quiz</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c26d49] text-white">Free</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Sanctuary Hubs */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#bceecf]">
              Regional Dispensaries
            </h4>
            <ul className="space-y-2 text-xs text-[#d7e7d1]">
              <li>Bangalore Central: Indiranagar 100ft Rd</li>
              <li>Delhi NCR Shala: Greater Kailash II</li>
              <li>Mumbai Sanctuary: Pali Hill, Bandra</li>
              <li>Pan-India & Global Express Courier</li>
            </ul>
          </div>

          {/* System & Dispatch Config */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#bceecf]">
              System Configuration
            </h4>
            <p className="text-xs text-[#a1d1b4] leading-relaxed">
              Zero-login static Next.js production build with direct client-side WhatsApp webhook bridge.
            </p>
            <button
              onClick={onOpenWhatsAppConfig}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#bceecf] text-xs font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>Edit Clinic WhatsApp Number</span>
            </button>
          </div>
        </div>

        {/* Medical Emergency Disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/10 space-y-3">
          <p className="text-[11px] text-[#a1d1b4]/80 leading-relaxed">
            <span className="font-bold text-white">Medical Disclaimer:</span> Naturopathy and yogic sciences support the body’s innate healing capabilities through lifestyle re-alignment, nutrition, and non-invasive therapies. In the event of acute emergencies, severe trauma, or life-threatening symptoms, immediately contact emergency medical services (dial 112 in India or your local equivalent) or visit the nearest hospital casualty emergency department.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#a1d1b4]/70 pt-2">
            <span>© {currentYear} PranaVeda Prakriti. All Rights Reserved.</span>
            <span>Static Next.js Web App • Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
