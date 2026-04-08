import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Home, BookOpen, Briefcase, Mail } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/', icon: Home, desc: 'Back to the homepage' },
  { name: 'Our Services', href: '/services', icon: Briefcase, desc: 'View our lead generation services' },
  { name: 'Blog', href: '/blog', icon: BookOpen, desc: 'Read our latest articles' },
  { name: 'Contact Us', href: '/contact', icon: Mail, desc: 'Get in touch with our team' },
];

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page Not Found" noindex={true} />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-7xl font-bold text-orange-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page not found</h2>
            <p className="text-gray-600 mb-12">
              The page you are looking for does not exist or has been moved. Try one of the links below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {quickLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-md transition-all text-left"
                >
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <link.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{link.name}</p>
                    <p className="text-gray-500 text-sm">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/"
              className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
