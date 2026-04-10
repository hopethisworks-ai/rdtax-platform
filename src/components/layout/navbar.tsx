"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="font-bold text-lg text-gray-900">CreditPath R&D</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">How It Works</Link>
            <Link href="/industries" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Industries</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Contact</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/estimator" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Free Estimate
            </Link>
            {session ? (
              <Link href="/portal" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Portal
              </Link>
            ) : (
              <Link href="/login" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Sign In
              </Link>
            )}
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-gray-200 flex flex-col gap-4">
            <Link href="/how-it-works" className="text-gray-600 text-sm font-medium">How It Works</Link>
            <Link href="/industries" className="text-gray-600 text-sm font-medium">Industries</Link>
            <Link href="/about" className="text-gray-600 text-sm font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 text-sm font-medium">Contact</Link>
            <Link href="/estimator" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium text-center">Get Free Estimate</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
