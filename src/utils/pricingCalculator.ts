import {
  LaptopCategory, FanCount, MainService, ExtraService, ThermalPaste,
  cleaningPrices, extraPrices, priceKey, MX4_ADDON,
} from "../config/pricing";

export interface EstimateInput {
  category: LaptopCategory;
  fan: FanCount;
  mainService: MainService;
  extras: ExtraService[];
  thermalPaste: ThermalPaste;
}

export interface EstimateResult {
  lines: { label: string; amount: string }[];
  totalMin: number;
  totalMax: number | null;
  totalLabel: string;
  needsConfirmation: boolean;
  notes: string[];
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const key = priceKey(input.category, input.fan);
  const lines: { label: string; amount: string }[] = [];
  const notes: string[] = [];
  let needsConfirmation = false;

  let totalMin = 0;
  let totalMax: number | null = 0;

  if (input.mainService !== "none") {
    const p = cleaningPrices[key][input.mainService];
    const label =
      input.mainService === "basic" ? "Basic Cleaning" :
      input.mainService === "deep" ? "Deep Cleaning" : "Deep Cleaning + Repasta";
    lines.push({
      label,
      amount: p.max ? `Estimasi ${p.min.toLocaleString("id-ID")}\u2013${p.max.toLocaleString("id-ID")}`.replace(/^/, "Rp") : "Rp" + p.min.toLocaleString("id-ID"),
    });
    totalMin += p.min;
    if (totalMax !== null) totalMax = p.max !== null ? totalMax + p.max : null;

    if (p.max !== null) {
      needsConfirmation = true;
      notes.push("Harga paket repasta kategori ini berupa rentang — harga akhir dikonfirmasi berdasarkan model laptop, konstruksi pendingin, dan kebutuhan material.");
    }
  }

  for (const e of input.extras) {
    const info = extraPrices[e];
    lines.push({ label: info.label, amount: "Rp" + info.price.toLocaleString("id-ID") });
    totalMin += info.price;
    if (totalMax !== null) totalMax += info.price;
  }

  if (input.mainService === "deep-repasta" && input.thermalPaste === "mx4") {
    lines.push({ label: "Add-on ARCTIC MX-4", amount: "Rp" + MX4_ADDON.toLocaleString("id-ID") });
    totalMin += MX4_ADDON;
    if (totalMax !== null) totalMax += MX4_ADDON;
  }

  if (input.category === "unknown" || input.fan === "unknown") {
    if (input.mainService !== "none") {
      needsConfirmation = true;
      notes.push("Kategori/ jumlah kipas belum diketahui — estimasi memakai tabel dasar, harga akhir dikonfirmasi via WhatsApp.");
    }
  }
  if (input.category === "gaming" && input.mainService === "deep-repasta") {
    needsConfirmation = true;
    notes.push("Laptop gaming dengan sistem pendingin khusus memerlukan konfirmasi terlebih dahulu.");
  }

  const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");
  let totalLabel: string;
  if (lines.length === 0) totalLabel = "Pilih layanan terlebih dahulu";
  else if (totalMax === null || totalMax === totalMin) totalLabel = fmt(totalMin);
  else totalLabel = `Estimasi ${fmt(totalMin)}\u2013${fmt(totalMax)}`;

  return { lines, totalMin, totalMax, totalLabel, needsConfirmation, notes };
}
