import { businessConfig, formatWhatsAppUrl, formatDisplayPhone } from '../config/business';

export const useWhatsAppOrder = () => {
  const orderService = (serviceName: string, price: number) => {
    const message = `Halo DAFFA LAPTOP CLEANING SERVICE!\n\nSaya ingin memesan layanan:\n- Layanan: ${serviceName}\n- Harga: Rp${price.toLocaleString('id-ID')}\n\nMohon info ketersediaan jadwal. Terima kasih!`;
    window.open(formatWhatsAppUrl(message), '_blank');
  };

  const contactUs = () => {
    const message = `Halo DAFFA LAPTOP CLEANING SERVICE!\n\nSaya ingin bertanya tentang layanan Anda.`;
    window.open(formatWhatsAppUrl(message), '_blank');
  };

  return { orderService, contactUs };
};

export { businessConfig, formatDisplayPhone };