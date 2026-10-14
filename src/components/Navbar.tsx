import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "./ui";

const links = [
  { href: "#beranda", label: "Beranda" },
  { href: "#layanan", label: "Layanan" },
  { href: "#harga", label: "Daftar Harga" },
  { href: "#cara", label: "Cara Pemesanan" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200">
      <nav
        className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
        aria-label="Navigasi utama"
      >
        <button onClick={() => scrollTo("#beranda")} className="text-left">
          <span className="block text-slate-900 font-extrabold tracking-tight text-sm sm:text-base leading-tight">
            DAFFA LAPTOP
          </span>
          <span className="block text-blue-800 text-[11px] sm:text-xs font-semibold tracking-widest">
            CLEANING SERVICE
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6">
                  {links.map((l) => (
                    <button
                      key={l.href}
                      onClick={() => scrollTo(l.href)}
                      className="text-slate-600 hover:text-slate-900 text-sm font-medium min-h-[48px] inline-flex items-center"
                    >
                      {l.label}
                    </button>
                  ))}
                  <Button
                    variant="whatsapp"
                    size="sm"
                    onClick={() => scrollTo("#pesan")}
                  >
                    <MessageCircle size={16} className="mr-1.5" />
                                        Pesan Sekarang
                  </Button>
                </div>

        <button
          className="md:hidden text-slate-900 p-3 -mr-2 min-w-[48px] min-h-[48px] inline-flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-3 py-3 rounded-lg text-base font-medium min-h-[48px]"
            >
              {l.label}
            </button>
          ))}
          <Button
            variant="whatsapp"
            className="w-full mt-2"
            onClick={() => scrollTo("#pesan")}
          >
            <MessageCircle size={18} className="mr-1.5" />
                        Pesan Sekarang
          </Button>
        </div>
      )}
    </header>
  );
}
