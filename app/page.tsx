'use client'

import Link from 'next/link'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

// Counter animation hook
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  
  return count
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const invoiceCount = useCountUp(2800000, 2000)
  const valueCount = useCountUp(850, 2000)

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" 
             style={{ 
               transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
               transition: 'transform 0.3s ease-out'
             }} 
        />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="badge">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GST Verified & Compliant
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Professional
              <br />
              <span className="gradient-text">GST Invoices</span>
              <br />
              in Seconds
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/60 mb-8 max-w-lg leading-relaxed"
            >
              Generate accurate GST-compliant invoices with automatic CGST and SGST calculations. 
              Download as PDF instantly. Trusted by thousands of businesses.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="/generator"
                className="gradient-button px-8 py-4 rounded-full text-lg font-semibold glow"
              >
                <span>Generate Invoice</span>
              </Link>
              <Link 
                href="/generator"
                className="glass-card px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
              >
                Live Demo →
              </Link>
            </motion.div>

            {/* Trust Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex items-center gap-6 text-sm text-white/40"
            >
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-[#0a0a0f]" />
                ))}
              </div>
              <span>Trusted by 10,000+ businesses</span>
            </motion.div>
          </motion.div>

          {/* Right: Floating Invoice Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [-2, 1, -2]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="glass-card p-8 relative"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`
              }}
            >
              {/* Invoice Preview */}
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl font-bold gradient-text mb-1">TAX INVOICE</div>
                    <div className="text-sm text-white/40">#INV-2024-001</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40">Date</div>
                    <div className="text-sm font-semibold">20 Jun 2026</div>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-white/40 mb-2">From</div>
                    <div className="font-semibold">Acme Corp</div>
                    <div className="text-white/50">GSTIN: 27XXXXX1234</div>
                  </div>
                  <div>
                    <div className="text-white/40 mb-2">To</div>
                    <div className="font-semibold">Client Name</div>
                    <div className="text-white/50">GSTIN: 27YYYYYY5678</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Web Development</span>
                    <span className="font-semibold">₹50,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">CGST (9%)</span>
                    <span className="text-emerald-400">₹4,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">SGST (9%)</span>
                    <span className="text-emerald-400">₹4,500</span>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold gradient-text">₹59,000</span>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                >
                  ✓ Verified
                </motion.div>
              </div>
            </motion.div>

            {/* Floating glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Floating Statistics */}
      <section className="relative -mt-20 px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Invoices Generated', value: invoiceCount.toLocaleString(), suffix: 'M+' },
              { label: 'Invoice Value', value: `₹${valueCount}`, suffix: 'Cr+' },
              { label: 'Accuracy', value: '99.98', suffix: '%' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover p-8 text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {i === 0 ? '2.8M+' : i === 1 ? `₹${valueCount}Cr+` : `${stat.value}${stat.suffix}`}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Everything you need to
              <br />
              <span className="gradient-text">invoice with confidence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/50 max-w-2xl mx-auto"
            >
              Professional invoicing tools designed for modern businesses
            </motion.p>
          </div>

          <div className="bento-grid">
            {/* Large Feature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bento-large glass-card glass-card-hover p-10"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Automatic GST Calculations</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    CGST and SGST calculated automatically based on GST rates. No manual math needed. 
                    Support for 5%, 12%, 18%, and 28% GST rates with instant updates.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-sm text-white/40 mb-1">CGST</div>
                  <div className="text-xl font-bold text-emerald-400">₹4,500</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-sm text-white/40 mb-1">SGST</div>
                  <div className="text-xl font-bold text-emerald-400">₹4,500</div>
                </div>
              </div>
            </motion.div>

            {/* Medium Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bento-medium glass-card glass-card-hover p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">PDF Export</h3>
              <p className="text-white/60 leading-relaxed">
                Download professional invoices as PDF with one click. Print-ready format with proper GST compliance.
              </p>
            </motion.div>

            {/* Small Features */}
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Mobile Optimized',
                description: 'Create invoices on any device. Fully responsive design.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Secure & Private',
                description: 'All calculations happen in your browser. No data stored.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Lightning Fast',
                description: 'Generate invoices in seconds. No loading, no delays.'
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bento-small glass-card glass-card-hover p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="glass-card p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to streamline your
                <br />
                <span className="gradient-text">invoicing process?</span>
              </h2>
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses creating professional GST invoices in seconds
              </p>
              <Link 
                href="/generator"
                className="gradient-button px-10 py-5 rounded-full text-lg font-semibold inline-block glow"
              >
                <span>Start Creating Invoices</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
