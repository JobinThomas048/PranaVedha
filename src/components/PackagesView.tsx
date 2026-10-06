"use client";

import React, { useState } from "react";
import { PACKAGES, PackagePlan } from "../data/consultationData";

interface PackagesViewProps {
  onSelectPackage: (pkg: PackagePlan) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({ onSelectPackage }) => {
  const [billingMode, setBillingMode] = useState<"all" | "single" | "programs">("all");

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (billingMode === "single") return pkg.id === "pkg-basic";
    if (billingMode === "programs") return pkg.id !== "pkg-basic";
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4e4ce] text-[#14422d] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <span className="material-symbols-outlined text-[16px]">spa</span>
          <span>Ayurvedic & Naturopathy Care</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#14422d] font-normal tracking-tight">
          Holistic Healing Packages
        </h1>
        <p className="text-sm sm:text-base text-[#414943] leading-relaxed">
          Root-cause therapy blueprints tailored to your bio-energetic Prakriti, restoring your body’s innate self-healing without synthetic chemicals.
        </p>

        {/* Tab switch filter */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[#efeee9] border border-[#14422d]/10 mt-2">
          <button
            onClick={() => setBillingMode("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              billingMode === "all"
                ? "bg-white text-[#14422d] shadow-sm"
                : "text-[#717973] hover:text-[#14422d]"
            }`}
          >
            All Plans
          </button>
          <button
            onClick={() => setBillingMode("single")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              billingMode === "single"
                ? "bg-white text-[#14422d] shadow-sm"
                : "text-[#717973] hover:text-[#14422d]"
            }`}
          >
            Single Consult
          </button>
          <button
            onClick={() => setBillingMode("programs")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              billingMode === "programs"
                ? "bg-white text-[#14422d] shadow-sm"
                : "text-[#717973] hover:text-[#14422d]"
            }`}
          >
            Curated Programs
          </button>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {filteredPackages.map((pkg) => {
          const isStandard = pkg.id === "pkg-standard";
          const isPremium = pkg.id === "pkg-premium";

          return (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                isStandard
                  ? "bg-gradient-to-b from-[#2d5a43] to-[#14422d] text-white shadow-botanical-lg scale-[1.02] border-2 border-[#bceecf]/40"
                  : "bg-white text-[#1b1c19] border border-[#14422d]/10 shadow-sm hover:shadow-botanical"
              }`}
            >
              {/* Badges */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#ffdbce] text-[#662708] font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                  <span>Most Popular Program</span>
                </div>
              )}

              {pkg.isBestValue && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#d7e7d1] text-[#14422d] font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                  <span>Best Long-Term Value</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold ${
                        isStandard ? "text-[#a1d1b4]" : "text-[#536251]"
                      }`}
                    >
                      {pkg.tag}
                    </span>
                    <h3
                      className={`font-serif text-xl sm:text-2xl font-normal mt-1 leading-snug ${
                        isStandard ? "text-white" : "text-[#14422d]"
                      }`}
                    >
                      {pkg.name}
                    </h3>
                  </div>
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      isStandard
                        ? "bg-white/10 text-[#bceecf]"
                        : "bg-[#f5f4ef] text-[#14422d]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {pkg.icon}
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="my-5 flex items-baseline gap-2">
                  <span
                    className={`font-serif text-4xl sm:text-5xl font-medium ${
                      isStandard ? "text-white" : "text-[#14422d]"
                    }`}
                  >
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </span>
                  <span
                    className={`text-xs ${
                      isStandard ? "text-[#a1d1b4]" : "text-[#717973]"
                    }`}
                  >
                    /{pkg.billingPeriod}
                  </span>
                  {isStandard && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded bg-white/20 text-[#bceecf] font-semibold">
                      Save 35%
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isStandard ? "text-[#e3e3de]" : "text-[#536251]"
                  }`}
                >
                  {pkg.description}
                </p>

                {/* Feature List */}
                <div className="space-y-3 pt-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block ${
                      isStandard ? "text-[#a1d1b4]" : "text-[#14422d]"
                    }`}
                  >
                    What's Included:
                  </span>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <span
                        className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
                          isStandard ? "text-[#bceecf]" : "text-[#14422d]"
                        }`}
                      >
                        check_circle
                      </span>
                      <span className={isStandard ? "text-white" : "text-[#1b1c19]"}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-black/10">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all shadow flex items-center justify-center gap-2 active:scale-95 ${
                    isStandard
                      ? "bg-[#c26d49] text-white hover:bg-[#843d1d]"
                      : isPremium
                      ? "bg-[#14422d] text-white hover:bg-[#2d5a43]"
                      : "bg-[#f5f4ef] text-[#14422d] hover:bg-[#d4e4ce]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  <span>Select & Book via WhatsApp</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Prakriti Promise Section */}
      <section className="bg-gradient-to-br from-[#f5f4ef] to-[#efeee9] rounded-2xl p-6 sm:p-8 border border-[#14422d]/10">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-[#536251]">
            Our Clinical Commitment
          </span>
          <h2 className="font-serif text-2xl text-[#14422d] font-normal mt-1">
            The PranaVeda Guarantee
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 text-center flex flex-col items-center border border-[#14422d]/5">
            <div className="w-12 h-12 rounded-full bg-[#d4e4ce] flex items-center justify-center text-[#14422d] mb-3">
              <span className="material-symbols-outlined text-[24px]">nest_eco_leaf</span>
            </div>
            <h4 className="font-serif text-lg font-medium text-[#14422d]">100% Drug-Free</h4>
            <p className="text-xs text-[#536251] mt-1">
              Natural diet therapy, hydrotherapy, and medicinal herbs without synthetic suppressants.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 text-center flex flex-col items-center border border-[#14422d]/5">
            <div className="w-12 h-12 rounded-full bg-[#d4e4ce] flex items-center justify-center text-[#14422d] mb-3">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <h4 className="font-serif text-lg font-medium text-[#14422d]">AYUSH Certified</h4>
            <p className="text-xs text-[#536251] mt-1">
              Consultations conducted exclusively by 5.5-year degree qualified BNYS & MD doctors.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 text-center flex flex-col items-center border border-[#14422d]/5">
            <div className="w-12 h-12 rounded-full bg-[#d4e4ce] flex items-center justify-center text-[#14422d] mb-3">
              <span className="material-symbols-outlined text-[24px]">favorite</span>
            </div>
            <h4 className="font-serif text-lg font-medium text-[#14422d]">15,000+ Healed</h4>
            <p className="text-xs text-[#536251] mt-1">
              Proven clinical records of reversing metabolic syndrome, PCOS, acidity, and sleep disorders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
