export const bookingPolicy = {
  dpAmount: 50000,
  rescheduleMinHoursBefore: 24,
  dpForfeitedOnLateReschedule: true,
  dpForfeitedOnCancellation: true,
  dpDeductedFromTotal: true,
  transportExcluded: true,
  appliesToServiceType: ["panggilan"] as const,
  dpPaymentMethods: [
    {
      type: "bank",
      label: "SeaBank",
      number: "901251265521",
      name: "Muhammad Daffa Daminatila",
    },
  ],
  dpNote: "DP akan dipotong dari total biaya layanan. Biaya transportasi terpisah dan dihitung berdasarkan jarak lokasi, dikonfirmasi via WhatsApp sebelum jadwal disepakati.",
};

export type BookingPolicy = typeof bookingPolicy;