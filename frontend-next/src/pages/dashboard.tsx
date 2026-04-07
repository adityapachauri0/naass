import SEOHead from '../components/SEOHead';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardEnhanced from '../components/Dashboard/DashboardEnhanced';

export default function DashboardPage() {
  return (
    <>
      <SEOHead
        title="Dashboard"
        description="NAASS admin dashboard for lead management."
        noindex={true}
      />
      <ProtectedRoute>
        <DashboardEnhanced />
      </ProtectedRoute>
    </>
  );
}
