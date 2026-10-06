"use client";

import React from "react";
import { CLIENT_STORIES } from "../data/consultationData";

interface ClientStoriesViewProps {
  onNavigateToForm: () => void;
  onNavigateToPackages: () => void;
}

export const ClientStoriesView: React.FC<ClientStoriesViewProps> = ({
  onNavigateToForm,
  onNavigateToPackages,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4e4ce] text-[#14422d] text-xs font-semibold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]">verified</span>
          <span>Verified Clinical Transformations</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#14422d] font-normal tracking-tight">
          Living Evidence of Natural Healing
        </h1>
        <p className="text-sm sm:text-base text-[#414943] leading-relaxed">
          Real patient journeys from chronic dependence on pharmaceuticals to vibrant natural wellness under senior BNYS supervision.
        </p>
      </div>

      {/* Stories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CLIENT_STORIES.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl p-6 border border-[#14422d]/10 shadow-sm hover:shadow-botanical transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Star Rating & Package */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-[#c26d49] text-xs font-bold gap-0.5">
                  {[...Array(story.stars)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">
                      star
                    </span>
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f5f4ef] text-[#536251]">
                  {story.packageUsed.split(" ")[0]} Care
                </span>
              </div>

              {/* Patient Condition & Outcome */}
              <div>
                <h3 className="font-serif text-lg font-medium text-[#14422d] leading-snug">
                  {story.condition}
                </h3>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg bg-[#d4e4ce]/60 text-[#14422d] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">task_alt</span>
                  <span>{story.result}</span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-[#414943] italic leading-relaxed pt-1">
                "{story.quote}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 mt-4 border-t border-[#14422d]/5 flex items-center gap-3">
              <img
                src={story.photoUrl}
                alt={story.name}
                className="w-11 h-11 rounded-full object-cover border border-[#14422d]/20 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-xs sm:text-sm text-[#1b1c19] truncate">
                  {story.name}, {story.age}
                </h4>
                <p className="text-[11px] text-[#717973] truncate">{story.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clinical Evidence Highlights */}
      <section className="bg-gradient-to-br from-[#f5f4ef] to-[#efeee9] rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#536251]">
            Empirical Results
          </span>
          <h2 className="font-serif text-2xl text-[#14422d] font-normal">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-xs sm:text-sm text-[#414943] max-w-xl">
            Book your consultation today. No account or password needed—your intake dossier is formatted directly for WhatsApp doctor triage.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToPackages}
            className="px-4 py-3 rounded-xl bg-white border border-[#14422d]/20 text-[#14422d] font-semibold text-xs sm:text-sm hover:bg-[#faf9f4] transition-all"
          >
            Explore Packages
          </button>
          <button
            onClick={onNavigateToForm}
            className="px-5 py-3 rounded-xl bg-[#14422d] text-white font-semibold text-xs sm:text-sm hover:bg-[#2d5a43] shadow transition-all flex items-center gap-1.5"
          >
            <span>Book Consultation</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
