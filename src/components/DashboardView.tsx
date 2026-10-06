"use client";

import React, { useState } from "react";
import { DOCTORS, Doctor } from "../data/consultationData";

interface DashboardViewProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onNavigateToForm: () => void;
  onNavigateToPackages: () => void;
  onOpenDoshaModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectDoctor,
  onNavigateToForm,
  onNavigateToPackages,
  onOpenDoshaModal,
}) => {
  // Interactive Vitality Tracker state
  const [copperWater, setCopperWater] = useState(1.8);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [pranayamaMins, setPranayamaMins] = useState(20);
  const [isAgniResetDone, setIsAgniResetDone] = useState(true);

  const calculateSyncScore = () => {
    let score = 50;
    if (copperWater >= 2.0) score += 15;
    if (sleepHours >= 7) score += 15;
    if (pranayamaMins >= 15) score += 10;
    if (isAgniResetDone) score += 10;
    return Math.min(100, score);
  };

  const syncScore = calculateSyncScore();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome & Circadian Phase Header */}
      <section className="bg-gradient-to-br from-[#f5f4ef] via-[#efeee9] to-[#faf9f4] rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-botanical relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#d4e4ce]/30 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4e4ce]/80 text-[#14422d] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#14422d] animate-pulse"></span>
              <span>Morning Sattva Phase • Vis Medicatrix Naturae</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#14422d] font-normal tracking-tight">
              Namaste, Seeker of Balance
            </h1>
            <p className="text-sm sm:text-base text-[#414943] max-w-xl leading-relaxed">
              Restore your body’s natural self-healing vitality through personalized Ayurvedic Dinacharya, herbal nutrition, and zero-drug clinical naturopathy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenDoshaModal}
              className="px-4 py-3 rounded-xl bg-white border border-[#14422d]/20 text-[#14422d] font-semibold text-xs sm:text-sm hover:bg-[#faf9f4] shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#c26d49]">psychology_alt</span>
              <span>Discover Your Prakriti</span>
            </button>
            <button
              onClick={onNavigateToForm}
              className="px-5 py-3 rounded-xl bg-[#14422d] text-white font-semibold text-xs sm:text-sm hover:bg-[#2d5a43] shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Instant Consultation</span>
            </button>
          </div>
        </div>

        {/* Circadian Vitality Status Ribbon */}
        <div className="mt-6 pt-6 border-t border-[#14422d]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#414943]">
            <span className="material-symbols-outlined text-[#14422d] text-[20px]">wb_twilight</span>
            <div>
              <span className="text-[11px] text-[#717973] block">Active Ritu</span>
              <span className="font-semibold text-[#14422d]">Shishira (Late Winter)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#414943]">
            <span className="material-symbols-outlined text-[#14422d] text-[20px]">eco</span>
            <div>
              <span className="text-[11px] text-[#717973] block">Prevailing Dosha</span>
              <span className="font-semibold text-[#14422d]">Vata-Kapha Balance</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#414943]">
            <span className="material-symbols-outlined text-[#14422d] text-[20px]">verified</span>
            <div>
              <span className="text-[11px] text-[#717973] block">Doctor Registry</span>
              <span className="font-semibold text-[#14422d]">AYUSH & BNYS Board</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#414943]">
            <span className="material-symbols-outlined text-[#c26d49] text-[20px]">chat</span>
            <div>
              <span className="text-[11px] text-[#717973] block">Booking Channel</span>
              <span className="font-semibold text-[#c26d49]">Direct WhatsApp Live</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Alert: Live Telehealth Session Status */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#14422d] via-[#2d5a43] to-[#14422d] text-white p-5 sm:p-6 shadow-botanical-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#bceecf] shrink-0">
              <span className="material-symbols-outlined text-[26px]">video_call</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 text-[#bceecf] text-xs font-semibold uppercase tracking-wider mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bceecf] animate-ping"></span>
                <span>Specialist Availability Today</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-medium text-white">
                Live Video Consultation Slots Open Today
              </h2>
              <p className="text-xs sm:text-sm text-[#a1d1b4]">
                Senior doctors available from 02:15 PM IST onwards • HD Video via Google Meet & WhatsApp Video
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateToForm}
              className="px-4 py-2.5 rounded-xl bg-[#c26d49] text-white font-semibold text-xs sm:text-sm hover:bg-[#843d1d] shadow transition-all flex items-center gap-1.5"
            >
              <span>Reserve Open Slot</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Consulting Specialists Today Grid */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#536251]">
              AYUSH Certified Practitioners
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#14422d] font-normal">
              Senior Consulting Naturopaths
            </h2>
          </div>
          <button
            onClick={onNavigateToPackages}
            className="text-xs sm:text-sm font-semibold text-[#14422d] hover:underline flex items-center gap-1"
          >
            <span>View All Packages</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl p-5 border border-[#14422d]/10 shadow-sm hover:shadow-botanical transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#14422d]/20 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#d4e4ce] flex items-center justify-center text-[#14422d]">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-medium text-[#1b1c19] truncate group-hover:text-[#14422d] transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-[#536251] font-medium truncate">
                      {doctor.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center text-[#c26d49] text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        {doctor.rating}
                      </span>
                      <span className="text-[#c0c9c1]">•</span>
                      <span className="text-xs text-[#536251]">{doctor.experience}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#414943] leading-relaxed line-clamp-2">
                  {doctor.specialty}
                </p>

                <div className="p-2.5 rounded-xl bg-[#f5f4ef] flex items-center justify-between text-xs">
                  <span className="text-[#717973]">Earliest Slot:</span>
                  <span className="font-semibold text-[#14422d]">{doctor.earliestSlot}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#14422d]/5 flex items-center gap-2">
                <button
                  onClick={() => onSelectDoctor(doctor)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#14422d] text-white font-semibold text-xs hover:bg-[#2d5a43] transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Consult with {doctor.name.split(" ")[1]}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Quick Action Cards (Stitch Feature Icons) */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#14422d] font-normal">
          Holistic Practice Gateways
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Book E-Consult",
              subtitle: "Live Naturopath Video",
              icon: "medical_services",
              color: "bg-[#d4e4ce]/60 text-[#14422d]",
              action: onNavigateToForm,
            },
            {
              title: "Ayurvedic Diet",
              subtitle: "Pitta-Vata Soothing",
              icon: "nutrition",
              color: "bg-[#bceecf]/50 text-[#14422d]",
              action: onNavigateToPackages,
            },
            {
              title: "Herbal Remedies",
              subtitle: "Pure Botanical Rx",
              icon: "local_pharmacy",
              color: "bg-[#ffdbce]/70 text-[#662708]",
              action: onNavigateToPackages,
            },
            {
              title: "Dosha Quiz",
              subtitle: "Refine Your Prakriti",
              icon: "psychology_alt",
              color: "bg-[#e9e8e3] text-[#14422d]",
              action: onOpenDoshaModal,
            },
          ].map((action, i) => (
            <div
              key={i}
              onClick={action.action}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#14422d]/10 shadow-sm hover:shadow-botanical hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between h-32 group"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {action.icon}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#c0c9c1] group-hover:text-[#14422d] transition-colors text-[18px]">
                  arrow_outward
                </span>
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-medium text-[#1b1c19] group-hover:text-[#14422d] transition-colors leading-tight">
                  {action.title}
                </h4>
                <p className="text-xs text-[#717973]">{action.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Vitality Tracker (Interactive Component) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-botanical space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14422d]/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4e4ce] text-[#14422d] text-xs font-semibold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[14px]">tune</span>
              <span>Dinacharya Bio-Sync</span>
            </div>
            <h2 className="font-serif text-2xl text-[#14422d] font-normal">
              Daily Holistic Vitality Tracker
            </h2>
            <p className="text-xs sm:text-sm text-[#536251]">
              Align your body with circadian rhythms before your upcoming consultation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-[#717973] block">Today's Alignment</span>
              <span className="font-serif text-2xl font-bold text-[#14422d]">
                {syncScore}% Synced
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#d4e4ce] flex items-center justify-center text-[#14422d]">
              <span className="material-symbols-outlined text-[24px]">spa</span>
            </div>
          </div>
        </div>

        {/* Tracker Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hydration */}
          <div className="p-4 rounded-xl bg-[#f5f4ef] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] text-[#14422d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">water_drop</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1b1c19]">Copper Water Hydration</h4>
                <p className="text-xs text-[#536251]">Target: 2.5 Litres</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCopperWater((prev) => Math.max(0, +(prev - 0.25).toFixed(2)))}
                className="w-8 h-8 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-sm hover:bg-[#efeee9]"
              >
                -
              </button>
              <span className="w-16 text-center font-bold text-sm text-[#14422d]">
                {copperWater} L
              </span>
              <button
                onClick={() => setCopperWater((prev) => Math.min(5, +(prev + 0.25).toFixed(2)))}
                className="w-8 h-8 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-sm hover:bg-[#efeee9]"
              >
                +
              </button>
            </div>
          </div>

          {/* Sleep Duration */}
          <div className="p-4 rounded-xl bg-[#f5f4ef] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbce] text-[#662708] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">bedtime</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1b1c19]">Circadian Sleep</h4>
                <p className="text-xs text-[#536251]">Target: 7 - 8 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSleepHours((prev) => Math.max(0, +(prev - 0.5).toFixed(1)))}
                className="w-8 h-8 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-sm hover:bg-[#efeee9]"
              >
                -
              </button>
              <span className="w-16 text-center font-bold text-sm text-[#14422d]">
                {sleepHours} hrs
              </span>
              <button
                onClick={() => setSleepHours((prev) => Math.min(12, +(prev + 0.5).toFixed(1)))}
                className="w-8 h-8 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-sm hover:bg-[#efeee9]"
              >
                +
              </button>
            </div>
          </div>

          {/* Pranayama Practice */}
          <div className="p-4 rounded-xl bg-[#f5f4ef] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#bceecf] text-[#14422d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">air</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1b1c19]">Pranayama Breathwork</h4>
                <p className="text-xs text-[#536251]">Target: 20 Mins Anulom Vilom</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPranayamaMins((prev) => Math.max(0, prev - 5))}
                className="w-8 h-8 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-sm hover:bg-[#efeee9]"
              >
                -
              </button>
              <span className="w-16 text-center font-bold text-sm text-[#14422d]">
                {pranayamaMins} min
              </span>
              <button
                onClick={() => setPranayamaMins((prev) => Math.min(60, prev + 5))}
                className="w-8 h-8 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-sm hover:bg-[#efeee9]"
              >
                +
              </button>
            </div>
          </div>

          {/* Agni Reset Protocol */}
          <div className="p-4 rounded-xl bg-[#f5f4ef] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] text-[#14422d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1b1c19]">Agni Digestive Kindle</h4>
                <p className="text-xs text-[#536251]">Warm ginger-cumin warm water</p>
              </div>
            </div>
            <button
              onClick={() => setIsAgniResetDone((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isAgniResetDone
                  ? "bg-[#14422d] text-white"
                  : "bg-white border border-[#14422d]/30 text-[#414943]"
              }`}
            >
              {isAgniResetDone ? "Completed ✓" : "Mark Done"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
