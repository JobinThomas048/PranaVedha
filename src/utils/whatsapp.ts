import { BookingDetails } from "../data/consultationData";

export const DEFAULT_WHATSAPP_NUMBER = "919845012345"; // Production Clinic Line

export function getStoredWhatsAppNumber(): string {
  if (typeof window !== "undefined") {
    const customNumber = localStorage.getItem("pranaveda_clinic_whatsapp");
    if (customNumber && customNumber.trim().length > 7) {
      return customNumber.trim().replace(/[^0-9]/g, "");
    }
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function saveStoredWhatsAppNumber(num: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("pranaveda_clinic_whatsapp", num.replace(/[^0-9]/g, ""));
  }
}

export function formatWhatsAppMessage(booking: BookingDetails): string {
  const complaintsText =
    booking.complaints.length > 0 ? booking.complaints.join(", ") : "General Wellness Assessment";

  return `🌿 *NEW NATUROPATHY E-CONSULTATION BOOKING*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Booking Reference:* ${booking.bookingId}
⏱️ *Requested At:* ${booking.createdAt}

👤 *PATIENT PROFILE*
• *Name:* ${booking.patientName}
• *Age / Gender:* ${booking.age} Yrs | ${booking.gender}
• *Contact:* ${booking.patientPhone || "Not specified"}
• *BMI & Agni:* ${booking.bmi} kg/m² (${booking.agniStatus})
• *Height / Weight:* ${booking.height} cm / ${booking.weight} kg

📦 *PACKAGE SELECTED*
• *Program:* ${booking.selectedPackage}
• *Total Fee:* ₹${booking.packagePrice.toLocaleString("en-IN")}

🩺 *CONSULTATION DETAILS*
• *Assigned Specialist:* ${booking.selectedDoctor}
• *Consultation Mode:* ${booking.consultationMode}
• *Preferred Slot:* ${booking.selectedSlot}
• *Regional Dispensary:* ${booking.regionalCenter}

🎯 *CHIEF CONCERNS & SYMPTOMS*
• *Areas:* ${complaintsText}
• *Patient Narrative:* ${booking.notes || "No additional comments provided."}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 *Zero-Login Guest Booking via PranaVeda Portal*
Please confirm doctor availability and provide the live consultation link.`;
}

export function generateWhatsAppUrl(
  booking: BookingDetails,
  customNumber?: string
): string {
  const targetNumber = (customNumber || getStoredWhatsAppNumber()).replace(
    /[^0-9]/g,
    ""
  );
  const message = formatWhatsAppMessage(booking);
  return `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(
    message
  )}`;
}

export function saveBookingToLocalStorage(booking: BookingDetails): void {
  if (typeof window === "undefined") return;
  try {
    const existing = localStorage.getItem("pranaveda_user_bookings");
    const list: BookingDetails[] = existing ? JSON.parse(existing) : [];
    list.unshift(booking);
    // Keep last 20 bookings
    localStorage.setItem(
      "pranaveda_user_bookings",
      JSON.stringify(list.slice(0, 20))
    );
  } catch (e) {
    console.error("Failed to save booking history to localStorage", e);
  }
}

export function getLocalBookings(): BookingDetails[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = localStorage.getItem("pranaveda_user_bookings");
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    console.error("Failed to read booking history", e);
    return [];
  }
}
