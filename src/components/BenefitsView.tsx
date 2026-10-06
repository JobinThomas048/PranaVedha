"use client";

import React, { useState } from "react";
import {
  PANCHA_MAHABHUTA_ELEMENTS,
  CLIENT_STORIES,
} from "../data/consultationData";

interface BenefitsViewProps {
  onOpenDoshaModal: () => void;
  onNavigateToForm: () => void;
}

export const BenefitsView: React.FC<BenefitsViewProps> = ({
  onOpenDoshaModal,
  onNavigateToForm,
}) => {
  const [activeElementId, setActiveElementId] = useState<string>("earth");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentElement =
    PANCHA_MAHABHUTA_ELEMENTS.find((el) => el.id === activeElementId) ||
    PANCHA_MAHABHUTA_ELEMENTS[0];

  const faqs = [
    {
      q: "How does an online Naturopathy consultation work without physical in-person examination?",
      a: "Senior BNYS Naturopaths conduct comprehensive digital Nadi Pariksha, tongue topography, ocular/sclera evaluation, and detailed bio-circadian inquiry via high-definition video call. We analyze your metabolic patterns, digestion timing, sleep cycles, and recent lab reports with clinical precision.",
    },
    {
      q: "Will my consultation booking immediately connect to WhatsApp?",
      a: "Yes! The portal requires zero login or password. When you submit your dossier, your complete medical history and preferred slot are encrypted and formatted directly into a dedicated WhatsApp message to our clinical triage desk for instant confirmation.",
    },
    {
      q: "Are the doctors government AYUSH certified?",
      a: "Absolutely. All PranaVeda practitioners hold 5.5-year Bachelor of Naturopathy and Yogic Sciences (B.N.Y.S) medical degrees or postgraduate M.D. degrees recognized by the Ministry of AYUSH, Government of India.",
    },
    {
      q: "Can I receive herbal formulations at my doorstep?",
      a: "Yes. Our regional dispensaries in Bangalore, Delhi NCR, and Mumbai dispatch freshly prepared botanical decoctions, cold-pressed therapeutic oils, and dietary kits directly to your doorstep with express courier tracking.",
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Intro Header & Pancha Mahabhuta 5 Elements Section */}
      <section className="bg-gradient-to-br from-[#f5f4ef] via-[#efeee9] to-[#faf9f4] rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4e4ce] text-[#14422d] text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px]">spa</span>
            <span>Vis Medicatrix Naturae</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14422d] font-normal tracking-tight">
            The Healing Power of Nature
          </h1>
          <p className="text-sm sm:text-base text-[#414943] leading-relaxed">
            Rooted in the ancient Pancha Mahabhuta doctrine, clinical naturopathy harmonizes the five cosmic elements within your bio-energetic body to trigger innate cellular repair.
          </p>
        </div>

        {/* 5 Elements Interactive Horizontal Tap Strip */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#536251] block">
            Tap an Element to Reveal Clinical Application:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {PANCHA_MAHABHUTA_ELEMENTS.map((el) => {
              const isActive = el.id === activeElementId;
              return (
                <button
                  key={el.id}
                  onClick={() => setActiveElementId(el.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                    isActive
                      ? "bg-[#14422d] text-white border-[#14422d] shadow-sm scale-105"
                      : "bg-white text-[#1b1c19] border-[#14422d]/10 hover:bg-[#faf9f4]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-white/20 text-[#bceecf]" : "bg-[#f5f4ef] text-[#14422d]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{el.icon}</span>
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">{el.sanskrit}</span>
                    <span
                      className={`text-[11px] ${
                        isActive ? "text-[#a1d1b4]" : "text-[#717973]"
                      }`}
                    >
                      {el.english}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Element Insight Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#14422d]/15 shadow-sm space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#14422d]">
              <span className="material-symbols-outlined text-[20px]">
                {currentElement.icon}
              </span>
              <h3 className="font-serif text-lg font-medium">
                {currentElement.sanskrit} ({currentElement.english}) — {currentElement.tagline}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#414943] leading-relaxed">
              {currentElement.description}
            </p>
          </div>
        </div>
      </section>

      {/* Foundational Pillars Grid */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#536251]">
              Core Tenets
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#14422d] font-normal">
              Four Foundational Pillars
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "Treats Root Cause, Not Symptoms",
              badge: "Root-Level Reversal",
              desc: "Eliminates underlying toxic cellular waste (Ama) instead of masking discomfort with temporary synthetic suppressants.",
              icon: "psychiatry",
              bg: "bg-[#d4e4ce]/50 text-[#14422d]",
            },
            {
              title: "100% Drug-Free & Non-Invasive",
              badge: "Zero Synthetic Chemicals",
              desc: "Combines therapeutic hydrotherapy, organic mud therapy, sun-charged herbal decoctions, and periodic therapeutic fasting.",
              icon: "water_lux",
              bg: "bg-[#bceecf]/40 text-[#14422d]",
            },
            {
              title: "Mitochondrial & Immune Rejuvenation",
              badge: "Cellular Vitality",
              desc: "Restores mitochondrial energy and gut microbiome equilibrium through live enzyme-rich, biodynamic nutrition.",
              icon: "vital_signs",
              bg: "bg-[#ffdbce]/60 text-[#662708]",
            },
            {
              title: "Nervous System & Mind-Body Reset",
              badge: "Circadian Alignment",
              desc: "Re-calibrates nervous system tone and curtails cortisol spikes via guided Pranayama, Yoga Nidra, and somatic rhythm release.",
              icon: "self_improvement",
              bg: "bg-[#e9e8e3] text-[#14422d]",
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-[#14422d]/10 shadow-sm flex items-start gap-4 hover:shadow-botanical transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${pillar.bg}`}
              >
                <span className="material-symbols-outlined text-[26px]">
                  {pillar.icon}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-medium text-[#1b1c19]">
                    {pillar.title}
                  </h3>
                </div>
                <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f5f4ef] text-[#536251]">
                  {pillar.badge}
                </span>
                <p className="text-xs sm:text-sm text-[#414943] leading-relaxed pt-1">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2-Minute Dosha Assessment Callout Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-[#14422d] text-white p-7 sm:p-10 shadow-botanical-lg">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-60 h-60 rounded-full bg-[#2d5a43] blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#bceecf] text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">timer</span>
            <span>Takes Only 2 Mins • Free Instant Analysis</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Discover Your Unique Prakriti (Dosha Constitution)
          </h2>

          <p className="text-sm sm:text-base text-[#a1d1b4] leading-relaxed">
            Are you Vata, Pitta, or Kapha dominant? Take our clinical assessment to personalize your dietary choices, herbal teas, and lifestyle regimen before your appointment.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onOpenDoshaModal}
              className="py-3.5 px-6 rounded-xl bg-[#c26d49] hover:bg-[#843d1d] active:scale-95 text-white font-bold text-sm shadow-terracotta transition-all flex items-center gap-2"
            >
              <span>Start 2-Min Assessment</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={onNavigateToForm}
              className="text-xs sm:text-sm text-[#bceecf] hover:text-white underline underline-offset-4"
            >
              Or proceed directly to WhatsApp booking
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-sm space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#536251]">
            Common Queries
          </span>
          <h2 className="font-serif text-2xl text-[#14422d] font-normal mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#14422d]/10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="font-serif text-base sm:text-lg font-medium text-[#1b1c19] group-hover:text-[#14422d] transition-colors">
                  {faq.q}
                </span>
                <span className="material-symbols-outlined text-[#717973] group-hover:text-[#14422d] transition-colors shrink-0">
                  {openFaqIndex === idx ? "expand_less" : "expand_more"}
                </span>
              </button>

              {openFaqIndex === idx && (
                <div className="mt-3 text-xs sm:text-sm text-[#414943] leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
