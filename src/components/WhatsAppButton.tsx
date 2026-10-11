import { MessageCircle } from "lucide-react";
import { openWhatsApp, INQUIRY_MESSAGE } from "../utils/whatsapp";

export default function WhatsAppButton() {
  return (
    <button
      onClick={() => openWhatsApp(INQUIRY_MESSAGE)}
      aria-label="Chat WhatsApp bisnis"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" aria-hidden="true" />
    </button>
  );
}
