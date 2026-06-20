import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GST Invoice Generator | Free Online Tool',
  description: 'Generate professional GST invoices with automatic CGST and SGST calculations. Download as PDF instantly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-4 md:px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-lg md:text-xl font-bold gradient-text">
              GST Invoice Generator
            </Link>
            <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center">
              <Link href="/" className="hover:text-purple-400 transition-colors text-sm md:text-base">
                Home
              </Link>
              <Link href="/generator" className="hover:text-purple-400 transition-colors text-sm md:text-base">
                Generator
              </Link>
              <Link href="/about" className="hover:text-purple-400 transition-colors text-sm md:text-base">
                About
              </Link>
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gradient-button px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap"
              >
                Built for Digital Heroes
              </a>
            </div>
          </div>
        </nav>
        <main className="pt-24">
          {children}
        </main>
        <footer className="mt-20 py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white/60 mb-2">
              Built by <span className="text-white font-semibold">Vansh Sharma</span>
            </p>
            <p className="text-white/60">
              Contact: <a href="mailto:vanshsharma@example.com" className="text-purple-400 hover:text-purple-300">vanshsharma@example.com</a>
            </p>
            <div className="mt-4">
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Built for Digital Heroes
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
