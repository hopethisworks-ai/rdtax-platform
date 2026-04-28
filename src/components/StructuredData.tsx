export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rdtax-platform.vercel.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Alexander & Blake",
    description:
      "Specialist R&D tax credit advisory firm helping innovative South Carolina businesses identify qualifying R&D activities, prepare structured credit studies, and coordinate CPA-ready filing support.",
    url: siteUrl,
    areaServed: {
      "@type": "State",
      name: "South Carolina",
      sameAs: "https://en.wikipedia.org/wiki/South_Carolina",
    },
    serviceType: [
      "R&D Tax Credit Advisory",
      "Federal R&D Tax Credit Studies",
      "South Carolina State R&D Tax Credits",
      "Amended Return Preparation",
      "Payroll Tax Offset",
      "Examination Support",
    ],
    knowsAbout: [
      "IRC Section 41",
      "R&D Tax Credits",
      "Qualified Research Expenses",
      "Four-Part Test",
      "Alternative Simplified Credit",
      "PATH Act",
      "Form 6765",
      "Business Component Analysis",
      "Project Narratives",
      "QRE Calculations",
    ],
    priceRange: "Contingency-based",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the R&D tax credit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The R&D tax credit (IRC Section 41) is a federal tax incentive that rewards businesses for investing in innovation — including developing new products, improving processes, building software, and solving technical challenges. South Carolina also offers an additional state R&D credit.",
        },
      },
      {
        "@type": "Question",
        name: "What activities qualify for the R&D tax credit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Any activity that involves developing new or improved products, processes, software, techniques, formulas, or inventions may qualify. The IRS evaluates qualification using a four-part test: permitted purpose, technological in nature, elimination of uncertainty, and process of experimentation. Qualifying industries include manufacturing, software, construction, engineering, life sciences, and food and beverage.",
        },
      },
      {
        "@type": "Question",
        name: "Does my business qualify for R&D tax credits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If your business develops or improves products, processes, software, or techniques, and faces technical uncertainty in doing so, you may qualify. The credit applies across many industries — not just high-tech or pharmaceutical companies. Alexander & Blake offers a free eligibility assessment to help determine qualification.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Alexander & Blake charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alexander & Blake works on a contingency basis. There are no upfront retainers, hourly fees, or deposits. Our fee is based on a percentage of credits identified and is paid only after filing. If no qualifying credits are identified, there is no charge.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the R&D tax credit study process take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "From initial consultation to completed credit study typically takes approximately 60 days. The complimentary assessment takes about 30 minutes. Data collection is managed through a secure portal and is designed to require minimal time from your team.",
        },
      },
      {
        "@type": "Question",
        name: "What documentation is required for an R&D tax credit study?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We typically work with payroll records, contractor invoices, project descriptions, and general ledger data. Our secure portal provides a guided checklist, and our team manages the organization and analysis of all materials. Sensitive records are requested only after initial eligibility is established.",
        },
      },
      {
        "@type": "Question",
        name: "Does Alexander & Blake work with CPA firms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. CPA coordination is a core part of our process. We serve as a dedicated specialty resource — preparing complete credit studies with Form 6765 support and filing-ready documentation. The CPA maintains the client relationship and reviews the filing posture. We never solicit CPA clients for other services.",
        },
      },
      {
        "@type": "Question",
        name: "What states does Alexander & Blake serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alexander & Blake focuses on South Carolina, where an additional 5% state R&D credit can be coordinated alongside the federal benefit. Our understanding of SC industries, regulations, and the local business landscape allows us to provide more focused and relevant support.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if I am audited after claiming the R&D tax credit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every Alexander & Blake credit study includes ongoing examination support at no additional cost. This includes documentation support, correspondence support, technical documentation support, and resolution support. We support your CPA or authorized representative with workpapers, narratives, schedules, response support, and technical documentation related to the study we prepared.",
        },
      },
      {
        "@type": "Question",
        name: "Can I claim R&D credits for prior tax years?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Up to three years of open tax returns may be eligible for amended filing, allowing you to recover credits from prior years. Alexander & Blake handles the amended return process including technical interviews, QRE analysis, and coordination with your CPA.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
