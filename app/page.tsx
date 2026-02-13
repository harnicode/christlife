import { HeroSection } from "@christlife/components/landing/hero-section";
import { WelcomeSection } from "@christlife/components/landing/welcome-section";
import { ServiceTimesSection } from "@christlife/components/landing/service-times-section";
import { CallToActionSection } from "@christlife/components/landing/call-to-action-section";

export default function Page() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <ServiceTimesSection />
      <CallToActionSection />
    </>
  );
}
