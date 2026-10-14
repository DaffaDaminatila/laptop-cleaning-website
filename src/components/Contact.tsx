import { MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { businessConfig, formatDisplayPhone } from "../config/business";
import { openWhatsApp, INQUIRY_MESSAGE } from "../utils/whatsapp";
import { Button } from "./ui";

export default function Contact() {
  // Base location from transport config
  const baseLocation = {
    name: "DAFFA LAPTOP CLEANING SERVICE",
    address: "RT 03 RW 08, Harjasari, Kec. Bogor Sel., Kota Bogor, Jawa Barat 16138",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-6.6609,106.8431",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8431!3d-6.6609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzk3JzM5LjIiUyAxMDZcKzUwJzM1LjEiRQ!5e0!3m2!1sid!2sid!4v1699999999999",
  };

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

            {/* LOKASI & MAPS */}
            <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
              <div
                className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                aria-hidden="true"
              >
                <Navigation size={22} className="text-emerald-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Lokasi Bengkel (Antar Sendiri)
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  {baseLocation.address}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={baseLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Navigation size={16} />
                    Buka di Google Maps
                  </a>
                  <a
                    href={baseLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <MapPin size={16} />
                    Dapatkan Arah
                  </a>
                </div>
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

        {/* EMBEDDED MAP */}
        <div className="mt-12 lg:mt-16">
          <h3 className="text-xl font-bold text-slate-900 text-center mb-6">
            Temukan Kami di Peta
          </h3>
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ aspectRatio: "16/9" }}>
            <iframe
                                      title="Lokasi DAFFA LAPTOP CLEANING SERVICE - Harjasari, Bogor Selatan"
                                      src={baseLocation.embedUrl}
                                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                                      allowFullScreen
                                      loading="lazy"
                                      referrerPolicy="no-referrer-when-downgrade"
                                    />
                      </div>
                      <p className="text-center text-sm text-slate-500 mt-3">
                        Base operasional: RT 03 RW 08, Harjasari, Bogor Selatan 16138
                      </p>
        </div>
      </div>
    </section>
  );
}
