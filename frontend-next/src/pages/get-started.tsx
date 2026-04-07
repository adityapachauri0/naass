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
        title="Get Started — Free Lead Generation Quote"
        description="Get a free lead generation quote from NAASS. Tell us about your business needs and we'll create a tailored strategy for quality ECO 4, Housing Disrepair, and Life Insurance leads."
      />
      <div className="min-h-screen relative bg-white overflow-hidden">
        <div className="fixed inset-0 bg-white" />
        <FloatingElements />
        <ScrollIndicator />
        <div className="relative z-10">
          <Navbar />
          <div className="pt-24 pb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Get Your Free Lead Generation Quote</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">Tell us about your business and we&apos;ll create a tailored lead generation strategy just for you.</p>
          </div>
          <MultiStepContact />
          <Footer />
        </div>
      </div>
    </>
  );
}
