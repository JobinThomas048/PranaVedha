"use client";

import React, { useState, useEffect } from "react";
import {
  DOCTORS,
  PACKAGES,
  REGIONAL_CENTERS,
  COMPLAINT_OPTIONS,
  Doctor,
  PackagePlan,
  BookingDetails,
} from "../data/consultationData";
import {
  formatWhatsAppMessage,
  generateWhatsAppUrl,
  saveBookingToLocalStorage,
  getStoredWhatsAppNumber,
} from "../utils/whatsapp";

interface ConsultationFormViewProps {
  initialDoctor?: Doctor | null;
  initialPackage?: PackagePlan | null;
  onBookingSuccess: (booking: BookingDetails) => void;
}

export const ConsultationFormView: React.FC<ConsultationFormViewProps> = ({
  initialDoctor,
  initialPackage,
  onBookingSuccess,
}) => {
  // Step tracker
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<string>("Female");
  const [height, setHeight] = useState<number>(165);
  const [weight, setWeight] = useState<number>(60);

  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([
    "Digestion & Gut Health",
    "Hormonal Balance",
  ]);
  const [symptomNotes, setSymptomNotes] = useState<string>("");

  const [regionalCenter, setRegionalCenter] = useState<string>(
    "Bangalore Botanical Hub - Indiranagar"
  );
  const [consultationMode, setConsultationMode] = useState<string>("HD Video Call");
  const [selectedSlot, setSelectedSlot] = useState<string>("Today, 04:30 PM");

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctor ? initialDoctor.id : DOCTORS[0].id
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackage ? initialPackage.id : PACKAGES[1].id
  );

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Sync props if changed
  useEffect(() => {
    if (initialDoctor) setSelectedDoctorId(initialDoctor.id);
  }, [initialDoctor]);

  useEffect(() => {
    if (initialPackage) setSelectedPackageId(initialPackage.id);
  }, [initialPackage]);

  // Try to load any saved draft from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("pranaveda_form_draft");
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          if (parsed.patientName) setPatientName(parsed.patientName);
          if (parsed.patientPhone) setPatientPhone(parsed.patientPhone);
          if (parsed.age) setAge(parsed.age);
          if (parsed.gender) setGender(parsed.gender);
          if (parsed.height) setHeight(parsed.height);
          if (parsed.weight) setWeight(parsed.weight);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Save draft whenever name/phone changes
  const saveDraft = (name: string, phone: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "pranaveda_form_draft",
        JSON.stringify({ patientName: name, patientPhone: phone, age, gender, height, weight })
      );
    }
  };

  // BMI & Agni Diagnostic Calculation
  const heightM = height / 100;
  const bmiVal = heightM > 0 && weight > 0 ? (weight / (heightM * heightM)).toFixed(1) : "22.0";
  const numBmi = parseFloat(bmiVal);

  let agniStatus = "Balanced Agni (Optimal)";
  let agniColor = "text-[#14422d] bg-[#d4e4ce]/60 border-[#14422d]/20";

  if (numBmi < 18.5) {
    agniStatus = "Vata Dominance (Irregular Agni / Vishama)";
    agniColor = "text-[#662708] bg-[#ffdbce]/60 border-[#c26d49]/30";
  } else if (numBmi >= 18.5 && numBmi <= 24.9) {
    agniStatus = "Sama Agni (Balanced Metabolic Vitality)";
    agniColor = "text-[#14422d] bg-[#d4e4ce]/70 border-[#14422d]/20";
  } else if (numBmi >= 25 && numBmi <= 29.9) {
    agniStatus = "Kapha Accumulation (Sluggish Agni / Mandaagni)";
    agniColor = "text-[#843d1d] bg-[#ffb598]/40 border-[#843d1d]/20";
  } else {
    agniStatus = "Ama Toxin Build-up (High Inflammation Risk)";
    agniColor = "text-[#ba1a1a] bg-[#ffdad6]/60 border-[#ba1a1a]/30";
  }

  // Toggle complaint
  const toggleComplaint = (label: string) => {
    setSelectedComplaints((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const selectedDoctorObj = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];
  const selectedPackageObj = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1];

  // Construct current Booking Details
  const currentBooking: BookingDetails = {
    bookingId: "PV-" + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    patientName: patientName.trim() || "Guest Patient",
    patientPhone: patientPhone.trim(),
    age,
    gender,
    height,
    weight,
    bmi: bmiVal,
    agniStatus,
    selectedPackage: selectedPackageObj.name,
    packagePrice: selectedPackageObj.price,
    selectedDoctor: selectedDoctorObj.name + ` (${selectedDoctorObj.title.split(",")[0]})`,
    consultationMode,
    selectedSlot,
    regionalCenter,
    complaints: selectedComplaints,
    notes: symptomNotes.trim(),
  };

  const formattedMessage = formatWhatsAppMessage(currentBooking);
  const waUrl = generateWhatsAppUrl(currentBooking);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!patientName.trim()) {
      setFormError("Please enter the patient's full name to proceed.");
      setCurrentStep(1);
      return;
    }
    if (!patientPhone.trim()) {
      setFormError("Please provide a contact phone / WhatsApp number.");
      setCurrentStep(1);
      return;
    }
    setFormError("");

    // Save to localStorage
    saveBookingToLocalStorage(currentBooking);

    // Trigger parent callback (will open confirmation modal)
    onBookingSuccess(currentBooking);

    // Open WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(formattedMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#f5f4ef] via-[#efeee9] to-[#faf9f4] rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14422d]/10 text-[#14422d] text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px]">spa</span>
              <span>Holistic Clinical Dossier</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#14422d] font-normal tracking-tight">
              Naturopathy E-Consultation Intake
            </h1>
            <p className="text-xs sm:text-sm text-[#414943] max-w-xl leading-relaxed">
              Zero login required. Your clinical dossier is securely compiled and immediately formatted for our WhatsApp doctor on-call triage desk.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-xl bg-white border border-[#14422d]/15 text-xs text-[#14422d] shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c26d49] text-[18px]">verified_user</span>
              <div>
                <span className="font-bold block">100% Confidential</span>
                <span className="text-[11px] text-[#717973]">Direct to Doctor Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mt-6 pt-5 border-t border-[#14422d]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(step)}
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    currentStep === step
                      ? "bg-[#14422d] text-white shadow-sm ring-4 ring-[#14422d]/10"
                      : currentStep > step
                      ? "bg-[#d4e4ce] text-[#14422d]"
                      : "bg-[#e3e3de] text-[#717973]"
                  }`}
                >
                  {currentStep > step ? "✓" : step}
                </button>
                {step < 4 && (
                  <div
                    className={`w-8 sm:w-16 h-1 rounded-full ${
                      currentStep > step ? "bg-[#14422d]" : "bg-[#e3e3de]"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <span className="text-xs font-semibold text-[#536251]">
            Step {currentStep} of 4:{" "}
            {currentStep === 1
              ? "Vitals & Profile"
              : currentStep === 2
              ? "Complaints & History"
              : currentStep === 3
              ? "Dispensary & Center"
              : "Doctor & WhatsApp Dispatch"}
          </span>
        </div>
      </div>

      {formError && (
        <div className="p-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-sm font-semibold flex items-center gap-2 shadow-sm animate-bounce">
          <span className="material-symbols-outlined text-[20px]">error</span>
          <span>{formError}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: PATIENT PROFILE & VITALS */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 pb-3 border-b border-[#14422d]/10">
              <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] flex items-center justify-center text-[#14422d]">
                <span className="material-symbols-outlined text-[22px]">person</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-medium text-[#1b1c19]">
                  1. Patient Profile & Metabolic Baseline
                </h2>
                <p className="text-xs text-[#536251]">
                  Fundamental vitals to calculate initial bio-dosha constitution
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Legal Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414943] uppercase tracking-wider flex items-center justify-between">
                  <span>Full Legal Name</span>
                  <span className="text-[#c26d49] text-[11px] font-semibold">*Required</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => {
                      setPatientName(e.target.value);
                      saveDraft(e.target.value, patientPhone);
                    }}
                    placeholder="e.g. Maya Iyer"
                    className="w-full bg-[#f5f4ef] rounded-xl px-4 py-3 text-sm text-[#1b1c19] outline-none focus:bg-white focus:ring-2 focus:ring-[#14422d] border border-transparent focus:border-transparent transition-all"
                  />
                  <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-[#717973] text-[18px]">
                    badge
                  </span>
                </div>
              </div>

              {/* Patient WhatsApp Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414943] uppercase tracking-wider flex items-center justify-between">
                  <span>Contact Phone (WhatsApp)</span>
                  <span className="text-[#c26d49] text-[11px] font-semibold">*Required</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => {
                      setPatientPhone(e.target.value);
                      saveDraft(patientName, e.target.value);
                    }}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#f5f4ef] rounded-xl px-4 py-3 text-sm text-[#1b1c19] outline-none focus:bg-white focus:ring-2 focus:ring-[#14422d] border border-transparent focus:border-transparent transition-all"
                  />
                  <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-[#717973] text-[18px]">
                    chat
                  </span>
                </div>
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Age Stepper */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414943] uppercase tracking-wider">
                  Age (Years)
                </label>
                <div className="flex items-center bg-[#f5f4ef] rounded-xl px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setAge((prev) => Math.max(1, prev - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-base hover:bg-[#efeee9] transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={age}
                    onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 25))}
                    className="w-full text-center bg-transparent font-bold text-base text-[#1b1c19] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setAge((prev) => Math.min(110, prev + 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-[#14422d]/20 text-[#14422d] font-bold text-base hover:bg-[#efeee9] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Gender Pills */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414943] uppercase tracking-wider">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Female", "Male", "Other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                        gender === g
                          ? "bg-[#14422d] text-white shadow-sm"
                          : "bg-[#f5f4ef] text-[#414943] hover:bg-[#efeee9]"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Height, Weight & Live BMI Agni Calculator */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#414943] uppercase tracking-wider">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="90"
                      max="240"
                      value={height}
                      onChange={(e) => setHeight(Math.max(80, parseInt(e.target.value) || 165))}
                      className="w-full bg-[#f5f4ef] rounded-xl px-4 py-2.5 text-base font-bold text-[#1b1c19] outline-none focus:bg-white focus:ring-2 focus:ring-[#14422d] transition-all"
                    />
                    <span className="absolute right-3.5 top-3 text-xs text-[#717973] font-medium">
                      cm
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#414943] uppercase tracking-wider">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="25"
                      max="220"
                      value={weight}
                      onChange={(e) => setWeight(Math.max(20, parseInt(e.target.value) || 60))}
                      className="w-full bg-[#f5f4ef] rounded-xl px-4 py-2.5 text-base font-bold text-[#1b1c19] outline-none focus:bg-white focus:ring-2 focus:ring-[#14422d] transition-all"
                    />
                    <span className="absolute right-3.5 top-3 text-xs text-[#717973] font-medium">
                      kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic BMI & Agni Diagnostic Card */}
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${agniColor}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">vital_signs</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold opacity-80 block">
                      Metabolic Classification
                    </span>
                    <span className="font-serif text-base sm:text-lg font-medium">
                      {agniStatus}
                    </span>
                  </div>
                </div>
                <div className="text-right sm:border-l sm:pl-4 border-current/20">
                  <span className="font-serif text-2xl font-bold">{bmiVal}</span>
                  <span className="text-[11px] block opacity-80 leading-none">kg/m² (BMI)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-[#14422d] text-white font-semibold text-sm hover:bg-[#2d5a43] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Complaints</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHIEF COMPLAINTS & LIFESTYLE */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 pb-3 border-b border-[#14422d]/10">
              <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] flex items-center justify-center text-[#14422d]">
                <span className="material-symbols-outlined text-[22px]">healing</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-medium text-[#1b1c19]">
                  2. Chief Complaints & Health Goals
                </h2>
                <p className="text-xs text-[#536251]">
                  Select all physiological focal points for your naturopath
                </p>
              </div>
            </div>

            {/* Complaints Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPLAINT_OPTIONS.map((item) => {
                const isSelected = selectedComplaints.includes(item.label);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleComplaint(item.label)}
                    className={`p-4 rounded-xl text-left transition-all flex items-start justify-between border ${
                      isSelected
                        ? "bg-[#14422d] text-white border-[#14422d] shadow-sm"
                        : "bg-[#f5f4ef] text-[#1b1c19] border-transparent hover:bg-[#efeee9]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`material-symbols-outlined text-[22px] shrink-0 mt-0.5 ${
                          isSelected ? "text-[#bceecf]" : "text-[#14422d]"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold text-sm leading-snug">{item.label}</h4>
                        <p
                          className={`text-xs mt-0.5 ${
                            isSelected ? "text-[#a1d1b4]" : "text-[#717973]"
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] shrink-0 ${
                        isSelected ? "text-[#bceecf]" : "text-[#c0c9c1]"
                      }`}
                    >
                      {isSelected ? "check_circle" : "radio_button_unchecked"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Qualitative Notes Textarea */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-[#414943] uppercase tracking-wider flex items-center justify-between">
                <span>Symptom Narrative, Meals & Current Medications</span>
                <span className="text-[#717973] text-[11px] font-normal">Optional details</span>
              </label>
              <textarea
                rows={3}
                value={symptomNotes}
                onChange={(e) => setSymptomNotes(e.target.value)}
                placeholder="Describe your daily diet routine, sleep quality, digestion triggers, and any current medications..."
                className="w-full bg-[#f5f4ef] rounded-xl p-4 text-sm text-[#1b1c19] outline-none focus:bg-white focus:ring-2 focus:ring-[#14422d] transition-all resize-none"
              ></textarea>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-[#14422d]/20 text-[#14422d] font-semibold text-xs hover:bg-[#faf9f4]"
              >
                Back to Vitals
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-[#14422d] text-white font-semibold text-sm hover:bg-[#2d5a43] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Dispensary Hub</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REGIONAL CENTER & HERBAL DISPENSARY */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 pb-3 border-b border-[#14422d]/10">
              <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] flex items-center justify-center text-[#14422d]">
                <span className="material-symbols-outlined text-[22px]">local_pharmacy</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-medium text-[#1b1c19]">
                  3. Regional Center & Herbal Dispensary
                </h2>
                <p className="text-xs text-[#536251]">
                  Ensures same-day fresh botanical decoction and diet chart dispatch
                </p>
              </div>
            </div>

            {/* Regional Center Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REGIONAL_CENTERS.map((center) => (
                <div
                  key={center.id}
                  onClick={() => setRegionalCenter(center.name)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    regionalCenter === center.name
                      ? "bg-[#14422d]/5 border-[#14422d] ring-2 ring-[#14422d]"
                      : "bg-[#f5f4ef] border-transparent hover:bg-[#efeee9]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-[#1b1c19]">{center.name}</h4>
                      <p className="text-xs text-[#536251] mt-0.5">{center.city}</p>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        regionalCenter === center.name ? "text-[#14422d]" : "text-[#c0c9c1]"
                      }`}
                    >
                      {regionalCenter === center.name ? "radio_button_checked" : "radio_button_unchecked"}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#14422d]/10 flex items-center justify-between text-xs">
                    <span className="text-[#717973]">Dispatch Velocity:</span>
                    <span className="font-semibold text-[#14422d]">{center.leadTime}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Preview Card */}
            <div className="rounded-xl overflow-hidden border border-[#14422d]/10 relative h-48 bg-[#efeee9] shadow-inner flex flex-col justify-end p-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHkIfUJDWBA_frRVv_EIYzinoZr9vytWyRzZyZY4BYpyjsvrJD1QGzNDsPlJI42WOHcol9rRcMkMrkc72s-s9qEOJo_-p963HAESIm83rkB9knce9v6ZsAxMrQqFNAX6k7vLLpg1_hOcwufynW279AkAvNKO_haStof5iwJh3NG2R-rno8fsXZAYClIimWHt-E2OBM1YYh90l-fO-bEFYx5VXGyE6U2CpTTXKdEll-JXx3t-psXxbp"
                alt="Regional Sanctuary Map"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-white/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#14422d] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-[#14422d]">{regionalCenter}</h5>
                    <p className="text-[11px] text-[#536251]">Central Ayurvedic Dispensary</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#d4e4ce] text-[#14422d] font-bold text-[11px]">
                  Active Live Hub
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-[#14422d]/20 text-[#14422d] font-semibold text-xs hover:bg-[#faf9f4]"
              >
                Back to Complaints
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-xl bg-[#14422d] text-white font-semibold text-sm hover:bg-[#2d5a43] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Doctor & WhatsApp Finalization</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: MODE, DOCTOR & DIRECT WHATSAPP DISPATCH */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Consultation Mode & Slot Allocation */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#14422d]/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-[#14422d]/10">
                <div className="w-10 h-10 rounded-xl bg-[#d4e4ce] flex items-center justify-center text-[#14422d]">
                  <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                </div>
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#1b1c19]">
                    4. Mode, Specialist & Time Slot
                  </h2>
                  <p className="text-xs text-[#536251]">
                    Live pulse, tongue analysis, and root cause diagnosis
                  </p>
                </div>
              </div>

              {/* Consultation Mode */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    mode: "HD Video Call",
                    desc: "45 Mins in-depth video consultation",
                    icon: "videocam",
                  },
                  {
                    mode: "In-Clinic Telehealth",
                    desc: "Regional Nadi Pariksha Booth",
                    icon: "apartment",
                  },
                ].map((m) => (
                  <div
                    key={m.mode}
                    onClick={() => setConsultationMode(m.mode)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-24 ${
                      consultationMode === m.mode
                        ? "bg-[#14422d]/5 border-[#14422d] ring-2 ring-[#14422d]"
                        : "bg-[#f5f4ef] border-transparent hover:bg-[#efeee9]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[#14422d] text-[22px]">
                        {m.icon}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          consultationMode === m.mode
                            ? "bg-[#14422d] text-white"
                            : "bg-[#c0c9c1]"
                        }`}
                      >
                        {consultationMode === m.mode && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        )}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#1b1c19]">{m.mode}</h4>
                      <p className="text-[11px] text-[#536251]">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Choose Available Time Slot */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#414943] uppercase tracking-wider flex items-center justify-between">
                  <span>Select Preferred Slot (IST)</span>
                  <span className="text-[#14422d] text-[11px] font-semibold">UTC+5:30</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "Today, 04:30 PM",
                    "Tomorrow, 10:00 AM",
                    "Tomorrow, 02:15 PM",
                    "Tomorrow, 05:45 PM",
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedSlot === slot
                          ? "bg-[#14422d] text-white border-[#14422d] shadow-sm"
                          : "bg-[#f5f4ef] text-[#1b1c19] border-transparent hover:bg-[#efeee9]"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold opacity-75 block">
                        {slot.split(",")[0]}
                      </span>
                      <span className="font-semibold text-xs sm:text-sm">
                        {slot.split(",")[1]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#414943] uppercase tracking-wider">
                  Assigned Senior Naturopath
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DOCTORS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        selectedDoctorId === doc.id
                          ? "bg-[#14422d]/5 border-[#14422d] ring-2 ring-[#14422d]"
                          : "bg-[#f5f4ef] border-transparent hover:bg-[#efeee9]"
                      }`}
                    >
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#14422d]/20 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-medium text-[#1b1c19] truncate">
                          {doc.name}
                        </h4>
                        <p className="text-[11px] text-[#536251] truncate">
                          {doc.title.split(",")[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#414943] uppercase tracking-wider">
                  Selected Care Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedPackageId === pkg.id
                          ? "bg-[#14422d] text-white border-[#14422d] shadow-sm"
                          : "bg-[#f5f4ef] text-[#1b1c19] border-transparent hover:bg-[#efeee9]"
                      }`}
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                          {pkg.tag}
                        </span>
                        <h4 className="font-serif text-sm font-medium leading-snug">
                          {pkg.name}
                        </h4>
                      </div>
                      <div className="mt-2 font-bold text-sm">
                        ₹{pkg.price.toLocaleString("en-IN")}{" "}
                        <span className="text-[10px] font-normal opacity-80">
                          /{pkg.billingPeriod}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* REAL-TIME WHATSAPP DISPATCH PREVIEW & ONE-CLICK ACTION */}
            <div className="bg-gradient-to-br from-[#2d5a43] to-[#14422d] rounded-2xl p-6 sm:p-8 text-white shadow-botanical-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#bceecf]">
                    <span className="material-symbols-outlined text-[28px]">chat</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#bceecf] font-semibold uppercase tracking-wider">
                      Production WhatsApp Bridge
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Live Clinical WhatsApp Dispatch
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#a1d1b4] block">Clinic Line</span>
                  <span className="font-mono text-sm font-bold text-white">
                    +{getStoredWhatsAppNumber()}
                  </span>
                </div>
              </div>

              {/* Formatted Message Code Block Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#a1d1b4]">
                  <span>Formatted Outgoing Message Preview:</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isCopied ? "done" : "content_copy"}
                    </span>
                    <span>{isCopied ? "Copied!" : "Copy Text"}</span>
                  </button>
                </div>

                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 font-mono text-xs text-[#bceecf] border border-white/10 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {formattedMessage}
                </div>
              </div>

              {/* Big Action Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#c26d49] hover:bg-[#843d1d] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-terracotta transition-all flex items-center justify-center gap-3 group"
                >
                  <span className="material-symbols-outlined text-[24px]">chat</span>
                  <span>Confirm & Send Booking to WhatsApp</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#a1d1b4]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    No Login Barrier • Zero Passwords
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Instant Confirmation & Telehealth Link
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">sync</span>
                    Free Rescheduling
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
