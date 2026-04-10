import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-white">CreditPath R&D</span>
            </div>
            <p className="text-sm text-gray-400">Maximizing R&D tax credits for innovative companies through rigorous documentation and expert analysis.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/industries" className="hover:text-white">Industries Served</Link></li>
              <li><Link href="/estimator" className="hover:text-white">Free Estimator</Link></li>
              <li><Link href="/contact" className="hover:text-white">Book Consultation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CreditPath R&D. All rights reserved. This platform does not provide legal or tax advice. Consult a qualified tax professional.</p>
        </div>
      </div>
    </footer>
  );
}
