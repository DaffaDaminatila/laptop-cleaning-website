/**
 * Transport pricing configuration
 * Base: RT 03 RW 08, Harjasari, Kec. Bogor Sel., Kota Bogor, Jawa Barat 16138
 * Koordinat: -6.6609, 106.8431 (Harjasari, Bogor Selatan, Bogor)
 */

export interface TransportTier {
  minKm: number;
  maxKm: number | null; // null = no upper limit
  price: number;
  label: string;
}

export const TRANSPORT_TIERS: TransportTier[] = [
  { minKm: 0, maxKm: 5, price: 10000, label: "0–5 km" },
  { minKm: 6, maxKm: 10, price: 15000, label: "6–10 km" },
  { minKm: 11, maxKm: 15, price: 20000, label: "11–15 km" },
  { minKm: 16, maxKm: 20, price: 30000, label: "16–20 km" },
  { minKm: 21, maxKm: 25, price: 35000, label: "21–25 km" },
  { minKm: 26, maxKm: 30, price: 45000, label: "26–30 km" },
  { minKm: 31, maxKm: null, price: 0, label: ">30 km (Konfirmasi Admin)" },
];

export const BASE_LOCATION = {
  name: "Base Operasional (Harjasari, Bogor Selatan)",
  address: "RT 03 RW 08, Harjasari, Kec. Bogor Sel., Kota Bogor, Jawa Barat 16138",
  // Koordinat Harjasari, Bogor Selatan, Bogor
  lat: -6.6609,
  lng: 106.8431,
};

export function getTransportPrice(km: number): { tier: TransportTier; price: number; needsConfirmation: boolean } {
  for (const tier of TRANSPORT_TIERS) {
    const inRange = km >= tier.minKm && (tier.maxKm === null || km <= tier.maxKm);
    if (inRange) {
      return {
        tier,
        price: tier.price,
        needsConfirmation: tier.price === 0, // >30 km
      };
    }
  }
  // fallback
  return { tier: TRANSPORT_TIERS[TRANSPORT_TIERS.length - 1], price: 0, needsConfirmation: true };
}

export function formatIDR(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

/**
 * Haversine distance (straight-line) in km
 */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Geocode address using OpenStreetMap Nominatim (free, no API key)
 * Returns { lat, lng, displayName } or null if not found
 */
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number; displayName: string } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=id`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "DaffaLaptopCleaning/1.0 (daffalaptopcare.vercel.app)",
      },
    });
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }
    return null;
  } catch (e) {
    console.error("Geocode error:", e);
    return null;
  }
}

/**
 * Calculate transport cost from base to customer address
 * Returns { km, price, tierLabel, needsConfirmation, geocodedAddress }
 */
export async function calculateTransportCost(customerAddress: string): Promise<{
  km: number;
  price: number;
  tierLabel: string;
  needsConfirmation: boolean;
  geocodedAddress: string | null;
  error?: string;
}> {
  // Geocode customer address
  const geo = await geocodeAddress(customerAddress);
  if (!geo) {
    return {
      km: 0,
      price: 0,
      tierLabel: "Tidak dapat menghitung",
      needsConfirmation: true,
      geocodedAddress: null,
      error: "Alamat tidak ditemukan. Silakan masukkan alamat lengkap atau link Google Maps.",
    };
  }

  // Calculate straight-line distance
  const km = haversineKm(BASE_LOCATION.lat, BASE_LOCATION.lng, geo.lat, geo.lng);
  const roundedKm = Math.ceil(km); // pembulatan ke atas untuk tier

  const { tier, price, needsConfirmation } = getTransportPrice(roundedKm);

  return {
    km: roundedKm,
    price,
    tierLabel: tier.label,
    needsConfirmation,
    geocodedAddress: geo.displayName,
  };
}