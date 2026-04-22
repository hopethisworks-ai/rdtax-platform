export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6 md:mb-8">Privacy Policy</h1>
      <div className="prose prose-gray">
        <p className="text-gray-600 mb-4">Effective Date: January 1, 2025</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Information We Collect</h2>
        <p className="text-gray-600">We collect contact information you provide (name, email, company) and financial data you upload through the secure portal. All uploaded financial data is encrypted at rest and in transit.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">How We Use Your Information</h2>
        <p className="text-gray-600">Your information is used solely to provide R&D tax credit consulting services. We do not sell or share your data with third parties except as required to deliver services (e.g., secure storage, email delivery).</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Data Security</h2>
        <p className="text-gray-600">All data is encrypted at rest using AES-256. File access requires signed URLs that expire within 15 minutes. Role-based access controls ensure that client data is isolated from other clients.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Data Retention</h2>
        <p className="text-gray-600">Engagement records are retained for 7 years from the tax year of the engagement to support potential audit defense. You may request deletion of non-engagement data at any time.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Contact</h2>
        <p className="text-gray-600">For privacy inquiries, contact us through our contact form.</p>
      </div>
    </div>
  );
}
