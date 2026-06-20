'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function InvoicePreview() {
  return (
    <div className="min-h-screen bg-[#15121b]">
      {/* Top Navigation */}
      <nav className="bg-white/5 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.15)] flex justify-between items-center px-6 md:px-12 h-20 z-50">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold text-white">GST Invoice Generator</span>
          <div className="hidden md:flex gap-6">
            <Link href="/#features" className="text-white/60 hover:text-white transition-all">
              Features
            </Link>
            <Link href="/about" className="text-white/60 hover:text-white transition-all">
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/generator"
            className="hidden md:flex items-center justify-center gradient-button text-white px-6 py-2 rounded-lg hover:brightness-125 transition-all"
          >
            <span>Generate Now</span>
          </Link>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Side Navigation */}
        <aside className="hidden md:flex bg-[#1d1a23]/50 backdrop-blur-lg h-[calc(100vh-80px)] w-64 fixed left-0 top-20 border-r border-white/10 flex-col gap-4 p-6 z-40">
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold">Invoice Progress</h2>
            <p className="text-blue-400 mt-2 text-sm font-mono">Step 4 of 4</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="text-white/40 flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors rounded-lg" href="#">
              <span className="material-symbols-outlined">business</span>
              Business
            </a>
            <a className="text-white/40 flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors rounded-lg" href="#">
              <span className="material-symbols-outlined">person</span>
              Customer
            </a>
            <a className="text-white/40 flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors rounded-lg" href="#">
              <span className="material-symbols-outlined">inventory_2</span>
              Products
            </a>
            <a className="text-blue-400 font-bold flex items-center gap-3 py-3 px-4 bg-white/5 rounded-lg" href="#">
              <span className="material-symbols-outlined">rate_review</span>
              Review
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Action Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Review Invoice</h1>
                <p className="text-white/60 mt-2">Please verify the details below before final generation.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Link
                  href="/generator"
                  className="flex-1 md:flex-none py-2 px-4 rounded-lg border border-white/15 bg-transparent backdrop-blur text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Back to Edit
                </Link>
                <button className="flex-1 md:flex-none gradient-button py-2 px-6 rounded-lg text-white hover:brightness-125 transition-all flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="bg-[#2c2832] rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/5">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none mix-blend-overlay"></div>

              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-12 relative z-10 border-b border-white/10 pb-8">
                <div>
                  <div className="h-12 w-32 bg-white/10 rounded mb-4 flex items-center justify-center text-white/40 text-xs font-semibold">
                    YOUR LOGO
                  </div>
                  <h2 className="text-xl text-white font-semibold">Nexus Technologies Ltd.</h2>
                  <p className="text-sm text-white/50 mt-1">123 Innovation Drive, Tech Park</p>
                  <p className="text-sm text-white/50">Bengaluru, Karnataka 560001</p>
                  <p className="text-sm text-white/50 mt-2">GSTIN: 29ABCDE1234F1Z5</p>
                </div>
                <div className="text-right">
                  <h1 className="text-3xl text-white uppercase tracking-wider font-bold">Invoice</h1>
                  <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-orange-400"></span> Draft
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span className="text-white/50">Invoice No:</span>
                    <span className="text-white font-mono">INV-2024-089</span>
                    <span className="text-white/50">Invoice Date:</span>
                    <span className="text-white font-mono">24 Oct 2024</span>
                    <span className="text-white/50">Due Date:</span>
                    <span className="text-white font-mono">24 Nov 2024</span>
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 relative z-10">
                <div>
                  <h3 className="text-xs text-white/40 mb-3 border-b border-white/10 pb-2 uppercase tracking-wider font-semibold">
                    Billed To
                  </h3>
                  <h4 className="text-lg text-white font-semibold">Acme Corporation</h4>
                  <p className="text-sm text-white/50 mt-1">456 Corporate Towers, Sector 4</p>
                  <p className="text-sm text-white/50">Mumbai, Maharashtra 400001</p>
                  <p className="text-sm text-white/50 mt-2">GSTIN: 27XYZDE9876F1Z5</p>
                  <p className="text-sm text-white/50">State Code: 27</p>
                </div>
                <div>
                  <h3 className="text-xs text-white/40 mb-3 border-b border-white/10 pb-2 uppercase tracking-wider font-semibold">
                    Place of Supply
                  </h3>
                  <p className="text-sm text-white/50">Maharashtra (27)</p>
                  <div className="mt-4 p-4 rounded-lg bg-[#1d1a23] border border-white/5">
                    <p className="text-sm text-white/50 mb-1">Total Amount Payable</p>
                    <p className="text-2xl text-blue-400 font-mono font-bold">₹ 1,77,000.00</p>
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="relative z-10 mb-12 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 text-[11px] uppercase tracking-wider font-mono">
                      <th className="py-3 px-2">#</th>
                      <th className="py-3 px-2">Item Details</th>
                      <th className="py-3 px-2">HSN/SAC</th>
                      <th className="py-3 px-2 text-right">Qty</th>
                      <th className="py-3 px-2 text-right">Rate (₹)</th>
                      <th className="py-3 px-2 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-sm text-white/60">
                    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-2">1</td>
                      <td className="py-4 px-2">
                        <p className="text-white">Enterprise Cloud Infrastructure Setup</p>
                        <p className="text-xs text-white/40 mt-1">Architecture design and initial deployment</p>
                      </td>
                      <td className="py-4 px-2">998313</td>
                      <td className="py-4 px-2 text-right">1</td>
                      <td className="py-4 px-2 text-right">1,00,000.00</td>
                      <td className="py-4 px-2 text-right text-white">1,00,000.00</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-2">2</td>
                      <td className="py-4 px-2">
                        <p className="text-white">Monthly Managed Services (Oct)</p>
                        <p className="text-xs text-white/40 mt-1">24/7 Monitoring and Support</p>
                      </td>
                      <td className="py-4 px-2">998314</td>
                      <td className="py-4 px-2 text-right">1</td>
                      <td className="py-4 px-2 text-right">50,000.00</td>
                      <td className="py-4 px-2 text-right text-white">50,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals & Taxes */}
              <div className="flex flex-col md:flex-row justify-between items-start relative z-10 gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Amount in Words</h3>
                  <p className="text-sm text-white/50 italic mb-6">Rupees One Lakh Seventy Seven Thousand Only</p>
                  <h3 className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Bank Details</h3>
                  <div className="font-mono text-sm text-white/60 space-y-1 bg-[#1d1a23] p-4 rounded border border-white/5">
                    <p>Bank: HDFC Bank Ltd.</p>
                    <p>A/C Name: Nexus Technologies Ltd.</p>
                    <p>A/C No: 50200012345678</p>
                    <p>IFSC: HDFC0001234</p>
                  </div>
                </div>
                <div className="w-full md:w-[40%] bg-[#1d1a23] p-6 rounded-lg border border-white/5">
                  <div className="flex justify-between items-center py-2 font-mono text-sm text-white/60 border-b border-white/5">
                    <span>Sub Total</span>
                    <span>₹ 1,50,000.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-mono text-sm text-white/60">
                    <span>IGST @ 18%</span>
                    <span>₹ 27,000.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-mono text-sm text-white/40 text-xs">
                    <span>(Inter-state supply)</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between items-center py-4 mt-2 font-mono text-base text-white font-bold border-t border-white/20">
                    <span>Total Amount</span>
                    <span className="text-blue-400">₹ 1,77,000.00</span>
                  </div>
                </div>
              </div>

              {/* Terms & Signature */}
              <div className="mt-12 pt-8 border-t border-white/10 relative z-10 flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Terms & Conditions</h3>
                  <ul className="list-disc list-inside text-xs text-white/50 space-y-1">
                    <li>Payment due within 30 days from invoice date.</li>
                    <li>Late payment subject to 1.5% interest per month.</li>
                    <li>All disputes subject to Bengaluru jurisdiction.</li>
                  </ul>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="h-16 w-32 border-b border-white/20 mb-2 flex items-end justify-center pb-1">
                    <span className="text-purple-400/50 italic text-xl">System Generated</span>
                  </div>
                  <p className="text-sm text-white">Authorized Signatory</p>
                  <p className="text-xs text-white/50">Nexus Technologies Ltd.</p>
                </div>
              </div>
            </div>

            {/* Mobile Download Button */}
            <div className="mt-8 text-center md:hidden">
              <button className="w-full gradient-button py-3 px-6 rounded-lg text-white hover:brightness-125 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Full PDF</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#0f0d15] w-full py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 gap-8">
        <span className="text-white font-bold text-xl">GST Invoice Generator</span>
        <div className="flex gap-6">
          <a className="text-white/40 text-xs uppercase tracking-wider hover:text-purple-400 transition-colors" href="#">
            Terms
          </a>
          <a className="text-white/40 text-xs uppercase tracking-wider hover:text-purple-400 transition-colors" href="#">
            Privacy
          </a>
          <a className="text-white/40 text-xs uppercase tracking-wider hover:text-purple-400 transition-colors" href="#">
            Support
          </a>
          <a 
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 text-xs uppercase tracking-wider hover:text-purple-400 transition-colors"
          >
            Digital Heroes
          </a>
        </div>
        <span className="text-white/60 text-xs">
          Built by <span className="text-white font-semibold">Vansh Sharma</span> • <a href="mailto:vanshverma531@gmail.com" className="text-purple-400 hover:text-purple-300">vanshverma531@gmail.com</a>
        </span>
      </footer>
    </div>
  )
}
