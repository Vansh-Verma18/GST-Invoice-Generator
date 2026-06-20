'use client'

import { useState } from 'react'
import Link from 'next/link'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface Product {
  id: number
  description: string
  subDescription: string
  hsnSac: string
  quantity: number
  rate: number
  gstRate: number
}

export default function Generator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [businessName, setBusinessName] = useState('')
  const [businessGstin, setBusinessGstin] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessCity, setBusinessCity] = useState('')
  const [businessState, setBusinessState] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerGstin, setCustomerGstin] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [logo, setLogo] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([
    { id: 1, description: '', subDescription: '', hsnSac: '', quantity: 1, rate: 0, gstRate: 18 }
  ])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, description: '', subDescription: '', hsnSac: '', quantity: 1, rate: 0, gstRate: 18 }])
  }

  const removeProduct = (id: number) => {
    if (products.length > 1) setProducts(products.filter(p => p.id !== id))
  }

  const updateProduct = (id: number, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const calculateProductTotal = (product: Product) => product.quantity * product.rate
  const calculateProductCGST = (product: Product) => (calculateProductTotal(product) * product.gstRate) / 200
  const calculateProductSGST = (product: Product) => (calculateProductTotal(product) * product.gstRate) / 200
  const calculateSubtotal = () => products.reduce((sum, p) => sum + calculateProductTotal(p), 0)
  const calculateTotalCGST = () => products.reduce((sum, p) => sum + calculateProductCGST(p), 0)
  const calculateTotalSGST = () => products.reduce((sum, p) => sum + calculateProductSGST(p), 0)
  const calculateGrandTotal = () => calculateSubtotal() + calculateTotalCGST() + calculateTotalSGST()

  const generatePDF = () => {
    if (!businessName || !businessGstin || !businessAddress || !customerName || !customerAddress || products.some(p => !p.description || p.quantity <= 0 || p.rate <= 0)) {
      alert('Please fill in all required fields')
      return
    }
    
    const finalInvoiceNumber = invoiceNumber || `INV-${Date.now()}`
    const finalInvoiceDate = invoiceDate
    const doc = new jsPDF()
    
    // PROFESSIONAL COLOR PALETTE
    const navy = [30, 41, 59]           // Headings
    const purple = [139, 92, 246]       // Accents
    const blue = [59, 130, 246]         // Highlights
    const darkGray = [71, 85, 105]      // Body text
    const lightGray = [148, 163, 184]   // Labels
    const borderGray = [226, 232, 240]  // Borders
    const bgGray = [248, 250, 252]      // Backgrounds
    
    // WHITE BACKGROUND
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, 210, 297, 'F')
    
    // ============================================
    // TOP SECTION - Compact Header
    // ============================================
    const margin = 15
    
    // LEFT: INVOXA Logo & Tagline
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(purple[0], purple[1], purple[2])
    doc.text('INVOXA', margin, 20)
    
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.text('Smart GST Invoice Platform', margin, 26)
    
    // RIGHT: Invoice Details (Compact)
    const rightX = 195
    
    // Compact Status Badge
    doc.setFillColor(purple[0], purple[1], purple[2])
    doc.roundedRect(rightX - 28, 14, 28, 6, 1, 1, 'F')
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 255, 255)
    doc.text('INVOICE', rightX - 14, 18, { align: 'center' })
    
    // Invoice Number
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.text('Invoice Number', rightX, 26, { align: 'right' })
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(navy[0], navy[1], navy[2])
    doc.text(finalInvoiceNumber, rightX, 32, { align: 'right' })
    
    // Issue Date
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.text('Issue Date', rightX, 38, { align: 'right' })
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text(finalInvoiceDate, rightX, 43, { align: 'right' })
    
    // ============================================
    // CUSTOMER SECTION - Single Row Cards
    // ============================================
    const cardY = 52
    const cardWidth = 88
    const cardHeight = 28
    
    // FROM Card
    doc.setFillColor(bgGray[0], bgGray[1], bgGray[2])
    doc.roundedRect(margin, cardY, cardWidth, cardHeight, 2, 2, 'F')
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
    doc.setLineWidth(0.3)
    doc.roundedRect(margin, cardY, cardWidth, cardHeight, 2, 2, 'S')
    
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.text('FROM', margin + 4, cardY + 5)
    
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(navy[0], navy[1], navy[2])
    doc.text(businessName, margin + 4, cardY + 11)
    
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text(`GSTIN: ${businessGstin}`, margin + 4, cardY + 16)
    
    const businessAddr = doc.splitTextToSize(businessAddress, cardWidth - 8)
    doc.setFontSize(7)
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text(businessAddr.slice(0, 2), margin + 4, cardY + 21)
    
    // BILL TO Card
    const rightCardX = margin + cardWidth + 6
    doc.setFillColor(bgGray[0], bgGray[1], bgGray[2])
    doc.roundedRect(rightCardX, cardY, cardWidth, cardHeight, 2, 2, 'F')
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
    doc.setLineWidth(0.3)
    doc.roundedRect(rightCardX, cardY, cardWidth, cardHeight, 2, 2, 'S')
    
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.text('BILL TO', rightCardX + 4, cardY + 5)
    
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(navy[0], navy[1], navy[2])
    doc.text(customerName, rightCardX + 4, cardY + 11)
    
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text(`GSTIN: ${customerGstin || 'N/A'}`, rightCardX + 4, cardY + 16)
    
    const customerAddr = doc.splitTextToSize(customerAddress, cardWidth - 8)
    doc.setFontSize(7)
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text(customerAddr.slice(0, 2), rightCardX + 4, cardY + 21)
    
    // ============================================
    // TABLE - Professional & Wide
    // ============================================
    const tableStartY = 88
    const tableData = products.map(p => [
      p.description,
      p.quantity.toString(),
      `₹${p.rate.toFixed(2)}`,
      `${p.gstRate}%`,
      `₹${calculateProductCGST(p).toFixed(2)}`,
      `₹${calculateProductSGST(p).toFixed(2)}`,
      `₹${(calculateProductTotal(p) + calculateProductCGST(p) + calculateProductSGST(p)).toFixed(2)}`
    ])
    
    ;(doc as any).autoTable({
      startY: tableStartY,
      head: [['Description', 'Qty', 'Rate', 'GST', 'CGST', 'SGST', 'Total']],
      body: tableData,
      theme: 'plain',
      margin: { left: margin, right: margin },
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'left',
        cellPadding: { top: 4, bottom: 4, left: 3, right: 3 }
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [71, 85, 105],
        cellPadding: { top: 5, bottom: 5, left: 3, right: 3 }
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      columnStyles: {
        0: { cellWidth: 70, halign: 'left' },
        1: { cellWidth: 15, halign: 'center' },
        2: { cellWidth: 23, halign: 'right' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 20, halign: 'right' },
        5: { cellWidth: 20, halign: 'right' },
        6: { cellWidth: 27, halign: 'right', fontStyle: 'bold', textColor: [30, 41, 59] }
      },
      styles: {
        lineColor: [226, 232, 240],
        lineWidth: 0.3
      }
    })
    
    // ============================================
    // SUMMARY - Directly Under Table
    // ============================================
    const summaryY = (doc as any).lastAutoTable.finalY + 8
    const summaryX = 195 - 70
    const summaryWidth = 70
    
    // Summary Box
    doc.setFillColor(bgGray[0], bgGray[1], bgGray[2])
    doc.roundedRect(summaryX, summaryY, summaryWidth, 38, 2, 2, 'F')
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
    doc.setLineWidth(0.3)
    doc.roundedRect(summaryX, summaryY, summaryWidth, 38, 2, 2, 'S')
    
    let sumY = summaryY + 6
    
    // Subtotal
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text('Subtotal', summaryX + 4, sumY)
    doc.text(`₹${calculateSubtotal().toFixed(2)}`, summaryX + summaryWidth - 4, sumY, { align: 'right' })
    
    sumY += 6
    // CGST
    doc.text('CGST', summaryX + 4, sumY)
    doc.text(`₹${calculateTotalCGST().toFixed(2)}`, summaryX + summaryWidth - 4, sumY, { align: 'right' })
    
    sumY += 6
    // SGST
    doc.text('SGST', summaryX + 4, sumY)
    doc.text(`₹${calculateTotalSGST().toFixed(2)}`, summaryX + summaryWidth - 4, sumY, { align: 'right' })
    
    sumY += 5
    // Divider
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
    doc.setLineWidth(0.5)
    doc.line(summaryX + 4, sumY, summaryX + summaryWidth - 4, sumY)
    
    sumY += 7
    // GRAND TOTAL - Most Prominent
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(purple[0], purple[1], purple[2])
    doc.text('GRAND TOTAL', summaryX + 4, sumY)
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(navy[0], navy[1], navy[2])
    doc.text(`₹${calculateGrandTotal().toFixed(2)}`, summaryX + summaryWidth - 4, sumY, { align: 'right' })
    
    // ============================================
    // FOOTER - Professional
    // ============================================
    const footerY = 275
    
    // Divider line
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
    doc.setLineWidth(0.3)
    doc.line(margin, footerY, 195, footerY)
    
    // Footer text
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.text('Generated by INVOXA', margin, footerY + 5)
    
    doc.setFontSize(7)
    doc.text('Professional GST Invoice Generator', margin, footerY + 9)
    
    doc.setTextColor(blue[0], blue[1], blue[2])
    doc.text('Support: support@invoxa.app', margin, footerY + 13)
    
    // Right side
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.setFontSize(7)
    doc.text('Built for Digital Heroes', 195, footerY + 9, { align: 'right' })
    
    doc.save(`Invoice_${finalInvoiceNumber}.pdf`)
  }

  const steps = [
    { id: 1, name: 'Business', icon: 'business' },
    { id: 2, name: 'Customer', icon: 'person' },
    { id: 3, name: 'Products', icon: 'inventory_2' },
    { id: 4, name: 'Review', icon: 'rate_review' }
  ]

  return (
    <div className="min-h-screen bg-[#0B0E14] relative overflow-x-hidden">
      <div className="fixed w-[600px] h-[600px] rounded-full bg-purple-500/20 top-[-100px] left-[-100px] blur-[100px] opacity-15 animate-pulse" style={{ animationDuration: '20s' }}></div>
      <div className="fixed w-[500px] h-[500px] rounded-full bg-blue-500/10 bottom-[-50px] right-[-50px] blur-[100px] opacity-15 animate-pulse" style={{ animationDuration: '25s', animationDelay: '-5s' }}></div>

      <div className="flex min-h-screen pt-20">
        <aside className="hidden md:flex flex-col gap-4 p-6 bg-[#1d1a23]/50 backdrop-blur-lg h-screen fixed left-0 top-0 border-r border-white/10 z-40 w-64 pt-24">
          <div className="mb-6">
            <div className="text-blue-400 font-bold text-lg font-mono">Invoice Progress</div>
            <div className="text-white/40 text-sm mt-1 font-mono">Step {currentStep} of 4</div>
          </div>
          <nav className="flex flex-col gap-2 flex-grow">
            {steps.map((step) => (
              <button key={step.id} onClick={() => setCurrentStep(step.id)} className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${currentStep === step.id ? 'text-blue-400 font-bold bg-white/5 shadow-[0_0_20px_rgba(76,215,246,0.15)]' : 'text-white/40 hover:bg-white/5'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: currentStep === step.id ? '"FILL" 1' : '"FILL" 0' }}>{step.icon}</span>
                <span className="font-mono text-sm">{step.name}</span>
              </button>
            ))}
          </nav>
          <Link href="/" className="w-full text-left text-white/40 flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors rounded-lg font-mono text-sm">
            <span className="material-symbols-outlined">close</span>
            <span>Cancel Draft</span>
          </Link>
        </aside>

        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-8">
              {currentStep === 1 && (
                <>
                  <header>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Business Details</h1>
                    <p className="text-lg text-white/60">Enter your company's registered information.</p>
                  </header>
                  <div className="glass-card rounded-xl p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                      <div className="relative w-24 h-24 rounded-lg bg-[#0f0d15] border border-white/15 border-dashed flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors group overflow-hidden">
                        {logo ? (
                          <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
                        ) : (
                          <span className="material-symbols-outlined text-white/40 group-hover:text-blue-400 text-3xl transition-colors">cloud_upload</span>
                        )}
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleLogoUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg text-white font-semibold mb-1">Company Logo</h3>
                        <p className="text-white/60 mb-3 text-sm">Upload image (PNG, JPG up to 2MB)</p>
                        <label className="px-4 py-2 rounded-lg border border-white/15 text-sm font-mono hover:bg-white/5 transition-colors text-white cursor-pointer inline-block">
                          Choose File
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>
                        {logo && (
                          <button
                            onClick={() => setLogo(null)}
                            className="ml-2 px-4 py-2 rounded-lg border border-red-400/30 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Company Name *</label>
                        <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="input-field" placeholder="Invoxa LLC" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">GSTIN / Tax ID *</label>
                        <input type="text" value={businessGstin} onChange={(e) => setBusinessGstin(e.target.value.toUpperCase())} className="input-field font-mono uppercase" placeholder="22AAAAA0000A1Z5" required />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Registered Address *</label>
                        <textarea value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} className="input-field resize-none" placeholder="Block A, Tech Park..." rows={3} required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">City *</label>
                        <input type="text" value={businessCity} onChange={(e) => setBusinessCity(e.target.value)} className="input-field" placeholder="Bengaluru" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">State / Province *</label>
                        <select value={businessState} onChange={(e) => setBusinessState(e.target.value)} className="input-field appearance-none" required>
                          <option value="">Select State</option>
                          <option value="KA">Karnataka (29)</option>
                          <option value="MH">Maharashtra (27)</option>
                          <option value="DL">Delhi (07)</option>
                          <option value="TN">Tamil Nadu (33)</option>
                          <option value="GJ">Gujarat (24)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <header>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Customer Details</h1>
                    <p className="text-lg text-white/60">Add your client's information.</p>
                  </header>
                  <div className="glass-card rounded-xl p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Customer Name *</label>
                        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="input-field" placeholder="Acme Corporation" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Customer GSTIN</label>
                        <input type="text" value={customerGstin} onChange={(e) => setCustomerGstin(e.target.value.toUpperCase())} className="input-field font-mono uppercase" placeholder="27XXXXX1234X1XX (Optional)" />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Address *</label>
                        <textarea value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="input-field resize-none" placeholder="Customer address" rows={3} required />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <header>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Line Items</h1>
                    <p className="text-lg text-white/60">Define the products or services for this invoice.</p>
                  </header>
                  
                  {/* Premium Table Card */}
                  <div className="glass-card rounded-xl overflow-hidden flex flex-col">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-[#1d1a23]/80 sticky top-0 z-10 text-xs text-white/40 uppercase tracking-wider font-semibold">
                      <div className="col-span-4">Item Description</div>
                      <div className="col-span-2">HSN/SAC</div>
                      <div className="col-span-1 text-right">Qty</div>
                      <div className="col-span-2 text-right">Unit Price</div>
                      <div className="col-span-1 text-right">Tax</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col">
                      {products.map((product, index) => (
                        <div 
                          key={product.id} 
                          className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center group relative border-l-2 border-transparent hover:border-l-purple-400"
                        >
                          {/* Description Column */}
                          <div className="col-span-4 flex flex-col gap-2">
                            <input
                              type="text"
                              value={product.description}
                              onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                              className="bg-[#15121b] border border-white/[0.08] rounded px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                              placeholder="e.g. Enterprise License"
                            />
                            <input
                              type="text"
                              value={product.subDescription}
                              onChange={(e) => updateProduct(product.id, 'subDescription', e.target.value)}
                              className="bg-transparent border-none text-sm text-white/60 px-3 focus:outline-none placeholder:text-white/30"
                              placeholder="Optional description..."
                            />
                          </div>

                          {/* HSN/SAC Column */}
                          <div className="col-span-2">
                            <input
                              type="text"
                              value={product.hsnSac}
                              onChange={(e) => updateProduct(product.id, 'hsnSac', e.target.value)}
                              className="bg-[#15121b] border border-white/[0.08] rounded px-3 py-2 text-white font-mono text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 w-full"
                              placeholder="9983"
                            />
                          </div>

                          {/* Quantity Column */}
                          <div className="col-span-1">
                            <input
                              type="number"
                              value={product.quantity || ''}
                              onChange={(e) => updateProduct(product.id, 'quantity', e.target.value === '' ? 1 : parseFloat(e.target.value))}
                              min="1"
                              className="bg-[#15121b] border border-white/[0.08] rounded px-3 py-2 text-right text-white font-mono text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 w-full"
                            />
                          </div>

                          {/* Unit Price Column */}
                          <div className="col-span-2 relative">
                            <span className="absolute left-3 top-2 text-white/40 font-mono text-sm">₹</span>
                            <input
                              type="number"
                              value={product.rate || ''}
                              onChange={(e) => updateProduct(product.id, 'rate', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                              min="0"
                              step="0.01"
                              className="bg-[#15121b] border border-white/[0.08] rounded pl-7 pr-3 py-2 text-right text-white font-mono text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 w-full"
                            />
                          </div>

                          {/* Tax Column */}
                          <div className="col-span-1">
                            <select
                              value={product.gstRate}
                              onChange={(e) => updateProduct(product.id, 'gstRate', parseFloat(e.target.value))}
                              className="bg-[#15121b] border border-white/[0.08] rounded px-2 py-2 text-right text-white font-mono text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 w-full pr-6 bg-no-repeat bg-[position:right_0.5rem_center] bg-[length:0.65em_auto]"
                              style={{
                                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='292.4' height='292.4'%3E%3Cpath fill='%23958ea0' d='M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z'/%3E%3C/svg%3E")`
                              }}
                            >
                              <option value={0}>0%</option>
                              <option value={5}>5%</option>
                              <option value={12}>12%</option>
                              <option value={18}>18%</option>
                              <option value={28}>28%</option>
                            </select>
                          </div>

                          {/* Total Column */}
                          <div className="col-span-2 text-right font-mono text-sm text-white flex items-center justify-end gap-2">
                            ₹{(calculateProductTotal(product) + calculateProductCGST(product) + calculateProductSGST(product)).toFixed(2)}
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                              title="Remove Item"
                            >
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add Row Button */}
                      <div className="px-6 py-6 flex justify-center border-t border-white/5">
                        <button 
                          onClick={addProduct}
                          className="flex items-center gap-2 text-purple-400 hover:text-blue-400 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-400/10 group-hover:bg-blue-400/20 flex items-center justify-center transition-all transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                          </div>
                          <span className="font-mono text-sm">Add New Line Item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <header>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Review & Export</h1>
                    <p className="text-lg text-white/60">Verify all details before generating.</p>
                  </header>
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Invoice Summary</h3>
                    <div className="space-y-4 text-white/80">
                      <div><strong className="text-white">Business:</strong> {businessName || 'Not set'}</div>
                      <div><strong className="text-white">Customer:</strong> {customerName || 'Not set'}</div>
                      <div><strong className="text-white">Items:</strong> {products.length}</div>
                    </div>
                  </div>
                </>
              )}

              <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
                <div>© 2024 GST Invoice Generator</div>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
                  <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Digital Heroes</a>
                </div>
              </footer>
            </div>

            <aside className="w-full xl:w-80 flex-shrink-0">
              <div className="sticky top-8 flex flex-col gap-6">
                <div className="glass-card rounded-xl overflow-hidden hover:border-purple-400/40 transition-colors">
                  <div className="p-6 border-b border-white/10 bg-white/5">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-purple-400">receipt_long</span>
                      Draft Summary
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col gap-4 font-mono text-sm">
                    <div className="flex justify-between items-center text-white/60"><span>Subtotal</span><span>₹{calculateSubtotal().toFixed(2)}</span></div>
                    <div className="flex justify-between items-center text-white/60"><span>CGST (9%)</span><span>₹{calculateTotalCGST().toFixed(2)}</span></div>
                    <div className="flex justify-between items-center text-white/60"><span>SGST (9%)</span><span>₹{calculateTotalSGST().toFixed(2)}</span></div>
                    <div className="h-px bg-white/10 my-2 w-full"></div>
                    <div className="flex justify-between items-center font-bold text-lg text-blue-400"><span>Grand Total</span><span>₹{calculateGrandTotal().toFixed(2)}</span></div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {currentStep < 4 && <button onClick={() => setCurrentStep(currentStep + 1)} className="gradient-button w-full rounded-lg py-4 px-6 font-bold text-white flex justify-center items-center gap-2"><span>Save & Next</span><span className="material-symbols-outlined">arrow_forward</span></button>}
                  {currentStep === 4 && <button onClick={generatePDF} className="gradient-button w-full rounded-lg py-4 px-6 font-bold text-white flex justify-center items-center gap-2"><span>Download PDF</span><span className="material-symbols-outlined">download</span></button>}
                  {currentStep > 1 && <button onClick={() => setCurrentStep(currentStep - 1)} className="w-full rounded-lg py-3 px-6 border border-white/15 text-white hover:bg-white/5 transition-colors flex justify-center items-center gap-2"><span className="material-symbols-outlined">arrow_back</span><span>Previous</span></button>}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 w-full glass-card border-t border-white/10 flex justify-around items-center h-16 z-50 px-2">
        {steps.map((step) => (
          <button key={step.id} onClick={() => setCurrentStep(step.id)} className={`flex flex-col items-center gap-1 p-2 ${currentStep === step.id ? 'text-blue-400' : 'text-white/40'}`}>
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: currentStep === step.id ? '"FILL" 1' : '"FILL" 0' }}>{step.icon}</span>
            <span className="text-[10px] font-mono font-bold">{step.name}</span>
          </button>
        ))}
      </nav>

      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    </div>
  )
}
