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
        <h2 className="text-xl font-bold mt-8 mb-3">Third-Party Service Providers</h2>
        <p className="text-gray-600">Alexander &amp; Blake may use third-party service providers for hosting, email delivery, file storage, and analytics. All providers are evaluated for security and data handling practices.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Data Storage Location</h2>
        <p className="text-gray-600">All engagement data is stored on servers located in the United States.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Data Security</h2>
        <p className="text-gray-600">All data is encrypted at rest using AES-256. File access requires signed URLs that expire within 15 minutes. Role-based access controls ensure that client data is isolated from other clients.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Data Retention</h2>
        <p className="text-gray-600">Engagement records are retained for 7 years from the tax year of the engagement to support potential audit defense. You may request deletion of non-engagement data at any time.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Data Deletion Requests</h2>
        <p className="text-gray-600">Clients may request deletion of their data by contacting <a href="mailto:partnerships@alexanderandblake.com" className="text-primary hover:underline">partnerships@alexanderandblake.com</a>. Engagement records required for audit defense may be retained for the applicable retention period.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Engagement Records vs. Contact Records</h2>
        <p className="text-gray-600">Contact form submissions and estimator results are retained as lead records. Engagement records — including financial data, project documentation, and study materials — are subject to the 7-year retention policy.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Incident Response</h2>
        <p className="text-gray-600">In the event of a data security incident, affected parties will be notified promptly with details of the incident and remediation steps taken.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Cookies &amp; Analytics</h2>
        <p className="text-gray-600">This site may use analytics tools to understand site usage. No personally identifiable information is shared with advertising platforms.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Email Communications</h2>
        <p className="text-gray-600">By submitting a contact form or requesting a consultation, you may receive follow-up communications related to your inquiry. You may opt out at any time by contacting <a href="mailto:partnerships@alexanderandblake.com" className="text-primary hover:underline">partnerships@alexanderandblake.com</a>.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Contact</h2>
        <p className="text-gray-600">For privacy inquiries, contact us at <a href="mailto:partnerships@alexanderandblake.com" className="text-primary hover:underline">partnerships@alexanderandblake.com</a>.</p>
      </div>
    </div>
  );
}
