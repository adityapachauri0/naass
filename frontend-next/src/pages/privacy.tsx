import SEOHead from '../components/SEOHead';
import PrivacyPolicy from '../components/PrivacyPolicy';

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy & GDPR"
        description="NAASS Privacy Policy, GDPR compliance, cookie policy, and data protection. Learn how we protect your personal information and respect your privacy rights."
        keywords="privacy policy, GDPR, data protection, cookies policy, personal data, privacy rights, data security, NAASS privacy"
      />
      <PrivacyPolicy />
    </>
  );
}
