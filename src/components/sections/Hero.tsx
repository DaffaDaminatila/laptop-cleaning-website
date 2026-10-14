import React from 'react';
import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { businessConfig, formatDisplayPhone } from '../../config/business';
import { useWhatsAppOrder } from '../../hooks/useWhatsAppOrder';

export const Hero: React.FC = () => {
  const { contactUs } = useWhatsAppOrder();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              🏆 Jasa Cleaning Laptop Terpercaya di Bogor
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Laptop Anda <span className="text-blue-600">Bersih, Sehat,</span> & Maksimal
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Basic cleaning, deep cleaning, ganti thermal paste, instal Windows — semua dengan janji & harga transparan. Kami datang ke Anda atau Anda antar ke kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={contactUs} className="w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Pesan Sekarang
              </Button>
              <Button variant="outline" onClick={contactUs} className="w-full sm:w-auto">
                <ArrowRight className="w-5 h-5 mr-2" />
                Tanya Harga & Jadwal
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">{businessConfig.serviceArea}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">{businessConfig.operatingSchedule}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hubungi Langsung</p>
                    <p className="text-2xl font-bold text-gray-900">{formatDisplayPhone()}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">150+</p>
                  <p className="text-xs text-gray-600">Laptop Dibersihkan</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">4.9★</p>
                  <p className="text-xs text-gray-600">Rating Pelanggan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};