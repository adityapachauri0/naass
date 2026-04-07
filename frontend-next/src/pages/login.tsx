import SEOHead from '../components/SEOHead';
import Login from '../components/Login/Login';

export default function LoginPage() {
  return (
    <>
      <SEOHead
        title="Admin Login"
        description="Secure admin login for NAASS dashboard. Access lead management and analytics."
        noindex={true}
      />
      <Login />
    </>
  );
}
