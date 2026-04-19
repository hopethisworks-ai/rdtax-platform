export default function LogoPreviewPage() {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-normal text-navy mb-2">Logo Options</h1>
        <p className="text-secondary mb-12">Three variants for Alexander &amp; Blake. All use navy (#102A43) and teal (#2C7A7B).</p>

        {/* Option 1: Monogram */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-4">1. Monogram Mark</h2>
          <div className="bg-surface rounded-2xl p-10 border border-gray-200 flex items-center gap-10 flex-wrap">
            {[80, 48, 32].map((size) => (
              <div key={size} className="text-center">
                <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="120" rx="24" fill="#102A43"/>
                  <clipPath id={`mc${size}`}><rect width="120" height="120" rx="24"/></clipPath>
                  <rect x="0" y="108" width="120" height="12" fill="#2C7A7B" clipPath={`url(#mc${size})`}/>
                  <text x="28" y="82" fontFamily="Georgia, serif" fontSize="58" fontWeight="400" fill="white" letterSpacing="-2">A</text>
                  <text x="62" y="82" fontFamily="Georgia, serif" fontSize="58" fontWeight="400" fill="#2C7A7B" letterSpacing="-2">B</text>
                </svg>
                <div className="text-secondary text-xs mt-2">{size}px</div>
              </div>
            ))}
          </div>
        </div>

        {/* Option 2: Full Logo (light bg) */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-4">2. Full Logo (Light Backgrounds)</h2>
          <div className="bg-surface rounded-2xl p-10 border border-gray-200">
            <svg width="360" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="10" y="6" fill="#102A43"/>
              <clipPath id="fc1"><rect width="48" height="48" rx="10" y="6"/></clipPath>
              <rect x="0" y="46" width="48" height="8" fill="#2C7A7B" clipPath="url(#fc1)"/>
              <text x="8" y="42" fontFamily="Georgia, serif" fontSize="28" fontWeight="400" fill="white" letterSpacing="-1">A</text>
              <text x="24.5" y="42" fontFamily="Georgia, serif" fontSize="28" fontWeight="400" fill="#2C7A7B" letterSpacing="-1">B</text>
              <text x="62" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="#102A43" letterSpacing="0.5">Alexander</text>
              <text x="197" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="#486581" letterSpacing="0.5">&amp;</text>
              <text x="218" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="#102A43" letterSpacing="0.5">Blake</text>
              <text x="62" y="48" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="500" fill="#486581" letterSpacing="2.5">R&amp;D TAX CREDIT ADVISORY</text>
            </svg>
            <div className="text-secondary text-xs mt-4">Navbar / header usage</div>
          </div>
        </div>

        {/* Option 3: Full Logo (dark bg) */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-4">3. Full Logo (Dark Backgrounds)</h2>
          <div className="bg-navy rounded-2xl p-10">
            <svg width="360" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="10" y="6" fill="#2C7A7B"/>
              <text x="8" y="42" fontFamily="Georgia, serif" fontSize="28" fontWeight="400" fill="white" letterSpacing="-1">A</text>
              <text x="24.5" y="42" fontFamily="Georgia, serif" fontSize="28" fontWeight="400" fill="rgba(255,255,255,0.7)" letterSpacing="-1">B</text>
              <text x="62" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="white" letterSpacing="0.5">Alexander</text>
              <text x="197" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="rgba(255,255,255,0.6)" letterSpacing="0.5">&amp;</text>
              <text x="218" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="white" letterSpacing="0.5">Blake</text>
              <text x="62" y="48" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="500" fill="rgba(255,255,255,0.5)" letterSpacing="2.5">R&amp;D TAX CREDIT ADVISORY</text>
            </svg>
            <div className="text-gray-500 text-xs mt-4">Footer / dark section usage</div>
          </div>
        </div>

        {/* Option 4: Minimal wordmark */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-4">4. Minimal Wordmark (No Icon)</h2>
          <div className="bg-surface rounded-2xl p-10 border border-gray-200">
            <svg width="340" height="44" viewBox="0 0 340 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" fill="#102A43" letterSpacing="0.5">Alexander</text>
              <text x="140" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" fill="#2C7A7B" letterSpacing="0.5">&amp;</text>
              <text x="164" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" fill="#102A43" letterSpacing="0.5">Blake</text>
            </svg>
            <div className="text-secondary text-xs mt-4">Clean wordmark — ampersand in teal as the accent</div>
          </div>
          <div className="bg-navy rounded-2xl p-10 mt-4">
            <svg width="340" height="44" viewBox="0 0 340 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" fill="white" letterSpacing="0.5">Alexander</text>
              <text x="140" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" fill="#2C7A7B" letterSpacing="0.5">&amp;</text>
              <text x="164" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" fill="white" letterSpacing="0.5">Blake</text>
            </svg>
            <div className="text-gray-500 text-xs mt-4">Same wordmark on dark</div>
          </div>
        </div>

      </div>
    </div>
  );
}
