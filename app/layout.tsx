'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <html lang="en">
      <head>
        <title>GST Invoice Generator | Free Online Tool</title>
        <meta name="description" content="Generate professional GST invoices with automatic CGST and SGST calculations. Download as PDF instantly." />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {/* Floating Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        
        {/* Sticky Navigation */}
        <nav className={`sticky-nav ${scrolled ? 'scrolled' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold gradient-text">
                GST Invoice Generator
              </Link>
              
              <div className="hidden md:flex gap-8 items-center">
                <Link href="/#features" className="text-sm text-white/70 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="/generator" className="text-sm text-white/70 hover:text-white transition-colors">
                  Generator
                </Link>
                <Link href="/preview" className="text-sm text-white/70 hover:text-white transition-colors">
                  Preview
                </Link>
                <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
                  About
                </Link>
                <a 
                  href="https://digitalheroesco.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Built for Digital Heroes
                </a>
              </div>

              <div className="flex gap-3 items-center">
                <Link 
                  href="/generator"
                  className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors"
                >
                  Live Demo
                </Link>
                <Link 
                  href="/generator"
                  className="gradient-button px-6 py-2.5 rounded-full text-sm"
                >
                  <span>Generate Invoice</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-20">
          {children}
        </main>

        {/* Premium Footer */}
        <footer className="mt-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-5 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold gradient-text mb-4">GST Invoice Generator</h3>
                <p className="text-white/50 text-sm mb-6 max-w-xs">
                  Professional GST invoice generation with automatic tax calculations. Free, fast, and secure.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Product</h4>
                <ul className="space-y-3 text-sm text-white/50">
                  <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/generator" className="hover:text-white transition-colors">Templates</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Resources</h4>
                <ul className="space-y-3 text-sm text-white/50">
                  <li><a href="https://github.com" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Digital Heroes</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Legal</h4>
                <ul className="space-y-3 text-sm text-white/50">
                  <li><span className="cursor-pointer hover:text-white transition-colors">Privacy</span></li>
                  <li><span className="cursor-pointer hover:text-white transition-colors">Terms</span></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/40">
                Built by <span className="text-white/60 font-medium">Vansh Sharma</span> • <a href="mailto:vanshverma531@gmail.com" className="text-purple-400/60 hover:text-purple-400">vanshverma531@gmail.com</a>
              </p>
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                Built for Digital Heroes ↗
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
