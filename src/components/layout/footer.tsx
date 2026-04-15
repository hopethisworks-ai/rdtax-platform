import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-semibold text-white text-base">CreditPath</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Maximizing R&D tax credits for innovative companies through rigorous documentation and expert analysis.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-gray-400 hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-gray-400 hover:text-white transition-colors">
                  Free Estimator
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact?type=cpa" className="text-gray-400 hover:text-white transition-colors">
                  CPA Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 leading-relaxed">
            © {currentYear} CreditPath. All rights reserved.{" "}
            <span className="block mt-2">
              This platform does not provide legal or tax advice. Please consult a qualified tax professional before making any tax-related decisions.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
