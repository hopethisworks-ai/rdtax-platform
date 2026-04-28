import Link from "next/link";

export const metadata = {
  title: "Data Security & Confidentiality | Alexander & Blake",
  description:
    "How Alexander & Blake protects client data — encryption, secure portal, access controls, retention policy, and confidentiality commitment.",
};

const ShieldIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
  </svg>
);

export default function DataSecurityPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Data Security &amp; Confidentiality</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-navy mt-4 mb-8 leading-tight">
            How we protect your data.
          </h1>
          <p className="text-body-text text-lg leading-relaxed">
            R&amp;D credit engagements involve sensitive financial and operational records. Alexander &amp; Blake maintains security controls, access policies, and confidentiality commitments designed to protect client information throughout the engagement lifecycle.
          </p>
        </div>
      </section>

      {/* WHAT DATA WE REQUEST */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Data Collection</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            What data we request.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            The following types of records are typically requested during an engagement to support credit qualification and QRE analysis.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Payroll reports and employee records",
              "General ledger detail",
              "Contractor invoices and agreements",
              "Project records and technical documentation",
              "Prior-year R&D credit records",
              "Tax filing support materials",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                <ShieldIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-text text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHEN WE REQUEST SENSITIVE RECORDS */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Timing</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            When we request sensitive records.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Sensitive records are requested only after an initial fit has been established and the engagement scope has been defined. The initial consultation requires no sensitive documents — we start with a general discussion of your business activities and R&amp;D posture before any records are exchanged.
          </p>
        </div>
      </section>

      {/* SECURE FILE EXCHANGE */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">File Exchange</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Secure file exchange.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Sensitive records are exchanged through a secure portal with encryption protections throughout the transfer and storage process.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Encryption in Transit", desc: "All file transfers are encrypted using TLS to protect data during transmission." },
              { title: "Encryption at Rest", desc: "Uploaded files are encrypted at rest using industry-standard encryption protocols." },
              { title: "Expiring Access", desc: "Signed URLs used for file access expire within 15 minutes to limit exposure." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS CONTROLS */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Access Controls</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Access controls.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Client data is protected through layered access controls designed to limit exposure to authorized personnel only.
          </p>
          <div className="space-y-4">
            {[
              { title: "Role-Based Access", desc: "Access to client records is restricted based on team role and engagement assignment." },
              { title: "Client Data Isolation", desc: "Each client's data is logically isolated from other engagements to prevent cross-access." },
              { title: "Engagement-Level Permissions", desc: "Permissions are scoped to the specific engagement, limiting access to only the records relevant to that study." },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-primary/30 pl-6 py-1">
                <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RETENTION */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Retention</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Data retention policy.
          </h2>
          <p className="text-body-text leading-relaxed">
            Engagement records are retained for 7 years to support ongoing examination support. This retention period aligns with the IRS statute of limitations for credit claims. Certain non-engagement records may be deleted upon request. Engagement records needed for examination support, legal compliance, or contractual obligations may be retained for the applicable retention period.
          </p>
        </div>
      </section>

      {/* CONFIDENTIALITY COMMITMENT */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Confidentiality</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Confidentiality commitment.
          </h2>
          <p className="text-body-text leading-relaxed">
            Engagement details and financial records are not disclosed without written consent, except as required to deliver services or as required by law. This commitment extends to all team members involved in the engagement and survives the conclusion of the engagement relationship.
          </p>
        </div>
      </section>

      {/* INCIDENT RESPONSE */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Incident Response</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Incident response.
          </h2>
          <p className="text-body-text leading-relaxed">
            In the event of a security concern, affected clients are notified promptly with details of the issue and remediation steps taken. Our response process prioritizes transparency, containment, and resolution.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Contact</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Privacy inquiries.
          </h2>
          <p className="text-body-text leading-relaxed mb-2">
            For questions about data handling, security practices, or confidentiality commitments, contact us at:
          </p>
          <p className="text-primary font-semibold">
            <a href="mailto:partnerships@alexanderandblake.com" className="hover:underline">
              partnerships@alexanderandblake.com
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">Questions About Our Security Practices?</h2>
          <p className="text-lg text-secondary mb-10">
            Schedule a consultation to learn more about how we protect client data throughout the engagement process.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-primary-dark transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
