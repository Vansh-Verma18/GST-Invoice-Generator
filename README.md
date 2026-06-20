# GST Invoice Generator

A modern, free online tool for generating GST-compliant invoices with automatic CGST and SGST calculations. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Automatic GST Calculations**: CGST and SGST calculated automatically based on GST rates
- **Multiple Products/Services**: Add unlimited items with individual GST rates (5%, 12%, 18%, 28%)
- **PDF Export**: Generate professional, print-ready PDF invoices
- **Responsive Design**: Works perfectly on all devices
- **100% Free**: No signup, no subscriptions, no hidden costs
- **Privacy First**: All calculations happen in browser - no data stored

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF + jsPDF-AutoTable
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gst-invoice-generator.git
cd gst-invoice-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Enter Invoice Details**: Invoice number and date
2. **Add Business Details**: Your business name, GSTIN, and address
3. **Add Customer Details**: Customer name, GSTIN (optional), and address
4. **Add Products/Services**: Description, quantity, rate, and GST percentage
5. **Review Calculations**: CGST, SGST, and total automatically calculated
6. **Download PDF**: Click "Download Invoice PDF" to generate and save

## GST Calculation Formula

- **CGST** = (Product Amount × GST Rate) / 200
- **SGST** = (Product Amount × GST Rate) / 200
- **Total Tax** = CGST + SGST
- **Grand Total** = Product Amount + CGST + SGST

## Project Structure

```
gst-invoice-generator/
├── app/
│   ├── generator/
│   │   └── page.tsx          # Invoice generator page
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── layout.tsx            # Root layout with navigation
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── package.json              # Dependencies
└── README.md                 # Documentation
```

## Deployment

This project is deployed on Vercel's free tier:

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

## Developer

**Name**: Vansh Sharma  
**Email**: vanshverma531@gmail.com  
**GitHub**: https://github.com/Vansh-Verma18  
**Built for**: [Digital Heroes](https://digitalheroesco.com)

## License

MIT License - Free to use and modify

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions or issues, please contact: vanshverma531@gmail.com
