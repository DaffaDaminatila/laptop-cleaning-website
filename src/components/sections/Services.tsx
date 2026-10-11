import React from 'react';
import { Button } from '../ui/Button';
import { services, additionalServices } from '../../data/services';
import { useWhatsAppOrder } from '../../hooks/useWhatsAppOrder';

interface ServiceCardProps {
  service: typeof services[0];
  isAdditional?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isAdditional }) => {
  const { orderService } = useWhatsAppOrder();
  const icons: Record<string, React.ReactNode> = {
    brush: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    sparkles: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M9 3h4l-2 6h2l-2 6-2-6h-2l-2 6-2-6H3m16 0v4m-4-4h4m-16 16v4h4m8-4h4M9 21v-4m4 4h4m4-12v4m0 4h4" /></svg>,
    temperature: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    'refresh-cw': <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    packages: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-50 hover:border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${isAdditional ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
          {icons[service.icon] || icons.brush}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${isAdditional ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
          {isAdditional ? 'Layanan Tambahan' : 'Layanan Utama'}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="font-bold text-2xl text-gray-900">Rp{service.price.toLocaleString('id-ID')}</span>
          <span>• {service.duration}</span>
        </div>
        <Button 
          onClick={() => orderService(service.name, service.price)}
          variant={isAdditional ? 'outline' : 'primary'}
          className="w-full sm:w-auto"
        >
          Pesan Sekarang
        </Button>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Harga transparan, tanpa biaya tersembunyi. Konfirmasi harga sebelum pengerjaan dimulai.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service: typeof services[0]) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Layanan Tambahan</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service: typeof additionalServices[0]) => (
              <ServiceCard key={service.id} service={service} isAdditional />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};