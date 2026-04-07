import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import MultiStepContact from '../components/MultiStepContact';
import Footer from '../components/Footer';
import FloatingElements from '../components/FloatingElements';
import ScrollIndicator from '../components/ScrollIndicator';

export default function GetStartedPage() {
  return (
    <>
      <SEOHead
        title="Get Started - Multi-Step Form"
        description="Get started with NAASS lead generation services. Complete our detailed form to help us understand your business needs."
      />
      <div className="min-h-screen relative bg-white overflow-hidden">
        <div className="fixed inset-0 bg-white" />
        <FloatingElements />
        <ScrollIndicator />
        <div className="relative z-10">
          <Navbar />
          <MultiStepContact />
          <Footer />
        </div>
      </div>
    </>
  );
}
