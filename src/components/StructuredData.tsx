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
      "Audit Support",
    ],
    knowsAbout: [
      "IRC Section 41",
      "R&D Tax Credits",
      "Qualified Research Expenses",
      "Four-Part Test",
      "Alternative Simplified Credit",
      "PATH Act",
      "Form 6765",
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
          text: "The R&D tax credit (IRC Section 41) is a federal tax incentive that rewards businesses for investing in innovation — including developing new products, improving processes, building software, and solving technical challenges.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Alexander & Blake charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alexander & Blake typically works on a contingency basis. There is no upfront retainer — our fee is based on a percentage of credits identified, paid after filing.",
        },
      },
      {
        "@type": "Question",
        name: "Does my business qualify for R&D tax credits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If your business develops or improves products, processes, software, or techniques, and faces technical uncertainty in doing so, you may qualify. The credit applies across many industries including manufacturing, software, construction, and engineering.",
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
