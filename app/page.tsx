import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Generate Professional
          <br />
          <span className="gradient-text">GST Invoices</span>
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl">
          Create accurate GST invoices with automatic CGST and SGST calculations. 
          Download as PDF instantly. 100% free and easy to use.
        </p>
        <Link 
          href="/generator"
          className="gradient-button px-8 py-4 rounded-lg text-lg"
        >
          Start Creating Invoice
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Automatic Calculations</h3>
            <p className="text-white/70">
              CGST and SGST are calculated automatically based on GST rates. No manual math needed.
            </p>
          </div>

          <div className="glass-card p-8 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">PDF Export</h3>
            <p className="text-white/70">
              Download professional invoices as PDF with one click. Print-ready format.
            </p>
          </div>

          <div className="glass-card p-8 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Mobile Friendly</h3>
            <p className="text-white/70">
              Works perfectly on all devices. Create invoices on the go from your phone or tablet.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="glass-card p-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/70 mb-8">
            Create your first GST invoice in under a minute. No signup required.
          </p>
          <Link 
            href="/generator"
            className="gradient-button px-8 py-4 rounded-lg text-lg inline-block"
          >
            Create Invoice Now
          </Link>
        </div>
      </section>
    </div>
  )
}
