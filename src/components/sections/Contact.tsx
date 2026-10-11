import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { businessConfig, formatDisplayPhone } from '../../config/business';
import { useWhatsAppOrder } from '../../hooks/useWhatsAppOrder';

export const Contact: React.FC = () => {
  const { contactUs } = useWhatsAppOrder();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Siap Membersihkan Laptop Anda?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Jangan biarkan laptop Anda lambat atau panas. Hubungi kami sekarang untuk jadwal cleaning terbaik.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <Phone className="w-8 h-8 mx-auto mb-3 text-blue-200" />
            <p className="text-sm text-blue-200 mb-1">WhatsApp</p>
            <p className="text-xl font-bold">{formatDisplayPhone()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-200" />
            <p className="text-sm text-blue-200 mb-1">Area Layanan</p>
            <p className="text-xl font-bold">{businessConfig.serviceArea}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <Clock className="w-8 h-8 mx-auto mb-3 text-blue-200" />
            <p className="text-sm text-blue-200 mb-1">Jadwal</p>
            <p className="text-lg font-bold">{businessConfig.operatingSchedule}</p>
          </div>
        </div>

        <Button
          onClick={contactUs}
          className="bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-4"
        >
          <Phone className="w-6 h-6 mr-2" />
          Chat WhatsApp Sekarang
        </Button>
      </div>
    </section>
  );
};