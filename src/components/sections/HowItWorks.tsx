import React from 'react';
import { Clock, Truck, Shield, MessageCircle, CheckCircle } from 'lucide-react';
import { businessConfig } from '../../config/business';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "1. Pesan via WhatsApp",
      description: "Pilih layanan yang diinginkan dan hubungi kami melalui WhatsApp. Ceritakan kondisi laptop Anda."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "2. Tentukan Jadwal",
      description: businessConfig.operatingSchedule + ". Kami konfirmasi jadwal sesegera mungkin."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "3. Pilih Metode Layanan",
      description: businessConfig.serviceModes.join(" atau ") + "."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "4. Konfirmasi Harga",
      description: "Harga dikonfirmasi sebelum pengerjaan. Tanpa biaya tersembunyi, pengerjaan aman."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "5. Laptop Siap Digunakan",
      description: "Pengerjaan selesai, QC dilakukan, laptop kembali ke tangan Anda dalam kondisi terbaik."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Cara Pemesanan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Proses sederhana, cepat, dan transparan.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};