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
