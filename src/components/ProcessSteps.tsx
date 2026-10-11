import { CheckCircle2, MessageCircle, CalendarClock, Banknote, Wrench } from "lucide-react";
import { Card } from "./ui";

const steps = [
  {
    number: "01",
    title: "Pilih Layanan",
    desc: "Pelanggan memilih jenis laptop dan layanan yang dibutuhkan melalui formulir pemesanan.",
    icon: CheckCircle2,
  },
  {
    number: "02",
    title: "Isi Formulir",
    desc: "Masukkan informasi laptop, lokasi, jadwal yang diinginkan, dan detail keluhan.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Konfirmasi via WhatsApp",
    desc: "Pesanan diteruskan ke WhatsApp untuk konfirmasi harga, transportasi, lokasi, dan jadwal.",
    icon: CalendarClock,
  },
  {
    number: "04",
    title: "DP Rp50.000 (Panggilan)",
    desc: "Transfer DP ke SeaBank 901251265521 a.n. Muhammad Daffa Daminatila, kirim bukti via WA. Jadwal dikunci setelah DP masuk.",
    icon: Banknote,
  },
  {
    number: "05",
    title: "Pengerjaan",
    desc: "Laptop dikerjakan setelah layanan dan jadwal disepakati oleh kedua pihak.",
    icon: Wrench,
  },
];

export default function ProcessSteps() {
  return (
    <section id="cara" className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Cara Pemesanan
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Empat langkah sederhana dari pemilihan layanan hingga laptop selesai dikerjakan.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <Card key={s.number} className="p-6 relative">
              <div className="absolute -top-4 left-6 bg-blue-500 text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center">
                {s.number}
              </div>
              <div className="pt-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={28} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
