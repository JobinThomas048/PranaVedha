"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { DashboardView } from "../components/DashboardView";
import { PackagesView } from "../components/PackagesView";
import { ConsultationFormView } from "../components/ConsultationFormView";
import { BenefitsView } from "../components/BenefitsView";
import { ClientStoriesView } from "../components/ClientStoriesView";
import { DoshaQuizModal } from "../components/DoshaQuizModal";
import { WhatsAppConfigModal } from "../components/WhatsAppConfigModal";
import { BookingConfirmationModal } from "../components/BookingConfirmationModal";
import { MyBookingsDrawer } from "../components/MyBookingsDrawer";
import { Footer } from "../components/Footer";
import { Doctor, PackagePlan, BookingDetails } from "../data/consultationData";
import { getLocalBookings } from "../utils/whatsapp";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Selection state passed to Form
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackagePlan | null>(null);

  // Modals state
  const [isDoshaModalOpen, setIsDoshaModalOpen] = useState<boolean>(false);
  const [isWhatsAppConfigOpen, setIsWhatsAppConfigOpen] = useState<boolean>(false);
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState<boolean>(false);

  // Booking Confirmation Modal
  const [activeBooking, setActiveBooking] = useState<BookingDetails | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  // Local storage count
  const [savedBookingsCount, setSavedBookingsCount] = useState<number>(0);

  const refreshBookingsCount = () => {
    if (typeof window !== "undefined") {
      const list = getLocalBookings();
      setSavedBookingsCount(list.length);
    }
  };

  useEffect(() => {
    refreshBookingsCount();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    handleTabChange("form");
  };

  const handleSelectPackage = (pkg: PackagePlan) => {
    setSelectedPackage(pkg);
    handleTabChange("form");
  };

  const handleBookingSuccess = (booking: BookingDetails) => {
    setActiveBooking(booking);
    setIsConfirmationOpen(true);
    refreshBookingsCount();
  };

  const handleApplyDosha = (doshaSummary: string) => {
    handleTabChange("form");
    if (typeof window !== "undefined") {
      const currentDraft = localStorage.getItem("pranaveda_form_draft") || "{}";
      try {
        const parsed = JSON.parse(currentDraft);
        parsed.symptomNotes = `Dosha Assessment Result: ${doshaSummary}\n` + (parsed.symptomNotes || "");
        localStorage.setItem("pranaveda_form_draft", JSON.stringify(parsed));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f4] text-[#1b1c19]">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenDoshaModal={() => setIsDoshaModalOpen(true)}
        onOpenWhatsAppConfig={() => setIsWhatsAppConfigOpen(true)}
        onOpenBookingsDrawer={() => setIsBookingsDrawerOpen(true)}
        savedBookingsCount={savedBookingsCount}
      />

      {/* Main Tabbed Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === "dashboard" && (
          <DashboardView
            onSelectDoctor={handleSelectDoctor}
            onNavigateToForm={() => handleTabChange("form")}
            onNavigateToPackages={() => handleTabChange("packages")}
            onOpenDoshaModal={() => setIsDoshaModalOpen(true)}
          />
        )}

        {activeTab === "packages" && (
          <PackagesView onSelectPackage={handleSelectPackage} />
        )}

        {activeTab === "form" && (
          <ConsultationFormView
            initialDoctor={selectedDoctor}
            initialPackage={selectedPackage}
            onBookingSuccess={handleBookingSuccess}
          />
        )}

        {activeTab === "benefits" && (
          <BenefitsView
            onOpenDoshaModal={() => setIsDoshaModalOpen(true)}
            onNavigateToForm={() => handleTabChange("form")}
          />
        )}

        {activeTab === "stories" && (
          <ClientStoriesView
            onNavigateToForm={() => handleTabChange("form")}
            onNavigateToPackages={() => handleTabChange("packages")}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenDoshaModal={() => setIsDoshaModalOpen(true)}
        onOpenWhatsAppConfig={() => setIsWhatsAppConfigOpen(true)}
      />

      {/* Modals & Drawers */}
      <DoshaQuizModal
        isOpen={isDoshaModalOpen}
        onClose={() => setIsDoshaModalOpen(false)}
        onApplyDosha={handleApplyDosha}
      />

      <WhatsAppConfigModal
        isOpen={isWhatsAppConfigOpen}
        onClose={() => setIsWhatsAppConfigOpen(false)}
      />

      <BookingConfirmationModal
        booking={activeBooking}
        onClose={() => setIsConfirmationOpen(false)}
        onViewAllBookings={() => {
          setIsConfirmationOpen(false);
          setIsBookingsDrawerOpen(true);
        }}
      />

      <MyBookingsDrawer
        isOpen={isBookingsDrawerOpen}
        onClose={() => setIsBookingsDrawerOpen(false)}
        onNewBookingClick={() => {
          setIsBookingsDrawerOpen(false);
          handleTabChange("form");
        }}
      />
    </div>
  );
}
