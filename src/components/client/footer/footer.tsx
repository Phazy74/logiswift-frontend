// src/components/client/footer/Footer.tsx
import React from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';

// Custom Social Icons to replace the missing Lucide ones
const SocialIcons = {
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  )
};

export const Footer = () => {
  return (
    <footer className="mt-32 pt-20 pb-10 border-t border-white/5 bg-[#0a0d14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold italic tracking-tighter text-blue-500 mb-6">LogiSwift</div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              End-to-end logistics solutions designed to deliver your cargo safely, on time, every time.
            </p>
            {/* Updated Social Icon Row */}
            <div className="flex gap-4">
              <div className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                <SocialIcons.Twitter />
              </div>
              <div className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                <SocialIcons.Linkedin />
              </div>
              <div className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                <SocialIcons.Instagram />
              </div>
              <div className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                <SocialIcons.Facebook />
              </div>
            </div>
          </div>

          {/* ... rest of the columns remain the same ... */}
          
          {/* Column 2: Company */}
          <div>
            <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white cursor-pointer transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white cursor-pointer transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white cursor-pointer transition-colors">Blog</Link></li>
              <li><Link href="/news" className="hover:text-white cursor-pointer transition-colors">News & Insights</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4><Link href="/services" className="hover:text-white cursor-pointer transition-colors">Services</Link></h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/resources/freight-shipping-guide" className="hover:text-white cursor-pointer transition-colors">Freight Transport</Link></li>
              <li><Link href="/services/warehousing" className="hover:text-white cursor-pointer transition-colors">Warehousing</Link></li>
              <li><Link href="tracking" className="hover:text-white cursor-pointer transition-colors">Shipment Tracking</Link></li>
              <li><Link href="/resources/retailer-case-study" className="hover:text-white cursor-pointer transition-colors">Supply Chain Solutions</Link></li>
              <li><Link href="/services/customs-clearance" className="hover:text-white cursor-pointer transition-colors">Customs Clearance</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li><Link href="/contact" className="hover:text-white cursor-pointer transition-colors">Contact Us</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping Guides</li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-6">Stay updated with the latest news, insights, and logistics tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-blue-600 px-4 rounded-md hover:bg-blue-500 transition-colors flex items-center justify-center">
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 LogiSwift. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cookies Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};