import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';

export const metadata: Metadata = {
  title: 'Elizabeth Evans - Software Engineer',
  description: 'Software Engineer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen text-white">
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  )
}
