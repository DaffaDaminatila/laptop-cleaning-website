export type LaptopCategory = "biasa" | "gaming" | "unknown";
export type FanCount = "1" | "2" | "unknown";
export type MainService = "basic" | "deep" | "deep-repasta" | "none";
export type ExtraService =
  | "windows"
  | "app-install"
  | "backup"
  | "ssd-check"
  | "exterior";
export type ThermalPaste = "z5" | "mx4" | "none" | "consult";

export interface PriceValue {
  min: number;
  max: number | null;
}

export const cleaningPrices: Record<string, Record<MainService, PriceValue>> = {
  biasa: {
    basic: { min: 75000, max: null },
    deep: { min: 100000, max: null },
    "deep-repasta": { min: 125000, max: null },
    none: { min: 0, max: null },
  },
  gaming1: {
    basic: { min: 100000, max: null },
    deep: { min: 150000, max: null },
    "deep-repasta": { min: 200000, max: 300000 },
    none: { min: 0, max: null },
  },
  gaming2: {
    basic: { min: 150000, max: null },
    deep: { min: 175000, max: null },
    "deep-repasta": { min: 225000, max: 400000 },
    none: { min: 0, max: null },
  },
};

export const extraPrices: Record<
  ExtraService,
  { label: string; price: number }
> = {
  windows: { label: "Instal Ulang Windows", price: 100000 },
  "app-install": { label: "Instal Aplikasi Lainnya", price: 50000 },
  backup: { label: "Backup Data", price: 25000 },
  "ssd-check": { label: "Cek Kondisi SSD/HDD", price: 10000 },
  exterior: { label: "Pembersihan Eksterior", price: 25000 },
};

export const MAIN_SERVICE_LABELS: Record<MainService, string> = {
  basic: "Basic Cleaning",
  deep: "Deep Cleaning",
  "deep-repasta": "Deep Cleaning + Repasta",
  none: "Tidak / hanya layanan lain",
};

export const MX4_ADDON = 15000;

export function priceKey(category: LaptopCategory, fan: FanCount): string {
  if (category === "gaming" && fan === "2") return "gaming2";
  if (category === "gaming") return "gaming1"; // gaming 1 fan atau belum tahu -> pakai tabel 1 fan
  return "biasa";
}

export function formatIDR(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

export function formatRange(p: PriceValue): string {
  if (p.max === null || p.max === p.min) return formatIDR(p.min);
  return `${formatIDR(p.min)}\u2013${formatIDR(p.max)}`;
}
