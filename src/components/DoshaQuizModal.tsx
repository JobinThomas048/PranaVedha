"use client";

import React, { useState } from "react";
import { DOSHA_QUESTIONS } from "../data/consultationData";

interface DoshaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDosha: (doshaSummary: string) => void;
}

export const DoshaQuizModal: React.FC<DoshaQuizModalProps> = ({
  isOpen,
  onClose,
  onApplyDosha,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, dosha: string) => {
    const updated = { ...answers, [questionId]: dosha };
    setAnswers(updated);

    if (currentIdx < DOSHA_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateResult = () => {
    let vata = 0;
    let pitta = 0;
    let kapha = 0;

    Object.values(answers).forEach((d) => {
      if (d === "vata") vata++;
      if (d === "pitta") pitta++;
      if (d === "kapha") kapha++;
    });

    const total = vata + pitta + kapha || 1;
    const vPct = Math.round((vata / total) * 100);
    const pPct = Math.round((pitta / total) * 100);
    const kPct = Math.round((kapha / total) * 100);

    let dominant = "Vata-Pitta Harmony";
    let desc = "Creative, perceptive, and dynamic. Prone to dry skin, anxiety, or fast digestion.";
    let diet = "Warm grounding stews, cooked roots, ghee, fennel tea. Avoid ice-cold drinks.";
    let herb = "Ashwagandha, Triphala, and Brahmi infusions.";

    if (vPct >= pPct && vPct >= kPct) {
      dominant = "Vata Dominant Constitution";
      desc = "Governed by Air and Ether. Rapid thinking, light sleep, and prone to bloating or nervous exhaustion.";
      diet = "Nourishing warm soups, sweet potatoes, sesame oil, and well-cooked grains.";
      herb = "Ashwagandha, Dashamula, and ginger-cinnamon tea.";
    } else if (pPct >= vPct && pPct >= kPct) {
      dominant = "Pitta Dominant Constitution";
      desc = "Governed by Fire and Water. Sharp intellect, strong appetite, and prone to acidity or heat intolerance.";
      diet = "Cooling cucumber, coconut water, mint, sweet fruits, and coriander seeds.";
      herb = "Shatavari, Amla, and Brahmi ghrita.";
    } else {
      dominant = "Kapha Dominant Constitution";
      desc = "Governed by Earth and Water. Calm endurance, strong immunity, but prone to slow digestion and lethargy.";
      diet = "Light steamed vegetables, pungent warming spices, black pepper, and bitter greens.";
      herb = "Trikatu, Tulsi, and dry ginger powder with raw honey.";
    }

    return { dominant, desc, diet, herb, vPct, pPct, kPct };
  };

  const result = calculateResult();

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  const handleProceedToConsult = () => {
    onApplyDosha(`${result.dominant} (${result.vPct}% Vata, ${result.pPct}% Pitta, ${result.kPct}% Kapha)`);
    onClose();
  };

  const q = DOSHA_QUESTIONS[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-botanical-lg border border-[#14422d]/10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f4ef] text-[#414943] hover:text-[#14422d] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {!isCompleted ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbce] text-[#662708] text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                <span>Question {currentIdx + 1} of {DOSHA_QUESTIONS.length}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#14422d] font-normal leading-snug">
                {q.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(q.id, opt.dosha)}
                  className="w-full text-left p-4 rounded-2xl bg-[#f5f4ef] hover:bg-[#d4e4ce]/60 hover:border-[#14422d]/30 border border-transparent transition-all flex items-start gap-3 group"
                >
                  <span className="w-6 h-6 rounded-full bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#14422d] group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-xs sm:text-sm text-[#1b1c19] leading-relaxed font-medium">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="pt-2">
              <div className="w-full h-1.5 rounded-full bg-[#efeee9] overflow-hidden">
                <div
                  className="h-full bg-[#14422d] transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / DOSHA_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#d4e4ce] text-[#14422d] flex items-center justify-center mx-auto shadow-sm">
                <span className="material-symbols-outlined text-[32px]">spa</span>
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#536251]">
                Assessment Complete
              </span>
              <h3 className="font-serif text-2xl text-[#14422d] font-medium">
                {result.dominant}
              </h3>
            </div>

            {/* Dosha Distribution Bars */}
            <div className="p-4 rounded-2xl bg-[#f5f4ef] space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#414943] block">
                Tri-Dosha Ratio Breakdown:
              </span>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center justify-between text-[#14422d]">
                  <span>Vata (Air & Space):</span>
                  <span>{result.vPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e3e3de] overflow-hidden">
                  <div
                    className="h-full bg-[#2d5a43]"
                    style={{ width: `${result.vPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[#c26d49]">
                  <span>Pitta (Fire & Water):</span>
                  <span>{result.pPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e3e3de] overflow-hidden">
                  <div
                    className="h-full bg-[#c26d49]"
                    style={{ width: `${result.pPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[#536251]">
                  <span>Kapha (Earth & Water):</span>
                  <span>{result.kPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e3e3de] overflow-hidden">
                  <div
                    className="h-full bg-[#536251]"
                    style={{ width: `${result.kPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Clinical Insights */}
            <div className="space-y-2.5 text-xs text-[#414943]">
              <div className="p-3 rounded-xl bg-[#faf9f4] border border-[#14422d]/10">
                <span className="font-bold text-[#14422d] block mb-0.5">🥗 Dietary Focus:</span>
                <span>{result.diet}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#faf9f4] border border-[#14422d]/10">
                <span className="font-bold text-[#14422d] block mb-0.5">🌿 Herbal Synergy:</span>
                <span>{result.herb}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleProceedToConsult}
                className="w-full py-3.5 px-4 rounded-xl bg-[#14422d] hover:bg-[#2d5a43] text-white font-semibold text-sm shadow flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Apply to E-Consult Dossier</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs text-[#717973] hover:text-[#14422d] transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
