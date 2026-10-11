import { Card } from "./ui";
import { MX4_ADDON } from "../config/pricing";
import { Droplet } from "lucide-react";

export default function ThermalPasteOptions() {
  return (
    <section id="thermal-paste" className="py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <Droplet size={26} className="text-blue-500" /> Pilihan Thermal Paste
          </h2>
          <p className="mt-3 text-slate-600">Hanya relevan bila memilih layanan repasta.</p>
        </header>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <Card className="p-6 border-green-200 bg-green-50">
            <p className="font-bold text-green-800 text-lg">DeepCool Z5</p>
            <p className="text-green-700 text-sm mt-1">Pilihan thermal paste standar.</p>
            <p className="text-green-800 font-semibold mt-2">Termasuk dalam harga dasar paket repasta.</p>
          </Card>
          <Card className="p-6 border-amber-200 bg-amber-50">
            <p className="font-bold text-amber-800 text-lg">ARCTIC MX-4</p>
            <p className="text-amber-700 text-sm mt-1">Pilihan thermal paste alternatif.</p>
            <p className="text-amber-800 font-semibold mt-2">Add-on Rp{MX4_ADDON.toLocaleString("id-ID")} di atas harga dasar.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
