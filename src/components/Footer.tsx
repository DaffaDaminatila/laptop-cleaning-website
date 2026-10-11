import { MessageCircle, MapPin, Clock } from "lucide-react";
import { businessConfig, formatDisplayPhone } from "../config/business";
import { openWhatsApp, INQUIRY_MESSAGE } from "../utils/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="text-white font-extrabold leading-tight">DAFFA LAPTOP<br /><span className="text-blue-400 tracking-widest text-sm">CLEANING SERVICE</span></p>
          <p className="mt-3 text-sm text-slate-400">Jasa cleaning laptop profesional — basic cleaning, deep cleaning, repasta, instal Windows & aplikasi.</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Navigasi</p>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => scrollTo("#layanan")} className="hover:text-white">Layanan</button></li>
            <li><button onClick={() => scrollTo("#harga")} className="hover:text-white">Daftar Harga</button></li>
            <li><button onClick={() => scrollTo("#cara")} className="hover:text-white">Cara Pemesanan</button></li>
            <li><button onClick={() => scrollTo("#faq")} className="hover:text-white">FAQ</button></li>
            <li><button onClick={() => scrollTo("#pesan")} className="hover:text-white">Formulir Pemesanan</button></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Informasi</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin size={15} className="text-blue-400" /> {businessConfig.serviceArea}</li>
            <li className="flex items-center gap-2"><Clock size={15} className="text-blue-400" /> {businessConfig.operatingSchedule}</li>
            <li className="flex items-center gap-2"><MessageCircle size={15} className="text-blue-400" /> {formatDisplayPhone()}</li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Pesan Sekarang</p>
          <button
            onClick={() => openWhatsApp(INQUIRY_MESSAGE)}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-all w-full justify-center"
          >
            <MessageCircle size={18} /> WhatsApp Kami
          </button>
          <p className="mt-3 text-xs text-slate-500">Estimasi harga belum termasuk transportasi. Harga akhir dikonfirmasi sebelum pengerjaan.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {year} {businessConfig.name}. Seluruh hak cipta dilindungi.</p>
          <p>{businessConfig.serviceArea} • {businessConfig.operatingSchedule}</p>
        </div>
      </div>
    </footer>
  );
}
