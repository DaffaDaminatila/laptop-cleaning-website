import { businessConfig } from "../config/business";

export function waUrl(message: string): string {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): boolean {
  try {
    const url = waUrl(message);
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) {
      window.location.href = url;
    }
    return true;
  } catch {
    return false;
  }
}

export const INQUIRY_MESSAGE = "Halo, saya ingin bertanya mengenai jasa cleaning laptop.";

// Build full order message from form data
export function buildOrderMessage(
  form: Record<string, any>,
  estimate?: {
    totalLabel: string;
    lines: Array<{ label: string; amount: string }>;
    needsConfirmation?: boolean;
  },
  transport?: {
    km: number;
    tierLabel: string;
    price: number;
    needsConfirmation: boolean;
    calculating: boolean;
    error?: string;
  }
): string {
  const lines = [
    "📋 *PEMESANAN CLEANING LAPTOP*",
    "",
    "👤 *Informasi Pelanggan*",
    `Nama: ${form.name || "-"}`,
    `WhatsApp: ${form.whatsapp || "-"}`,
    `Metode: ${form.serviceType === "panggilan" ? "Panggilan ke lokasi (wajib DP)" : "Antar laptop (tanpa DP)"}`,
    `Alamat: ${form.address || "-"}`,
        form.locationLink ? `Link Maps: ${form.locationLink}` : "",
        form.serviceType === "panggilan" && transport && !transport.calculating && !transport.error
          ? `Jarak: ~${transport.km} km (${transport.tierLabel})`
          : "",
        form.serviceType === "panggilan" && transport && !transport.calculating && !transport.error && !transport.needsConfirmation
          ? `Transport: Rp${transport.price.toLocaleString("id-ID")}`
          : "",
        form.serviceType === "panggilan" && transport && transport.needsConfirmation
          ? "Transport: Konfirmasi Admin (>30 km)"
          : "",
        "",
    "💻 *Informasi Laptop*",
    `Merek: ${form.brand || "-"}`,
    `Model: ${form.model || "-"}`,
    `Kategori: ${form.category || "-"}`,
    `Kipas: ${form.fan || "-"}`,
    `Keluhan: ${form.issue || "-"}`,
    "",
    "🔧 *Layanan Utama*",
    form.mainService ? (() => {
      const svcMap: Record<string, string> = {
        basic: "Basic Cleaning",
        deep: "Deep Cleaning",
        "deep-repasta": "Deep Cleaning + Repasta",
      };
      return svcMap[form.mainService] || form.mainService;
    })() : "-",
    "",
    "➕ *Layanan Tambahan*",
    ...(form.extras?.length ? form.extras.map((e: string) => `• ${e}`) : ["-"]),
    "",
    "🌡️ *Thermal Paste*",
    form.thermalPaste ? (() => {
      const pasteMap: Record<string, string> = {
        "included": "DeepCool Z5 (termasuk)",
        "mx4": "Arctic MX-4 (+ Rp15.000)",
        "custom": "Bawa sendiri",
      };
      return pasteMap[form.thermalPaste] || form.thermalPaste;
    })() : "-",
    "",
    "📅 *Jadwal*",
    `Tanggal: ${form.date || "-"}`,
    `Waktu: ${form.time || "-"}`,
    form.note ? `Catatan: ${form.note}` : "",
    "",
    "💰 *Estimasi Harga*",
  ];

  if (estimate) {
    lines.push(
      ...estimate.lines.map(l => `• ${l.label}: ${l.amount}`),
      `Total: ${estimate.totalLabel}`,
      estimate.needsConfirmation ? "⚠️ Harga final dikonfirmasi via WhatsApp" : ""
    );
  } else {
    lines.push("(belum dihitung — isi form lengkap untuk estimasi)");
  }

  lines.push(
    "",
    "✅ *Kebijakan Booking*",
    form.agreePolicy ? "Disetujui" : "BELUM DISETUJUI",
    "",
    "—",
    "Dikirim dari website DAFFA LAPTOP CLEANING SERVICE"
  );

  return lines.filter(Boolean).join("\n");
}
