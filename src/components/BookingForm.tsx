import { useState, useMemo, useEffect, useRef } from "react";
import { Card, Button, Select, Input, Checkbox } from "./ui";
import { Calculator, HardDrive, Monitor, Zap, UserCircle, Truck, Calendar, RefreshCw, AlertCircle, Loader2, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { openWhatsApp, buildOrderMessage } from "../utils/whatsapp";
import { calculateEstimate } from "../utils/pricingCalculator";
import { MX4_ADDON } from "../config/pricing";
import { classifyLaptop, LaptopClassification, categoryDisplayMap, fanCountDisplayMap } from "../config/pricing";
import { calculateTransportCost } from "../config/transport";

type LaptopCategory = "biasa" | "gaming";
type FanCount = "1" | "2";
type MainService = "basic" | "deep" | "deep-repasta" | "none";
type ServiceType = "panggilan" | "antar";

const laptopCategories: { value: LaptopCategory; label: string }[] = [
  { value: "biasa", label: "Laptop Biasa" },
  { value: "gaming", label: "Laptop Gaming" },
];

const fanCounts: { value: FanCount; label: string }[] = [
  { value: "1", label: "1 Kipas" },
  { value: "2", label: "2 Kipas" },
];

const mainServices: { value: MainService; label: string; description: string }[] = [
  { value: "basic", label: "Basic Cleaning", description: "Pembersihan debu pada kipas dan area ventilasi tanpa melepas heatsink." },
  { value: "deep", label: "Deep Cleaning", description: "Pembongkaran untuk membersihkan kipas, heatsink, dan bagian dalam." },
  { value: "deep-repasta", label: "Deep Cleaning + Repasta", description: "Pembersihan menyeluruh + ganti thermal paste." },
  { value: "none", label: "Tidak diperlukan", description: "Hanya layanan tambahan di bawah." },
];

const extraServices: { value: string; label: string; price: number; desc: string }[] = [
  { value: "backup", label: "Backup Data", price: 25000, desc: "Backup data penting sebelum pengerjaan." },
  { value: "ssd-check", label: "Cek SSD/HDD", price: 10000, desc: "Pemeriksaan kondisi kesehatan penyimpanan." },
  { value: "exterior", label: "Pembersihan Eksterior", price: 25000, desc: "Bersih body, keyboard, layar, port." },
];

const thermalPasteOptions: { value: string; label: string; price?: number }[] = [
  { value: "z5", label: "DeepCool Z5 (Standar, sudah termasuk)", price: 0 },
  { value: "mx4", label: "ARCTIC MX-4 (add-on Rp15.000)", price: MX4_ADDON },
  { value: "none", label: "Tidak perlu ganti" },
];

function getMinDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function getRescheduleDeadline(dateStr: string): string {
  if (!dateStr) return "";
  const bookingDate = new Date(dateStr + "T00:00:00");
  bookingDate.setDate(bookingDate.getDate() - 1);
  return bookingDate.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export default function BookingForm() {
  const [form, setForm] = useState<{
    name: string;
    whatsapp: string;
    serviceType: ServiceType;
    address: string;
    locationLink: string;
    brand: string;
    model: string;
    category: LaptopCategory | "";
    fan: FanCount | "";
    issue: string;
    mainService: MainService;
    extras: string[];
    thermalPaste: string;
    date: string;
    time: string;
    note: string;
    agreePolicy: boolean;
  }>({
    name: "",
    whatsapp: "",
    serviceType: "panggilan",
    address: "",
    locationLink: "",
    brand: "",
    model: "",
    category: "",
    fan: "",
    issue: "",
    mainService: "none",
    extras: [],
    thermalPaste: "z5",
    date: "",
    time: "",
    note: "",
    agreePolicy: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
        const minDate = getMinDate();

        // Auto-classification state
        const [classification, setClassification] = useState<LaptopClassification | null>(null);
        const [isClassifying, setIsClassifying] = useState(false);
        const [showManualOverride, setShowManualOverride] = useState(false);
        const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
        const previousBrandModelRef = useRef<{ brand: string; model: string } | null>(null);

        // Auto-classify when brand & model change (debounced)
          useEffect(() => {
            const brand = form.brand.trim();
            const model = form.model.trim();

            if (!brand || !model) {
              if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
              return;
            }

            // Debounce 300ms sebelum jalankan klasifikasi
            debounceTimerRef.current = setTimeout(() => {
              // Cek apakah brand/model berubah sejak terakhir kali
              const prev = previousBrandModelRef.current;
              if (prev && prev.brand === brand && prev.model === model) {
                return; // Belum berubah, biarkan klasifikasi class berko
              }

              previousBrandModelRef.current = { brand, model };

              const runClassification = async () => {
                setIsClassifying(true);
                try {
                  const result = classifyLaptop(brand, model);
                  setClassification(result);

                  setForm(prev => ({
                    ...prev,
                    category: result.category,
                    fan: result.fanCount,
                  }));
                } catch (e) {
                  console.error("Classification error:", e);
                } finally {
                  setIsClassifying(false);
                }
              };

              runClassification();
            }, 300);

            // Cleanup function
            return () => {
              if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            };
          }, [form.brand, form.model]);

      // Transport calculation state
      const [transport, setTransport] = useState<{
        km: number;
        price: number;
        tierLabel: string;
        needsConfirmation: boolean;
        geocodedAddress: string | null;
        error?: string;
        calculating: boolean;
      } | null>(null);

      // Auto-calculate transport when address changes (only for panggilan)
            useEffect(() => {
              if (form.serviceType !== "panggilan" || !form.address.trim()) {
                setTransport(null);
                return;
              }

              const runTransportCalc = async () => {
                setTransport(prev => prev ? { ...prev, calculating: true } : null);
                try {
                  const result = await calculateTransportCost(form.address, form.locationLink);
                  setTransport({ ...result, calculating: false });
                } catch (e) {
                  console.error("Transport calc error:", e);
                  setTransport({ km: 0, price: 0, tierLabel: "Error", needsConfirmation: true, geocodedAddress: null, calculating: false, error: "Gagal menghitung jarak" });
                }
              };

              runTransportCalc();
            }, [form.address, form.locationLink, form.serviceType]);

      const estimate = useMemo(() => {
                  // Hitung estimasi begitu data pricing utama lengkap (kategori, kipas, layanan)
                  // Brand & Model hanya untuk identifikasi, tidak butuh buat hitung harga
                  const hasPricingData = form.category && form.fan && form.mainService !== "none";
                  if (!hasPricingData) return null;

            return calculateEstimate({
              category: form.category as LaptopCategory,
              fan: form.fan as FanCount,
              mainService: form.mainService,
              extras: form.extras as any,
              thermalPaste: form.thermalPaste as any,
            });
          }, [form.category, form.fan, form.mainService, form.extras, form.thermalPaste]);

  const handleSelect = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const validateForm = (): boolean => {
            const required = ["name", "brand", "model", "serviceType", "address", "category", "fan", "mainService", "date", "time"];
            const newTouched: Record<string, boolean> = {};
            required.forEach(f => newTouched[f] = true);
            const basicValid = required.every(f => {
              const val = form[f as keyof typeof form];
              if (!val || String(val).trim() === "") return false;
              return true;
            });
            const policyValid = form.serviceType === "antar" ? true : form.agreePolicy === true;
            if (!policyValid) newTouched["agreePolicy"] = true;
            setTouched(newTouched);
            return basicValid && policyValid;
          };

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!validateForm()) return;

          const message = buildOrderMessage(form, estimate || undefined, transport || undefined);
          const success = openWhatsApp(message);
          if (!success) alert("Tidak dapat membuka WhatsApp. Silakan buka https://wa.me/6281285526337");
        };

    const rescheduleDeadline = form.date ? getRescheduleDeadline(form.date) : null;
    const requiresDP = form.serviceType === "panggilan";

  return (
    <section id="pesan" className="py-14 sm:py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">Formulir Pemesanan</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Isi formulir untuk mendapatkan estimasi harga. Kami akan konfirmasi detail via WhatsApp.
          </p>
        </header>

        {/* Booking Policy Notice - BEFORE form */}
        <Card className="p-4 sm:p-5 bg-emerald-50 border-emerald-200 mb-6 sm:mb-8 overflow-hidden">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <AlertCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-emerald-900 mb-2 text-sm sm:text-base">Kebijakan Booking (Wajib Dibaca)</h4>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-emerald-800 list-disc pl-4 break-words">
                <li><strong>DP Rp50.000</strong> wajib untuk metode <strong>Panggilan</strong> (dipotong dari total biaya layanan)</li>
                <li>Reschedule / cancel gratis maksimal <strong>H-1 (24 jam sebelum)</strong></li>
                <li>Lewat dari H-1 atau pembatalan → <strong>DP hangus</strong>, silakan booking ulang</li>
                <li>Biaya transportasi <strong>terpisah</strong> & dikonfirmasi via WhatsApp</li>
                <li className="break-all sm:break-words">Rekening DP: <strong>SeaBank 901251265521 a.n. Muhammad Daffa Daminatila</strong></li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 lg:p-10 bg-white overflow-hidden">
          <form onSubmit={handleSubmit} noValidate>
            {/* INFORMASI PELANGGAN */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <UserCircle size={22} className="text-blue-500 flex-shrink-0" /> Informasi Pelanggan
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="min-w-0">
                <Input
                  label="Nama Lengkap *"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  error={touched.name && !form.name ? "Nama wajib diisi" : undefined}
                  placeholder="Nama lengkap Anda"
                />
                </div>
                <div className="min-w-0">
                <Input
                  label="Nomor WhatsApp"
                  value={form.whatsapp}
                  onChange={e => setForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="62812xxxxxx"
                />
                </div>
              </div>
            </div>

            {/* METODE LAYANAN */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Truck size={22} className="text-blue-500 flex-shrink-0" /> Metode Layanan
              </h3>
              <div className="space-y-3">
                <div className="min-w-0">
                <Select
                  label="Pilih Metode"
                  value={form.serviceType}
                  onChange={e => handleSelect("serviceType", e.target.value)}
                  options={[
                    { value: "panggilan", label: "Panggilan ke lokasi pelanggan (wajib DP)" },
                    { value: "antar", label: "Antar laptop ke lokasi yang disepakati (tanpa DP)" },
                  ]}
                />
                </div>
                <div className="min-w-0">
                  <Input
                    label={form.serviceType === "panggilan" ? "Alamat Lengkap *" : "Lokasi Penyerahan"}
                    value={form.address}
                    onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                    error={touched.address && !form.address ? "Alamat wajib diisi" : undefined}
                    placeholder="Alamat lengkap atau nama jalan..."
                  />
                  <Input
                                      label="Link Google Maps (opsional)"
                                      value={form.locationLink}
                                      onChange={e => setForm(prev => ({ ...prev, locationLink: e.target.value }))}
                                      placeholder="https://maps.google.com/..."
                                      className="mt-2"
                                    />
                                  </div>

                                  {/* TRANSPORT ESTIMATION - only for panggilan */}
                                  {form.serviceType === "panggilan" && form.address.trim() && (
                                    <div className="mt-4 p-4 rounded-xl border bg-blue-50 border-blue-200 min-w-0 overflow-hidden">
                                      <div className="flex items-center gap-2 mb-3">
                                        <MapPin size={20} className="text-blue-500 flex-shrink-0" />
                                        <span className="font-semibold text-slate-900">Estimasi Ongkos Panggilan</span>
                                      </div>
                                      {transport && transport.calculating && (
                                                                              <div className="flex items-center gap-3 text-sm text-blue-700">
                                                                                <Loader2 size={18} className="animate-spin" />
                                                                                Menghitung jarak dari base Girangsari...
                                                                              </div>
                                                                            )}
                                      {transport && !transport.calculating && !transport.error && (
                                        <div className="space-y-2">
                                          <div className="flex justify-between gap-2 text-sm">
                                            <span className="text-slate-700 min-w-0 break-words">Jarak (garis lurus):</span>
                                            <span className="font-medium text-slate-900 whitespace-nowrap flex-shrink-0">~{transport.km} km</span>
                                          </div>
                                          <div className="flex justify-between gap-2 text-sm">
                                            <span className="text-slate-700 min-w-0 break-words">Zona:</span>
                                            <span className="font-medium text-slate-900 whitespace-nowrap flex-shrink-0">{transport.tierLabel}</span>
                                          </div>
                                          <div className="border-t border-blue-200 pt-2">
                                            <div className="flex justify-between gap-2">
                                              <span className="font-bold text-slate-900 text-base">Ongkos Panggilan:</span>
                                              {transport.needsConfirmation ? (
                                                <span className="text-lg font-extrabold text-amber-600 flex-shrink-0">
                                                  Konfirmasi Admin
                                                </span>
                                              ) : (
                                                <span className="text-lg font-extrabold text-emerald-600 text-right flex-shrink-0">
                                                  {transport.price.toLocaleString("id-ID")}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                          {transport.geocodedAddress && (
                                            <p className="text-[11px] text-slate-500 break-words">
                                              Lokasi terdeteksi: {transport.geocodedAddress.substring(0, 120)}{transport.geocodedAddress.length > 120 ? "..." : ""}
                                            </p>
                                          )}
                                        </div>
                                      )}
                                      {transport && transport.error && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                          <p className="text-red-700 text-sm">{transport.error}</p>
                                          <p className="text-[12px] text-red-500 mt-1">Silakan isi alamat lengkap atau tambahkan link Google Maps untuk akurasi lebih baik.</p>
                                        </div>
                                      )}
                                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                                                                              * Jarak dihitung garis lurus dari base Girangsari, Harjasari, Bogor Selatan. Harga final dikonfirmasi via WhatsApp.
                                                                              Base: GIRANGSARI, 06/08, Harjasari, Bogor Selatan 16138.
                                                                            </p>
                                    </div>
                                  )}
                                </div>
                              </div>

            {/* INFORMASI LAPTOP */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Monitor size={22} className="text-blue-500 flex-shrink-0" /> Informasi Laptop
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                              <div className="min-w-0">
                              <Input
                                label="Merek Laptop *"
                                value={form.brand}
                                onChange={e => setForm(prev => ({ ...prev, brand: e.target.value }))}
                                error={touched.brand && !form.brand ? "Merek wajib diisi" : undefined}
                                placeholder="Dell, HP, ASUS, Lenovo..."
                              />
                              </div>
                              <div className="min-w-0">
                              <Input
                                label="Model Laptop *"
                                value={form.model}
                                onChange={e => setForm(prev => ({ ...prev, model: e.target.value }))}
                                error={touched.model && !form.model ? "Model wajib diisi" : undefined}
                                placeholder="Model spesifik laptop"
                              />
                              </div>
                            </div>

                            {/* AUTO CLASSIFICATION RESULT */}
                            {classification && (
                              <div className="mt-4 p-3 rounded-xl border flex items-center gap-3 min-w-0"
                                   style={{
                                     backgroundColor: classification.confidence === "high" ? "#ecfdf5" : 
                                                       classification.confidence === "medium" ? "#fffbeb" : "#fef2f2",
                                     borderColor: classification.confidence === "high" ? "#a7f3d0" : 
                                                  classification.confidence === "medium" ? "#fde68a" : "#fecaca",
                                   }}>
                                {isClassifying ? (
                                  <Loader2 size={20} className="text-blue-500 animate-spin flex-shrink-0" />
                                ) : classification.confidence === "high" ? (
                                  <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                                ) : (
                                  <Sparkles size={20} className="text-amber-500 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-medium text-sm text-slate-900">
                                      {classification.confidence === "high" ? "✓ Terdeteksi otomatis" : 
                                       classification.confidence === "medium" ? "⚡ Deteksi sebagian" : "❓ Perlu konfirmasi"}
                                    </span>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full"
                                          style={{
                                            backgroundColor: classification.confidence === "high" ? "#d1fae5" : 
                                                             classification.confidence === "medium" ? "#fef3c7" : "#fee2e2",
                                            color: classification.confidence === "high" ? "#065f46" : 
                                                   classification.confidence === "medium" ? "#92400e" : "#991b1b",
                                          }}>
                                      {classification.confidence.toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-600 flex-wrap min-w-0 break-words">
                                    <span>Kategori: <strong>{categoryDisplayMap[classification.category]}</strong></span>
                                    <span>Kipas: <strong>{fanCountDisplayMap[classification.fanCount]}</strong></span>
                                  </div>
                                  <p className="text-[12px] text-slate-500 mt-1 break-words">{classification.reason}</p>
                                </div>
                                {showManualOverride && (
                                  <Button type="button" variant="outline" size="sm" 
                                          onClick={() => setShowManualOverride(true)}
                                          className="flex-shrink-0">
                                    Atur Manual
                                  </Button>
                                )}
                              </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                              <div className="min-w-0">
                              <Select
                                label="Kategori Laptop"
                                value={form.category}
                                onChange={e => handleSelect("category", e.target.value)}
                                options={laptopCategories}
                              />
                              </div>
                              <div className="min-w-0">
                              <Select
                                label="Jumlah Kipas Pendingin"
                                value={form.fan}
                                onChange={e => handleSelect("fan", e.target.value)}
                                options={fanCounts}
                              />
                              </div>
                            </div>
              <div className="min-w-0">
              <Input
                label="Keluhan atau kondisi"
                value={form.issue}
                onChange={e => setForm(prev => ({ ...prev, issue: e.target.value }))}
                placeholder="misal: laptop sering hang, pendinginan tidak baik..."
                className="mt-4"
              />
              </div>
            </div>

            {/* PILIHAN LAYANAN */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap size={22} className="text-blue-500 flex-shrink-0" /> Pilihan Layanan
              </h3>
              <div className="space-y-3">
                {mainServices.map(s => (
                  <label key={s.value} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="mainService"
                      value={s.value}
                      checked={form.mainService === s.value}
                      onChange={e => handleSelect("mainService", e.target.value)}
                      className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600"
                    />
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 text-sm sm:text-base">{s.label}</div>
                      <div className="text-[13px] sm:text-sm text-slate-500 leading-relaxed">{s.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* LAYANAN TAMBAHAN */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HardDrive size={22} className="text-blue-500 flex-shrink-0" /> Layanan Tambahan
              </h3>
              <div className="space-y-3">
                {extraServices.map(e => (
                  <label key={e.value} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <Checkbox
                      checked={form.extras.includes(e.value)}
                      onCheckedChange={checked => {
                        if (checked) {
                          setForm(prev => ({ ...prev, extras: [...prev.extras, e.value] }));
                        } else {
                          setForm(prev => ({ ...prev, extras: prev.extras.filter(x => x !== e.value) }));
                        }
                      }}
                      label=""
                    />
                    <div className="flex items-start justify-between gap-2 w-full min-w-0">
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900 text-sm sm:text-base">{e.label}</div>
                        <div className="text-[13px] sm:text-sm text-slate-500 leading-relaxed">{e.desc}</div>
                      </div>
                      <span className="font-semibold text-blue-600 text-sm sm:text-base whitespace-nowrap flex-shrink-0">Rp{e.price.toLocaleString("id-ID")}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* THERMAL PASTE */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <RefreshCw size={22} className="text-blue-500 flex-shrink-0" /> Pilihan Thermal Paste
              </h3>
              {form.mainService === "deep-repasta" && (
                <div className="space-y-3">
                  {thermalPasteOptions.map(t => (
                    <label key={t.value} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="thermalPaste"
                        value={t.value}
                        checked={form.thermalPaste === t.value}
                        onChange={e => handleSelect("thermalPaste", e.target.value)}
                        className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600"
                      />
                      <div className="flex items-start justify-between gap-2 w-full min-w-0">
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 text-sm sm:text-base break-words">{t.label}</div>
                          {t.price && t.price > 0 && <div className="text-[13px] sm:text-sm text-slate-500">Tambah: Rp{t.price.toLocaleString("id-ID")}</div>}
                        </div>
                        {t.price && t.price > 0 && <span className="font-semibold text-amber-600 text-sm sm:text-base whitespace-nowrap flex-shrink-0">+ Rp{t.price.toLocaleString("id-ID")}</span>}
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {form.mainService !== "deep-repasta" && (
                <p className="text-slate-500 text-sm">*Thermal paste hanya relevan bila memilih repasta</p>
              )}
            </div>

            {/* JADWAL */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar size={22} className="text-blue-500 flex-shrink-0" /> Jadwal yang Diinginkan
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="min-w-0">
                <Input
                  label="Tanggal yang diinginkan *"
                  type="date"
                  min={minDate}
                  value={form.date}
                  onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                  error={touched.date && !form.date ? "Tanggal wajib diisi (minimal besok)" : undefined}
                />
                </div>
                <div className="min-w-0">
                <Input
                  label="Rentang waktu *"
                  value={form.time}
                  onChange={e => setForm(prev => ({ ...prev, time: e.target.value }))}
                  error={touched.time && !form.time ? "Waktu wajib diisi" : undefined}
                  placeholder="misal: 09.00 - 12.00"
                />
                </div>
              </div>
              {rescheduleDeadline && requiresDP && (
                <p className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[13px] sm:text-sm break-words">
                  <strong>⏰ Batas reschedule / cancel gratis:</strong> {rescheduleDeadline} pukul 23:59
                  <br />Lewat dari itu DP Rp50.000 hangus & booking ulang.
                </p>
              )}
              <div className="min-w-0">
              <Input
                label="Catatan tambahan"
                value={form.note}
                onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Spesifikasi tambahan, masalah khusus..."
                className="mt-4"
              />
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                * Jadwal yang dipilih merupakan permintaan, bukan booking otomatis.
                Kami akan konfirmasi ketersediaan via WhatsApp.
              </p>
            </div>

            {/* ESTIMASI */}
                        {estimate && (
                          <Card className="p-4 sm:p-5 bg-blue-50 border-blue-200 mb-6 overflow-hidden">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                              <Calculator size={20} className="text-blue-500 flex-shrink-0" /> Estimasi Harga
                            </h4>
                            <div className="space-y-2 mb-3">
                              {estimate.lines.map((line, i) => (
                                <div key={i} className="flex justify-between gap-2 text-sm">
                                  <span className="text-slate-700 min-w-0 break-words">{line.label}</span>
                                  <span className="font-medium text-slate-900 whitespace-nowrap flex-shrink-0">{line.amount}</span>
                                </div>
                              ))}
                              {/* Transport line */}
                              {form.serviceType === "panggilan" && transport && !transport.calculating && !transport.error && (
                                <div className="flex justify-between gap-2 text-sm pt-2 border-t border-blue-200">
                                  <span className="text-slate-700 min-w-0 break-words">Ongkos Panggilan ({transport.tierLabel}, ~{transport.km} km)</span>
                                  {transport.needsConfirmation ? (
                                    <span className="font-medium text-amber-600 whitespace-nowrap flex-shrink-0">Konfirmasi Admin</span>
                                  ) : (
                                    <span className="font-medium text-emerald-600 whitespace-nowrap flex-shrink-0">Rp{transport.price.toLocaleString("id-ID")}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="border-t border-blue-200 pt-3 mb-3">
                              <div className="flex justify-between items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm sm:text-base">Total Estimasi:</span>
                                <span className="text-lg sm:text-xl font-extrabold text-blue-600 text-right break-words">
                                  {(() => {
                                    const serviceTotal = estimate.totalMax !== null && estimate.totalMax !== estimate.totalMin
                                      ? `Estimasi Rp${estimate.totalMin.toLocaleString("id-ID")}–${estimate.totalMax.toLocaleString("id-ID")}`
                                      : `Rp${estimate.totalMin.toLocaleString("id-ID")}`;
                                    if (form.serviceType === "panggilan" && transport && !transport.calculating && !transport.error && !transport.needsConfirmation) {
                                      const grandTotal = estimate.totalMin + transport.price;
                                      const grandMax = estimate.totalMax !== null ? estimate.totalMax + transport.price : null;
                                      if (grandMax !== null && grandMax !== grandTotal) {
                                        return `Estimasi Rp${grandTotal.toLocaleString("id-ID")}–${grandMax.toLocaleString("id-ID")} (termasuk transport)`;
                                      }
                                      return `Rp${grandTotal.toLocaleString("id-ID")} (termasuk transport Rp${transport.price.toLocaleString("id-ID")})`;
                                    }
                                    if (form.serviceType === "panggilan" && transport && !transport.calculating && !transport.error && transport.needsConfirmation) {
                                      return `${serviceTotal} + Transport (Konfirmasi Admin)`;
                                    }
                                    return serviceTotal;
                                  })()}
                                </span>
                              </div>
                            </div>
                            {estimate.needsConfirmation && (
                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-2">
                                <p className="text-amber-800 text-[13px] sm:text-sm font-medium leading-relaxed">
                                  ⚠️ Harga akhir perlu dikonfirmasi via WhatsApp karena perbedaan kategori/ kondisi laptop.
                                </p>
                              </div>
                            )}
                            {estimate.notes.length > 0 && (
                              <ul className="space-y-1 text-xs text-slate-600 mb-2 break-words">
                                {estimate.notes.map((n, i) => (<li key={i}>• {n}</li>))}
                              </ul>
                            )}
                            {form.serviceType === "panggilan" && transport && transport.needsConfirmation && (
                                                          <p className="text-xs text-amber-700 leading-relaxed mb-2">
                                                            {"⚠️ Ongkos panggilan "} {">30 km"} {" memerlukan konfirmasi admin via WhatsApp."}
                                                          </p>
                                                        )}
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {form.serviceType === "panggilan" 
                                ? "Harga layanan + transport dikonfirmasi sebelum pengerjaan." 
                                : "Harga akhir dikonfirmasi sebelum pengerjaan."}
                            </p>
                          </Card>
                        )}

            {/* DP CHECKBOX - WAJIB */}
            {requiresDP && (
              <div className="mb-6 p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-xl overflow-hidden">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.agreePolicy}
                    onCheckedChange={checked => setForm(prev => ({ ...prev, agreePolicy: checked }))}
                    label=""
                  />
                  <div className="text-[13px] sm:text-sm text-emerald-900 leading-relaxed pt-0.5 min-w-0 break-words">
                    <strong>Saya menyetujui kebijakan booking:</strong> DP Rp50.000 wajib untuk metode Panggilan (dipotong dari total biaya layanan).
                    Reschedule / cancel gratis maksimal H-1 (24 jam sebelum jadwal).
                    Lewat dari H-1 atau pembatalan → DP hangus, silakan booking ulang.
                    Biaya transportasi terpisah & dikonfirmasi via WhatsApp.
                    <br />
                    Rekening DP: <strong className="break-all sm:break-words">SeaBank 901251265521 a.n. Muhammad Daffa Daminatila</strong>
                  </div>
                </label>
                {touched.agreePolicy && !form.agreePolicy && (
                  <p className="mt-2 text-sm text-red-500" role="alert">Wajib menyetujui kebijakan booking untuk melanjutkan</p>
                )}
              </div>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={requiresDP && !form.agreePolicy}
            >
              {requiresDP && !form.agreePolicy ? "Centang persetujuan kebijakan dulu" : "Kirim Pesanan via WhatsApp"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
