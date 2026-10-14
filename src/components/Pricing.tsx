import { Laptop, Zap } from "lucide-react";
import { Card } from "./ui";
import {
  formatRange, cleaningPrices,
  extraPrices, MX4_ADDON
} from "../config/pricing";

const categoryTabs = [
  { key: "biasa", label: "Laptop Biasa", icon: Laptop },
  { key: "gaming1", label: "Gaming 1 Kipas", icon: Zap },
  { key: "gaming2", label: "Gaming 2 Kipas", icon: Zap },
];

const mainServices = [
  { key: "basic", label: "Basic Cleaning" },
  { key: "deep", label: "Deep Cleaning" },
  { key: "deep-repasta", label: "Deep Cleaning + Repasta" },
];

export default function Pricing() {
  return (
    <section id="harga" className="py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Daftar Harga
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Harga transparan per kategori laptop. Rentang harga pada gaming = variasi model/konstruksi.
            Thermal paste standar DeepCool Z5 sudah termasuk. ARCTIC MX-4 add-on Rp15.000.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected="false"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-6 mb-10">
          {categoryTabs.map((cat) => {
            const data = cleaningPrices[cat.key];
            return (
              <Card key={cat.key} className="p-4 sm:p-6 overflow-x-auto">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <cat.icon size={20} className="text-blue-500" /> {cat.label}
                </h3>
                <table className="w-full text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 font-semibold text-slate-700">Layanan</th>
                      <th className="text-right py-3 font-semibold text-slate-700">Harga</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mainServices.map((ms) => {
                      const p = data[ms.key as keyof typeof data];
                      return (
                        <tr key={ms.key} className="hover:bg-slate-50/50">
                          <td className="py-3 text-slate-700">{ms.label}</td>
                          <td className="py-3 text-right font-semibold text-slate-900 whitespace-nowrap">
                            {formatRange(p)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            );
          })}
        </div>

        <Card className="p-4 sm:p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Laptop size={20} className="text-blue-500" /> Layanan Tambahan
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.entries(extraPrices).map(([key, val]) => (
              <div key={key} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-slate-100 transition-colors">
                <p className="font-medium text-slate-800">{val.label}</p>
                <p className="text-blue-600 font-extrabold text-lg">Rp{val.price.toLocaleString("id-ID")}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-red-500" /> Pilihan Thermal Paste
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-semibold text-green-800">DeepCool Z5 (Standar)</p>
              <p className="text-green-700 text-sm mt-1">Termasuk dalam harga dasar paket repasta.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-semibold text-amber-800">ARCTIC MX-4 (Alternatif)</p>
              <p className="text-amber-700 text-sm mt-1">Add-on Rp{MX4_ADDON.toLocaleString("id-ID")} di atas harga dasar paket repasta.</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-slate-50 border-slate-200">
          <h4 className="font-bold text-slate-900 mb-3">Ketentuan Harga</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">• Harga belum termasuk biaya transportasi layanan panggilan.</li>
            <li className="flex items-start gap-2">• Biaya transportasi ditentukan berdasarkan lokasi & dikonfirmasi via WhatsApp.</li>
            <li className="flex items-start gap-2">• Harga dapat berubah berdasarkan kondisi & kompleksitas laptop.</li>
            <li className="flex items-start gap-2">• Laptop dengan sistem pendingin khusus butuh konfirmasi terlebih dahulu.</li>
            <li className="flex items-start gap-2">• Konfirmasi harga akhir kepada pelanggan sebelum pengerjaan.</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
