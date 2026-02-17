import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 grid-cols-1 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">FileToolsPro</h3>
          <p className="text-sm text-gray-400">
            Free online tools to convert, compress and optimize your files easily.
          </p>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-white font-semibold mb-3">Most Popular Tools</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tools/pdf-to-jpg" className="hover:text-white">PDF to JPG</Link></li>
            <li><Link href="/tools/image-compressor" className="hover:text-white">Image Compressor</Link></li>
            <li><Link href="/tools/jpg-to-pdf" className="hover:text-white">JPG to PDF</Link></li>
            <li><Link href="/tools/file-size-reducer" className="hover:text-white">File Size Reducer</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FileToolsPro. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
