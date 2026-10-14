/**
 * Transport pricing configuration
 * Base: GIRANGSARI, 06/08, Harjasari, Bogor Selatan, 16138
 * Koordinat: -6.659186546626838, 106.84142298108236
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
  name: "Base Operasional (Girangsari, Harjasari, Bogor Selatan)",
  address: "GIRANGSARI, 06/08, Harjasari, Bogor Selatan, 16138",
  // Koordinat exact: Girangsari, Harjasari, Bogor Selatan
  lat: -6.659186546626838,
  lng: 106.84142298108236,
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
 * Check if URL is a Google Maps short link that needs server-side resolution
 */
function isGoogleMapsShortLink(url: string): boolean {
  return /maps\.app\.goo\.gl/i.test(url) || /goo\.gl\/maps/i.test(url);
}

/**
 * Resolve Google Maps short link via Vercel serverless function
 * Returns { lat, lng, displayName } or null
 */
async function resolveShortLink(shortUrl: string): Promise<{ lat: number; lng: number; displayName: string } | null> {
  try {
    const apiUrl = `/api/resolve-maps?url=${encodeURIComponent(shortUrl)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.lat && data.lng) {
      return {
        lat: data.lat,
        lng: data.lng,
        displayName: `Google Maps short link (${data.lat.toFixed(6)}, ${data.lng.toFixed(6)})`,
      };
    }
    return null;
  } catch (e) {
    console.error("Resolve short link error:", e);
    return null;
  }
}

/**
 * Parse Google Maps URL to extract coordinates
 * Supports formats:
 * - https://www.google.com/maps/search/?api=1&query=-6.123,106.456
 * - https://www.google.com/maps/@-6.123,106.456,15z
 * - https://www.google.com/maps/place/Something/@-6.123,106.456,15z
 * - https://maps.google.com/?q=-6.123,106.456
 * - Direct coordinates: "-6.123, 106.456"
 * NOTE: Short links (maps.app.goo.gl, goo.gl/maps) need server-side redirect follow
 */
export function parseGoogleMapsUrl(url: string): { lat: number; lng: number } | null {
  try {
    // Direct coordinates: "-6.123, 106.456" or "-6.123,106.456"
    const directCoord = url.trim().match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (directCoord) {
      const lat = parseFloat(directCoord[1]);
      const lng = parseFloat(directCoord[2]);
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng };
      }
    }

    // Google Maps URL patterns
    const patterns = [
      // /@lat,lng,zoom
      /@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
      // /query=lat,lng or ?q=lat,lng
      /[?&](?:query|q)=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
      // /place/.../@lat,lng
      /\/place\/[^@]*@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        const lat = parseFloat(match[1]);
        const lng = parseFloat(match[2]);
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          return { lat, lng };
        }
      }
    }

    return null;
  } catch {
    return null;
  }
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
 * Priority: Google Maps link (exact coords) → short link resolution → Nominatim geocoding
 * Returns { km, price, tierLabel, needsConfirmation, geocodedAddress, error? }
 */
export async function calculateTransportCost(
  customerAddress: string,
  locationLink?: string
): Promise<{
  km: number;
  price: number;
  tierLabel: string;
  needsConfirmation: boolean;
  geocodedAddress: string | null;
  error?: string;
}> {
  let geo: { lat: number; lng: number; displayName: string } | null = null;

  // 1. Try Google Maps link first (exact coordinates from full URL)
  if (locationLink && locationLink.trim()) {
    const parsed = parseGoogleMapsUrl(locationLink.trim());
    if (parsed) {
      geo = {
        lat: parsed.lat,
        lng: parsed.lng,
        displayName: `Koordinat dari Google Maps (${parsed.lat.toFixed(6)}, ${parsed.lng.toFixed(6)})`,
      };
    }
    // 2. Try short link resolution (maps.app.goo.gl, goo.gl/maps)
    else if (isGoogleMapsShortLink(locationLink.trim())) {
      geo = await resolveShortLink(locationLink.trim());
    }
  }

  // 3. Fallback to Nominatim geocoding
  if (!geo) {
    geo = await geocodeAddress(customerAddress);
    if (!geo) {
      return {
        km: 0,
        price: 0,
        tierLabel: "Tidak dapat menghitung",
        needsConfirmation: true,
        geocodedAddress: null,
        error: "Alamat tidak ditemukan. Silakan masukkan alamat lengkap atau link Google Maps untuk akurasi maksimal.",
      };
    }
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