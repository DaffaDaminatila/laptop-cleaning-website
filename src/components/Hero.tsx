import { MapPin, Truck, CalendarCheck, Tag } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { businessConfig, formatDisplayPhone } from "../config/business";
import { Button } from "./ui";

export default function Hero() {
  const scrollToForm = () => {
    document.querySelector("#pesan")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPricing = () => {
    document.querySelector("#harga")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="beranda" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-12 sm:pt-16 sm:pb-16 grid gap-10 items-center md:grid-cols-[60fr_40fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-blue-800 text-xs sm:text-sm font-semibold border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-full">
            <MapPin size={14} aria-hidden="true" />
            Melayani {businessConfig.serviceArea}
          </p>
          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Laptop Panas dan Berdebu? Saatnya Cleaning!
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
            Layanan cleaning laptop, deep cleaning, dan repasta thermal paste
            untuk membantu menjaga kebersihan serta performa laptop Anda.
          </p>

          <dl className="mt-6 space-y-2.5 text-sm sm:text-base text-slate-600 max-w-xl">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-blue-800 shrink-0" aria-hidden="true" />
              <dt className="sr-only">Area layanan</dt>
              <dd>Melayani {businessConfig.serviceArea}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-blue-800 shrink-0" aria-hidden="true" />
              <dt className="sr-only">Metode layanan</dt>
              <dd>Bisa panggilan ke lokasi atau antar laptop ke lokasi yang disepakati</dd>
            </div>
            <div className="flex items-center gap-3">
              <CalendarCheck size={18} className="text-blue-800 shrink-0" aria-hidden="true" />
              <dt className="sr-only">Jadwal</dt>
              <dd>Pengerjaan {businessConfig.operatingSchedule.toLowerCase()}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <Button
              variant="whatsapp"
              size="lg"
              onClick={scrollToForm}
              className="w-full sm:w-auto"
            >
              <MessageCircle size={20} className="mr-2" aria-hidden="true" />
              Pesan via WhatsApp
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToPricing} className="w-full sm:w-auto">
              <Tag size={18} className="mr-2" aria-hidden="true" />
              Lihat Daftar Harga
            </Button>
          </div>

          <p className="mt-5 text-slate-500 text-sm">
            WhatsApp: <span className="text-slate-900 font-semibold">{formatDisplayPhone()}</span>
          </p>
        </div>

        <aside className="border-t-2 border-blue-800 bg-slate-50 rounded-lg p-6 sm:p-8" aria-label="Ringkasan layanan">
          <h2 className="text-sm font-semibold tracking-widest text-slate-500 uppercase">
            Yang dikerjakan
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="flex gap-3">
              <span className="text-blue-800 font-bold" aria-hidden="true">01</span>
              <div>
                <p className="font-semibold text-slate-900">Kipas & ventilasi dibersihkan</p>
                <p className="text-sm text-slate-600">Debu yang menghambat aliran udara diangkat.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-800 font-bold" aria-hidden="true">02</span>
              <div>
                <p className="font-semibold text-slate-900">Heatsink & bagian dalam dicek</p>
                <p className="text-sm text-slate-600">Kondisi fisik diperiksa saat pembongkaran.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-800 font-bold" aria-hidden="true">03</span>
              <div>
                <p className="font-semibold text-slate-900">Thermal paste diganti*</p>
                <p className="text-sm text-slate-600">Pada paket repasta, untuk komponen yang memang menggunakannya.</p>
              </div>
            </li>
          </ul>
          <p className="mt-6 text-xs text-slate-500 border-t border-slate-200 pt-4">
            Harga final dan jadwal selalu dikonfirmasi via WhatsApp sebelum pengerjaan.
          </p>
        </aside>
      </div>
    </section>
  );
}
