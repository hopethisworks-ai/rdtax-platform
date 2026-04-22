export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6 md:mb-8">Terms of Service</h1>
      <div className="prose prose-gray">
        <p className="text-gray-600 mb-4">Effective Date: January 1, 2025</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-medium text-sm">Important: This platform provides R&D tax credit consulting services, not legal or tax advice. All credit determinations must be reviewed by your qualified tax counsel before filing.</p>
        </div>
        <h2 className="text-xl font-bold mt-8 mb-3">Services</h2>
        <p className="text-gray-600">We provide R&D tax credit identification, documentation, and reporting services. Our deliverables are designed to assist your tax counsel in preparing or amending tax returns.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">No Tax or Legal Advice</h2>
        <p className="text-gray-600">Nothing in our reports, calculations, or communications constitutes tax advice or legal advice. You are responsible for filing decisions. We are not a CPA firm or law firm.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Confidentiality</h2>
        <p className="text-gray-600">We maintain strict confidentiality of all client financial data and engagement details. We will not disclose engagement details without your written consent except as required by law.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Limitation of Liability</h2>
        <p className="text-gray-600">Our liability is limited to fees paid for the specific engagement. We are not liable for tax assessments, penalties, or interest resulting from IRS examination of credits we document.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Governing Law</h2>
        <p className="text-gray-600">These terms are governed by the laws of the State of South Carolina.</p>
      </div>
    </div>
  );
}
