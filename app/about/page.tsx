export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
        About This Project
      </h1>

      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">What is this?</h2>
        <p className="text-white/80 mb-4 leading-relaxed">
          GST Invoice Generator is a free online tool that helps businesses and freelancers create 
          professional GST-compliant invoices with automatic tax calculations. Simply enter your 
          business details, customer information, and product/service details - the tool automatically 
          calculates CGST, SGST, and generates a downloadable PDF invoice.
        </p>
        <p className="text-white/80 leading-relaxed">
          This tool was built to solve a real problem: creating GST invoices shouldn't require 
          expensive accounting software or manual calculations. Whether you're a freelancer, small 
          business owner, or startup founder, you can generate professional invoices in seconds.
        </p>
      </div>

      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Key Features</h2>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span><strong>Automatic GST Calculations:</strong> CGST and SGST calculated instantly based on applicable GST rates (5%, 12%, 18%, 28%)</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span><strong>Multiple Products/Services:</strong> Add unlimited items to a single invoice with individual GST rates</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span><strong>PDF Export:</strong> Download professional, print-ready invoices as PDF</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span><strong>Responsive Design:</strong> Works perfectly on desktop, tablet, and mobile devices</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span><strong>100% Free:</strong> No signup, no subscriptions, no hidden costs</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span><strong>Privacy First:</strong> All calculations happen in your browser - no data is stored or sent to servers</span>
          </li>
        </ul>
      </div>

      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Technology Stack</h2>
        <div className="grid md:grid-cols-2 gap-4 text-white/80">
          <div>
            <h3 className="font-semibold text-white mb-2">Frontend</h3>
            <ul className="space-y-1 ml-4">
              <li>• Next.js 14 (React Framework)</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Libraries</h3>
            <ul className="space-y-1 ml-4">
              <li>• jsPDF (PDF Generation)</li>
              <li>• jsPDF-AutoTable (Tables)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Deployment</h3>
            <ul className="space-y-1 ml-4">
              <li>• Vercel (Free Hosting)</li>
              <li>• GitHub (Version Control)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Design</h3>
            <ul className="space-y-1 ml-4">
              <li>• Dark Theme</li>
              <li>• Glassmorphism UI</li>
              <li>• Purple/Blue Gradients</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Why I Built This</h2>
        <p className="text-white/80 leading-relaxed">
          As a freelancer and developer, I frequently needed to generate GST invoices for clients. 
          Existing solutions were either too complex, required expensive subscriptions, or didn't 
          provide the flexibility I needed. I wanted a simple, fast, and free tool that just works.
        </p>
        <p className="text-white/80 leading-relaxed mt-4">
          This project demonstrates my ability to identify real-world problems and build practical 
          solutions using modern web technologies. It showcases clean code, responsive design, 
          and attention to user experience.
        </p>
      </div>

      <div className="glass-card p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
        <h2 className="text-2xl font-bold mb-4">Developer Information</h2>
        <div className="space-y-2 text-lg">
          <p><strong className="text-purple-400">Name:</strong> Vansh Sharma</p>
          <p><strong className="text-purple-400">Email:</strong> <a href="mailto:vanshsharma@example.com" className="text-blue-400 hover:text-blue-300">vanshsharma@example.com</a></p>
          <p><strong className="text-purple-400">GitHub:</strong> <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">github.com/yourusername</a></p>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20">
          <a 
            href="https://digitalheroesco.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="gradient-button px-6 py-3 rounded-lg inline-block"
          >
            Built for Digital Heroes
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm">
          This project is open source and free to use. Feel free to contribute or fork it on GitHub.
        </p>
      </div>
    </div>
  )
}
