import SEOHead from '../components/SEOHead';
import ThankYou from '../components/ThankYou';

export default function ThankYouPage() {
  return (
    <>
      <SEOHead
        title="Thank You"
        description="Thank you for contacting NAASS. We'll get back to you soon with quality lead generation solutions."
        noindex={true}
      />
      <ThankYou />
    </>
  );
}
