export type LaptopCategory = "biasa" | "gaming";
export type FanCount = "1" | "2";
export type MainService = "basic" | "deep" | "deep-repasta" | "none";
export type ExtraService =
  | "windows"
  | "app-install"
  | "backup"
  | "ssd-check"
  | "exterior";
export type ThermalPaste = "z5" | "mx4" | "none";

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
  gaming: {
    basic: { min: 100000, max: null },
    deep: { min: 150000, max: null },
    "deep-repasta": { min: 200000, max: 450000 },
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

/**
 * Menentukan kunci harga berdasarkan kategori laptop dan jumlah kipas.
 * Sederhana: biasa -> biasa, gaming + 1 kipas -> gaming1, gaming + 2 kipas -> gaming2
 */
export function priceKey(category: LaptopCategory, _fan: FanCount): string {
  if (category === "gaming") return "gaming";
  return "biasa";
}

export function formatIDR(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

export function formatRange(p: PriceValue): string {
  if (p.max === null || p.max === p.min) return formatIDR(p.min);
  return `${formatIDR(p.min)}\u2013${formatIDR(p.max)}`;
}

/**
 * Klasifikasi laptop berbasis keyword sederhana.
 * Dapat diganti dengan AI API (Vercel Functions) di masa depan.
 * Return: { category, fanCount, confidence, reason }
 */
export interface LaptopClassification {
  category: LaptopCategory;
  fanCount: FanCount;
  confidence: "high" | "medium" | "low";
  reason: string;
}

/**
 * Keyword-based classification (simpel, cepat, no DB).
 * Aturan:
 * - Gaming keywords -> category "gaming"
 * - Fan keywords (2 fan, dual fan, 2x fan, twin fan) -> fan "2"
 * - Default: biasa, unknown fan
 */
const GAMING_KEYWORDS = [
  // Brand gaming
  "rog",
  "tuf",
  "strix",
  "zephyrus",
  "scar",
  "flow",
  "vivo",
  "predator",
  "nitro",
  "helios",
  "triton",
  "aphros",
  "omen",
  "victus",
  "legion",
  "loq",
  "alienware",
  "g15",
  "g16",
  "katana",
  "sword",
  "pulse",
  "crosshair",
  "stealth",
  "raider",
  "vector",
  "titan",
  "cyborg",
  "thin",
  "gf63",
  "creator",
  "blade",
  "razer",
  "pongo",
  "xplay",
  "aorus",
  "g5",
  // GPU keywords
  "rtx",
  "gtx",
  "rx ",
  "3050",
  "3060",
  "3070",
  "3080",
  "3090",
  "4050",
  "4060",
  "4070",
  "4080",
  "4090",
  "5060",
  "5070",
  "5080",
  "5090",
  "4050",
  "4060",
  "4070",
  "4080",
  "4090",
];

const FAN2_KEYWORDS = [
  "2 fan",
  "2 kipas",
  "dual fan",
  "twin fan",
  "2x fan",
  "2-kipas",
  "2-kipat",
  "2kipa",
  "dual kipas",
  "twin kipas",
];

export function classifyLaptop(
  brand: string,
  model: string,
): LaptopClassification {
  const text = `${brand} ${model}`.toLowerCase();

  // Cek gaming
  let category: LaptopCategory = "biasa";
  let categoryConfidence: "high" | "medium" | "low" = "low";
  let reason = "Default ke laptop biasa";

  for (const kw of GAMING_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      category = "gaming";
      categoryConfidence = "high";
      reason = `Terdeteksi keyword gaming: "${kw}"`;
      break;
    }
  }

  // Cek jumlah kipas
  let fanCount: FanCount = "1";
  let fanConfidence: "high" | "medium" | "low" = "low";
  let fanReason = "Default 1 kipas";

  for (const kw of FAN2_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      fanCount = "2";
      fanConfidence = "high";
      fanReason = `Terdeteksi keyword: "${kw}"`;
      break;
    }
  }

  // Heuristik tambahan: gaming series biasanya 2 fan
  if (category === "gaming" && fanCount === "1") {
    fanCount = "2"; // asumsi default gaming = 2 kipas
    fanConfidence = "medium";
    fanReason = "Asumsi default laptop gaming = 2 kipas";
  }

  const confidence: LaptopClassification["confidence"] =
    categoryConfidence === "high" && fanConfidence === "high"
      ? "high"
      : categoryConfidence === "high" || fanConfidence === "high"
        ? "medium"
        : "low";

  return {
    category,
    fanCount,
    confidence,
    reason: `${reason}. ${fanReason}`,
  };
}

/**
 * Interface untuk AI API classification (future-ready).
 * Dipanggil dari Vercel Function / API route jika tersedia.
 * Return format sama dengan classifyLaptop().
 */
export async function classifyLaptopWithAI(
  _brand: string,
  _model: string,
  _extraInfo?: string,
): Promise<LaptopClassification | null> {
  // TODO: Implementasi panggil Vercel Function / AI API
  // Contoh:
  // const res = await fetch('/api/classify-laptop', {
  //   method: 'POST',
  //   body: JSON.stringify({ brand, model, extraInfo }),
  // });
  // return res.json();
  return null; // Belum implementasi
}

/**
 * Fungsi utama: klasifikasi otomatis dengan fallback manual.
 * 1. Coba keyword-based
 * 2. Kalau confidence low, user tetap pilih manual
 * 3. Future: coba AI API jika tersedia
 */
export async function autoClassifyLaptop(
  brand: string,
  model: string,
): Promise<{
  classification: LaptopClassification;
  usedAI: boolean;
  showManualOverride: boolean;
}> {
  // Step 1: Keyword-based (instant, offline)
  const keywordResult = classifyLaptop(brand, model);

  // Step 2: Coba AI API jika confidence rendah (async, optional)
  // Hanya dipakai jika env AI_API_URL diset
  if (keywordResult.confidence === "low" && import.meta.env.VITE_AI_API_URL) {
    const aiResult = await classifyLaptopWithAI(brand, model);
    if (aiResult && aiResult.confidence !== "low") {
      return {
        classification: aiResult,
        usedAI: true,
        showManualOverride: true,
      };
    }
  }

  return {
    classification: keywordResult,
    usedAI: false,
    showManualOverride: keywordResult.confidence !== "high",
  };
}

export const categoryDisplayMap: Record<LaptopCategory, string> = {
  biasa: "Laptop Biasa",
  gaming: "Laptop Gaming",
};

export const fanCountDisplayMap: Record<FanCount, string> = {
  1: "1 Kipas",
  2: "2 Kipas",
};
