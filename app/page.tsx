import { HeroSection } from "@christlife/components/landing/hero-section";
import { WelcomeSection } from "@christlife/components/landing/welcome-section";
import { ServiceTimesSection } from "@christlife/components/landing/service-times-section";
import { EventsSection } from "@christlife/components/landing/events-section";
import { CallToActionSection } from "@christlife/components/landing/call-to-action-section";
import { ContactSection } from "@christlife/components/landing/contact-section";
import { Footer } from "@christlife/components/landing/footer";

export default function Page() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <ServiceTimesSection />
      <EventsSection />
      <CallToActionSection />
      <ContactSection />
      <Footer />
    </>
  );
}
