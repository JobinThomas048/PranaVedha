"use client";

import React from "react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDoshaModal: () => void;
  onOpenWhatsAppConfig: () => void;
  onOpenBookingsDrawer: () => void;
  savedBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDoshaModal,
  onOpenWhatsAppConfig,
  onOpenBookingsDrawer,
  savedBookingsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf9f4]/90 backdrop-blur-md border-b border-[#14422d]/10 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#14422d] text-[#bceecf] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a1d1b4] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Morning Sattva Phase • Ritu: Shishira
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-white/90">
              3 Senior BNYS Naturopaths Online Now
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-white/80">
              Zero Login • Direct WhatsApp Booking
            </span>
            <button
              onClick={onOpenWhatsAppConfig}
              className="text-[#bceecf] hover:text-white flex items-center gap-1 transition-colors text-[11px] underline underline-offset-2"
              title="Configure WhatsApp Destination Phone"
            >
              <span className="material-symbols-outlined text-[14px]">settings</span>
              <span>WhatsApp Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Title */}
          <div
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Authentic SVG Logo from Stitch */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#faf9f4] p-0.5 shadow-sm border border-[#14422d]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="none"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="#F4F7F4"
                  stroke="#2D5A43"
                  strokeWidth="2.5"
                />
                <path
                  d="M50 18 C35 34 26 50 30 68 C33 78 43 83 50 82 C57 83 67 78 70 68 C74 50 65 34 50 18 Z"
                  fill="#2D5A43"
                  opacity="0.9"
                />
                <path
                  d="M50 25 C50 50 42 66 38 74"
                  stroke="#E8EFE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M50 42 C56 46 62 52 64 60"
                  stroke="#E8EFE9"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M50 54 C45 58 41 64 40 70"
                  stroke="#E8EFE9"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="22" r="3" fill="#D4A373" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl text-[#14422d] font-semibold tracking-tight">
                  Prakriti
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#d4e4ce] text-[#14422d]">
                  PranaVeda
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#536251] font-medium tracking-wide">
                Naturopathy & Holistic E-Consultation
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: "dashboard" },
              { id: "packages", label: "Packages", icon: "spa" },
              { id: "form", label: "Book Consultation", icon: "edit_calendar" },
              { id: "benefits", label: "Pillars & Elements", icon: "all_inclusive" },
              { id: "stories", label: "Client Stories", icon: "format_quote" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#14422d] text-white shadow-sm"
                      : "text-[#414943] hover:text-[#14422d] hover:bg-[#efeee9]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dosha Quiz Button */}
            <button
              onClick={onOpenDoshaModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#ffdbce] text-[#662708] hover:bg-[#ffb598] transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">psychology_alt</span>
              <span>Dosha Quiz (2m)</span>
            </button>

            {/* My Bookings History Button */}
            <button
              onClick={onOpenBookingsDrawer}
              className="relative p-2 rounded-lg text-[#536251] hover:text-[#14422d] hover:bg-[#efeee9] transition-all"
              title="View My Bookings on This Device"
              aria-label="My Bookings"
            >
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
              {savedBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c26d49] text-white text-[11px] font-bold flex items-center justify-center shadow">
                  {savedBookingsCount}
                </span>
              )}
            </button>

            {/* Book Now Primary CTA */}
            <button
              onClick={() => setActiveTab("form")}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-[#14422d] text-white hover:bg-[#2d5a43] active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <span>Book Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Secondary Sub-navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 gap-2 border-t border-[#14422d]/5 bg-[#f5f4ef] no-scrollbar">
        {[
          { id: "dashboard", label: "Dashboard", icon: "dashboard" },
          { id: "packages", label: "Packages", icon: "spa" },
          { id: "form", label: "Intake Dossier", icon: "edit_calendar" },
          { id: "benefits", label: "Pillars", icon: "all_inclusive" },
          { id: "stories", label: "Stories", icon: "format_quote" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#14422d] text-white"
                : "bg-[#efeee9] text-[#414943] hover:text-[#14422d]"
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          onClick={onOpenDoshaModal}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-semibold bg-[#ffdbce] text-[#662708]"
        >
          <span className="material-symbols-outlined text-[15px]">psychology_alt</span>
          <span>Quiz</span>
        </button>
      </div>
    </header>
  );
};
