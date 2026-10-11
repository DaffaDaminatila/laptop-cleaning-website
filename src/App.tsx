import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import ThermalPasteOptions from "./components/ThermalPasteOptions";
import BookingForm from "./components/BookingForm";
import ProcessSteps from "./components/ProcessSteps";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Services />
        <Pricing />
        <ThermalPasteOptions />
        <BookingForm />
        <ProcessSteps />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
