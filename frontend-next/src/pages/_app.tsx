import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '../components/ErrorBoundary';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#000000',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
          },
        }}
      />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
