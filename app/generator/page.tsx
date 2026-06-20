'use client'

import { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface Product {
  id: number
  description: string
  quantity: number
  rate: number
  gstRate: number
}

export default function Generator() {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [businessName, setBusinessName] = useState('')
  const [businessGstin, setBusinessGstin] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerGstin, setCustomerGstin] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [products, setProducts] = useState<Product[]>([
    { id: 1, description: '', quantity: 1, rate: 0, gstRate: 18 }
  ])

  const addProduct = () => {
    setProducts([
      ...products,
      { id: products.length + 1, description: '', quantity: 1, rate: 0, gstRate: 18 }
    ])
  }

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const updateProduct = (id: number, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const calculateProductTotal = (product: Product) => {
    return product.quantity * product.rate
  }

  const calculateProductCGST = (product: Product) => {
    const total = calculateProductTotal(product)
    return (total * product.gstRate) / 200
  }

  const calculateProductSGST = (product: Product) => {
    const total = calculateProductTotal(product)
    return (total * product.gstRate) / 200
  }

  const calculateProductGrandTotal = (product: Product) => {
    const total = calculateProductTotal(product)
    const cgst = calculateProductCGST(product)
    const sgst = calculateProductSGST(product)
    return total + cgst + sgst
  }

  const calculateSubtotal = () => {
    return products.reduce((sum, p) => sum + calculateProductTotal(p), 0)
  }

  const calculateTotalCGST = () => {
    return products.reduce((sum, p) => sum + calculateProductCGST(p), 0)
  }

  const calculateTotalSGST = () => {
    return products.reduce((sum, p) => sum + calculateProductSGST(p), 0)
  }

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTotalCGST() + calculateTotalSGST()
  }

  const generatePDF = () => {
    // Validation
    if (!invoiceNumber || !businessName || !businessGstin || !businessAddress || 
        !customerName || !customerAddress || products.some(p => !p.description || p.quantity <= 0 || p.rate <= 0)) {
      alert('Please fill in all required fields before generating PDF')
      return
    }

    const doc = new jsPDF()

    // Header
    doc.setFontSize(24)
    doc.setTextColor(139, 92, 246)
    doc.text('TAX INVOICE', 105, 20, { align: 'center' })

    // Invoice Details
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(`Invoice No: ${invoiceNumber}`, 14, 35)
    doc.text(`Date: ${invoiceDate}`, 14, 42)

    // Business Details
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('From:', 14, 55)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(businessName, 14, 62)
    doc.text(`GSTIN: ${businessGstin}`, 14, 69)
    const businessLines = doc.splitTextToSize(businessAddress, 80)
    doc.text(businessLines, 14, 76)

    // Customer Details
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('To:', 120, 55)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(customerName, 120, 62)
    doc.text(`GSTIN: ${customerGstin}`, 120, 69)
    const customerLines = doc.splitTextToSize(customerAddress, 80)
    doc.text(customerLines, 120, 76)

    // Products Table
    const tableData = products.map(p => [
      p.description,
      p.quantity.toString(),
      `₹${p.rate.toFixed(2)}`,
      `${p.gstRate}%`,
      `₹${calculateProductTotal(p).toFixed(2)}`,
      `₹${calculateProductCGST(p).toFixed(2)}`,
      `₹${calculateProductSGST(p).toFixed(2)}`,
      `₹${calculateProductGrandTotal(p).toFixed(2)}`
    ])

    ;(doc as any).autoTable({
      startY: 100,
      head: [['Description', 'Qty', 'Rate', 'GST', 'Amount', 'CGST', 'SGST', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [139, 92, 246] },
      styles: { fontSize: 9 }
    })

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(10)
    doc.text(`Subtotal: ₹${calculateSubtotal().toFixed(2)}`, 140, finalY)
    doc.text(`Total CGST: ₹${calculateTotalCGST().toFixed(2)}`, 140, finalY + 7)
    doc.text(`Total SGST: ₹${calculateTotalSGST().toFixed(2)}`, 140, finalY + 14)
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(`Grand Total: ₹${calculateGrandTotal().toFixed(2)}`, 140, finalY + 24)

    // Footer
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text('Generated by GST Invoice Generator', 105, 280, { align: 'center' })
    doc.text('Built for Digital Heroes', 105, 285, { align: 'center' })

    // Save
    doc.save(`Invoice_${invoiceNumber || 'draft'}.pdf`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
        Create GST Invoice
      </h1>

      <div className="glass-card p-8">
        {/* Invoice Header */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Invoice Number *</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-001"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Invoice Date *</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Business Details */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-400">Your Business Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your Business Name"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">GSTIN *</label>
              <input
                type="text"
                value={businessGstin}
                onChange={(e) => setBusinessGstin(e.target.value)}
                placeholder="27XXXXX1234X1XX"
                className="input-field"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Address *</label>
              <textarea
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                placeholder="Complete business address"
                className="input-field"
                rows={3}
                required
              />
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-blue-400">Customer Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Customer Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Customer GSTIN</label>
              <input
                type="text"
                value={customerGstin}
                onChange={(e) => setCustomerGstin(e.target.value)}
                placeholder="27XXXXX1234X1XX (Optional)"
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Address *</label>
              <textarea
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Customer address"
                className="input-field"
                rows={3}
                required
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-400">Products/Services</h3>
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Item {index + 1}</span>
                  {products.length > 1 && (
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Description *</label>
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                      placeholder="Product or service description"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Quantity *</label>
                    <input
                      type="number"
                      value={product.quantity || ''}
                      onChange={(e) => updateProduct(product.id, 'quantity', e.target.value === '' ? 1 : parseFloat(e.target.value))}
                      min="1"
                      className="input-field"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Rate (₹) *</label>
                    <input
                      type="number"
                      value={product.rate || ''}
                      onChange={(e) => updateProduct(product.id, 'rate', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      min="0"
                      step="0.01"
                      className="input-field"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">GST % *</label>
                    <select
                      value={product.gstRate}
                      onChange={(e) => updateProduct(product.id, 'gstRate', parseFloat(e.target.value))}
                      className="input-field"
                    >
                      <option value={5}>5%</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                      <option value={28}>28%</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Amount:</span>
                      <p className="font-semibold">₹{calculateProductTotal(product).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-white/60">CGST ({product.gstRate / 2}%):</span>
                      <p className="font-semibold">₹{calculateProductCGST(product).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-white/60">SGST ({product.gstRate / 2}%):</span>
                      <p className="font-semibold">₹{calculateProductSGST(product).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Total:</span>
                      <p className="font-semibold text-lg">₹{calculateProductGrandTotal(product).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addProduct}
            className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            + Add Item
          </button>
        </div>

        {/* Invoice Summary */}
        <div className="glass-card p-6 bg-white/10">
          <h3 className="text-xl font-bold mb-4">Invoice Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total CGST:</span>
              <span className="font-semibold">₹{calculateTotalCGST().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total SGST:</span>
              <span className="font-semibold">₹{calculateTotalSGST().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl pt-3 border-t border-white/20">
              <span className="font-bold">Grand Total:</span>
              <span className="font-bold gradient-text">₹{calculateGrandTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Generate PDF Button */}
        <div className="mt-8 text-center">
          <button
            onClick={generatePDF}
            className="gradient-button px-8 py-4 rounded-lg text-lg"
          >
            Download Invoice PDF
          </button>
        </div>
      </div>
    </div>
  )
}
