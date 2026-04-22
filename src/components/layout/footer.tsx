import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Alexander &amp; Blake logo">
                <rect width="120" height="120" rx="24" fill="#2C7A7B"/>
                <path d="M28 82L44 30h8l16 52h-8l-4-14H40l-4 14h-8zm14-22h12l-6-22-6 22z" fill="white"/>
                <path d="M68 30h16c4 0 7 1 9 3s3 5 3 8c0 4-2 7-5 9 4 2 6 5 6 10 0 4-1 7-4 9s-6 3-10 3H68V30zm8 18h8c2 0 3-0.5 4-2s2-3 2-5-1-3-2-4-2-2-4-2h-8v13zm0 20h10c2 0 4-1 5-2s2-3 2-5-1-4-2-5-3-2-5-2H76v14z" fill="rgba(255,255,255,0.7)"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-white text-base leading-tight tracking-wide">Alexander <span className="text-primary-light">&amp;</span> Blake</span>
                <span className="text-[10px] text-gray-400 tracking-[0.15em] uppercase leading-tight">R&amp;D Tax Credit Advisory</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              A specialist advisory firm helping innovative South Carolina businesses identify, document, and support R&amp;D tax credits with precision and confidence.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">All Services</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/industries" className="text-gray-400 hover:text-white transition-colors">Industries</Link></li>
              <li><Link href="/estimator" className="text-gray-400 hover:text-white transition-colors">Credit Estimator</Link></li>
              <li><Link href="/eligibility" className="text-gray-400 hover:text-white transition-colors">Eligibility Assessment</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/cpa-partners" className="text-gray-400 hover:text-white transition-colors">CPA Partners</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-xs text-gray-500 leading-relaxed">
            &copy; {currentYear} Alexander &amp; Blake. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            This platform does not provide legal or tax advice. Please consult a qualified tax professional before making any tax-related decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
