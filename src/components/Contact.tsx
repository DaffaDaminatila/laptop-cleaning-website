import { MapPin, Clock, MessageCircle } from "lucide-react";
import { businessConfig, formatDisplayPhone } from "../config/business";
import { openWhatsApp, INQUIRY_MESSAGE } from "../utils/whatsapp";
import { Button } from "./ui";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-20 bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Hubungi Kami
          </h2>
          <p className="text-lg text-slate-600">
            Layanan area Bogor dan sekitarnya. Pengerjaan berdasarkan janji terlebih dahulu.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          role="region"
          aria-label="Informasi kontak dan chat WhatsApp"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <MessageCircle size={22} className="text-blue-800" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">
                  WhatsApp / Telepon
                </p>
                <a
                  href={`tel:${formatDisplayPhone().replace(/\D/g, "")}`}
                  className="text-2xl font-bold text-slate-900 hover:text-blue-800 transition-colors"
                >
                  {formatDisplayPhone()}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <MapPin size={22} className="text-blue-800" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Area Layanan
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {businessConfig.serviceArea}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <Clock size={22} className="text-blue-800" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Jam Operasional
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {businessConfig.operatingSchedule}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
            <div
              className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
              <MessageCircle size={28} className="text-emerald-700" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Chat Langsung via WhatsApp
            </h3>
            <p className="text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
              Klik tombol di bawah untuk membuka WhatsApp dengan pesan pertanyaan siap kirim.
            </p>
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto min-w-[260px]"
              onClick={() => openWhatsApp(INQUIRY_MESSAGE)}
            >
              <MessageCircle size={20} aria-hidden="true" />
              Chat via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
