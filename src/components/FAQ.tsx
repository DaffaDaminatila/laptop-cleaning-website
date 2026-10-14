import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card } from "./ui";

const faqs = [
  {
    q: "Apakah melayani panggilan ke rumah?",
    a: "Ya, kami melayani panggilan ke lokasi pelanggan di area Bogor dan sekitarnya. Biaya transportasi ditentukan berdasarkan lokasi dan dikonfirmasi melalui WhatsApp sebelum jadwal disepakati."
  },
  {
    q: "Apakah bisa mengantar laptop ke lokasi?",
    a: "Bisa. Pelanggan dapat mengantar laptop ke lokasi yang disepakati bersama melalui WhatsApp. Kami tidak memiliki bengkel tetap dengan alamat publik — lokasi penyerahan dikonfirmasi saat chat."
  },
  {
    q: "Apakah perlu membuat janji terlebih dahulu?",
    a: "Ya, semua pengerjaan dilakukan berdasarkan janji terlebih dahulu. Kami tidak melayani walk-in tanpa janji."
  },
  {
    q: "Apakah harga sudah termasuk thermal paste?",
    a: "Harga paket Deep Cleaning + Repasta sudah termasuk thermal paste standar (DeepCool Z5). Jika ingin ARCTIC MX-4, terdapat add-on Rp15.000.",
  },
  {
    q: "Apa perbedaan basic cleaning dan deep cleaning?",
    a: "Basic cleaning hanya membersihkan debu di kipas dan ventilasi tanpa melepas heatsink. Deep cleaning melibatkan pembongkaran untuk membersihkan kipas, heatsink, dan bagian dalam secara menyeluruh."
  },
  {
    q: "Apakah semua laptop gaming bisa direpasta?",
    a: "Sebagian besar bisa, namun laptop gaming dengan sistem pendingin khusus (vapor chamber, liquid metal, heatpipe khusus) memerlukan konfirmasi terlebih dahulu karena konstruksi yang berbeda."
  },
  {
    q: "Berapa lama pengerjaan?",
    a: "Estimasi: Basic cleaning 30–45 menit, Deep cleaning 60–90 menit, Deep cleaning + repasta 90–120 menit, Instal Windows 60–120 menit. Waktu aktual tergantung kondisi laptop."
  },
  {
    q: "Apakah transportasi termasuk harga?",
    a: "Tidak. Biaya transportasi terpisah dan dihitung berdasarkan jarak lokasi pelanggan. Nominal dikonfirmasi melalui WhatsApp sebelum jadwal disepakati."
  },
  {
    q: "Apakah ada DP untuk booking?",
    a: "Ya — untuk metode Panggilan wajib DP Rp50.000 ke SeaBank 901251265521 a.n. Muhammad Daffa Daminatila. DP dipotong dari total biaya layanan (transportasi terpisah). Jadwal dikunci setelah bukti transfer diterima. Metode antar laptop tidak perlu DP."
  },
  {
    q: "Bagaimana jika ingin reschedule atau batal?",
    a: "Reschedule / cancel gratis maksimal H-1 (24 jam sebelum jadwal) via WhatsApp. Lewat dari itu atau pembatalan → DP hangus, silakan booking ulang. Contoh template pesan: 'Halo, mau reschedule booking [tanggal lama] ke [tanggal baru]. Sudah transfer DP Rp50.000 tanggal [tgl]. Mohon konfirmasi apakah bisa.'"
  },
  {
    q: "Apakah saya perlu melakukan backup data sebelum servis?",
    a: "Disarankan melakukan backup data sendiri sebelum laptop diserahkan. Kami menyediakan layanan backup data (Rp25.000) sebagai tambahan jika diperlukan, namun kami tidak bertanggung jawab atas kehilangan data selama proses pengerjaan."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <header className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <HelpCircle size={16} />
            Pertanyaan Umum
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            FAQ
          </h2>
          <p className="mt-3 text-slate-600">
            Jawaban singkat sesuai kebijakan bisnis. Untuk detail lain, tanyakan langsung via WhatsApp.
          </p>
        </header>

        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Card key={i} className="p-0 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 text-blue-500">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 border-t border-slate-100">
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
