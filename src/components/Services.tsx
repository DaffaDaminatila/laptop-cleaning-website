import {
  Fan,
  Cpu,
  RefreshCw,
  Monitor,
  Package,
  HardDrive,
  Sparkles,
} from "lucide-react";
import {
  cleaningPrices,
  extraPrices,
} from "../config/pricing";

const mainServices = [
  { id: "basic", icon: Fan, title: "Basic Cleaning", desc: "Pembersihan debu pada kipas dan area ventilasi tanpa melepas heatsink.", includes: ["Bersih kipas", "Bersih ventilasi", "Cek suhu dasar"] },
  { id: "deep", icon: Cpu, title: "Deep Cleaning", desc: "Pembongkaran yang diperlukan untuk membersihkan kipas, heatsink, dan bagian dalam laptop.", includes: ["Bersih kipas + heatsink", "Bersih pasta lama", "Cek kondisi fisik"] },
  { id: "deep-repasta", icon: RefreshCw, title: "Deep Cleaning + Repasta", desc: "Pembersihan menyeluruh dan penggantian thermal paste pada komponen yang memang menggunakannya.", includes: ["Deep cleaning full", "Ganti thermal paste", "Cek suhu pasca"] },
];

const softwareServices = [
  { id: "windows", icon: Monitor, title: "Instal Ulang Windows", desc: "Instalasi ulang sistem operasi dan driver dasar sesuai kebutuhan perangkat." },
  { id: "app-install", icon: Package, title: "Instal Aplikasi", desc: "Instalasi aplikasi yang disepakati dengan pelanggan." },
];

const additional = [
  { id: "backup", icon: HardDrive, title: "Backup Data", desc: "Backup data penting sebelum pengerjaan." },
  { id: "ssd-check", icon: HardDrive, title: "Cek SSD/HDD", desc: "Pemeriksaan kondisi kesehatan penyimpanan." },
  { id: "exterior", icon: Sparkles, title: "Pembersihan Eksterior", desc: "Bersih body, keyboard, layar, port." },
];

function getBasePrice(serviceId: string, category: "biasa" | "gaming" = "biasa"): number {
  const price = cleaningPrices[category]?.[serviceId as keyof typeof cleaningPrices["biasa"]];
  return price?.min ?? 0;
}

function getExtraPrice(serviceId: string): number {
  return extraPrices[serviceId as keyof typeof extraPrices]?.price ?? 0;
}

export default function Services() {
  return (
    <section
      id="layanan"
      className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4">
        <header className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-800">
            Layanan
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pilih sesuai kebutuhan laptop Anda
          </h2>
          <p className="mt-3 text-slate-600">
            Harga di bawah estimasi untuk laptop tipe biasa. Harga final
            dikonfirmasi via WhatsApp berdasarkan kategori laptop dan kondisi
            aktual.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[60fr_40fr]">
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Perawatan & pendingin
            </h3>
            <ol className="divide-y divide-slate-200 border-y border-slate-200">
              {mainServices.map((s, i) => (
                <li key={s.id} className="py-5 flex gap-4">
                  <span
                    className="text-sm font-bold text-slate-400 w-7 shrink-0 pt-1"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon
                    size={22}
                    className="text-blue-800 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className="font-bold text-slate-900">{s.title}</h4>
                      <span className="text-sm font-semibold text-slate-900">
                        Mulai dari Rp{getBasePrice(s.id, "biasa").toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Termasuk: {s.includes.join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Perangkat lunak & tambahan
            </h3>
            <ul className="space-y-3">
              {softwareServices.map((s) => (
                <li
                  key={s.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 flex gap-3"
                >
                  <s.icon
                    size={20}
                    className="text-blue-800 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h4 className="font-semibold text-slate-900 text-sm">
                        {s.title}
                      </h4>
                      <span className="text-sm font-bold text-slate-900">
                        Rp{getExtraPrice(s.id).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-3">
              {additional.map((a) => (
                <li
                  key={a.id}
                  className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex items-center gap-3"
                >
                  <a.icon
                    size={18}
                    className="text-slate-500 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {a.title}
                    </p>
                    <p className="text-xs text-slate-500">{a.desc}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                    Rp{getExtraPrice(a.id).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Jenis pengerjaan bergantung pada model, konstruksi, dan kondisi
          laptop. Semua harga estimasi akan dikonfirmasi sebelum pengerjaan.
        </p>
      </div>
    </section>
  );
}
