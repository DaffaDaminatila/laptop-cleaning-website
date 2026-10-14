export const businessConfig = {
  name: "DAFFA LAPTOP CLEANING SERVICE",
  whatsappNumber: "6281285526337",
  serviceArea: "Bogor dan sekitarnya",
  operatingSchedule: "Dengan janji terlebih dahulu",
  serviceModes: [
    "Panggilan ke lokasi pelanggan",
    "Antar laptop ke lokasi yang disepakati",
  ],
  currency: "IDR",
  title: "Jasa Cleaning Laptop Bogor | Daffa Laptop Cleaning Service",
  description:
    "Layanan cleaning laptop, deep cleaning, repasta thermal paste, instal ulang Windows, dan instal aplikasi di Bogor dan sekitarnya. Melayani panggilan ke rumah atau antar laptop. Pengerjaan berdasarkan janji.",
  ogImage: "/og-image.jpg",
};

export const formatWhatsAppUrl = (message: string) => {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const formatDisplayPhone = () => {
  return "0812-8552-6337";
};
