export default function IndustriesPage() {
  const industries = [
    {
      name: "Software & Technology",
      activities: ["New software architecture", "Algorithm development", "AI/ML model training infrastructure", "Security protocols", "Platform integration development"],
    },
    {
      name: "Manufacturing",
      activities: ["New process development", "Product design iterations", "Materials testing", "Tooling and fixture design", "Quality improvement processes"],
    },
    {
      name: "Life Sciences & Biotech",
      activities: ["Drug discovery", "Clinical research support", "Formulation development", "Medical device design", "Regulatory testing protocols"],
    },
    {
      name: "Engineering & Architecture",
      activities: ["Novel structural solutions", "Prototype development", "Environmental system design", "Custom fabrication methods", "Simulation and modeling"],
    },
    {
      name: "Food & Beverage",
      activities: ["New product formulation", "Process efficiency improvements", "Preservation techniques", "Packaging innovation", "Ingredient substitution testing"],
    },
    {
      name: "Agriculture",
      activities: ["Crop yield improvement", "Pest management formulation", "Equipment automation", "Irrigation system optimization", "Genetic research activities"],
    },
  ];

  const qualifications = {
    products: [
      "New product development or significant improvements",
      "Enhanced features or functionality",
      "Performance optimization efforts",
      "Integration of existing technologies in novel ways",
      "Quality and reliability improvements",
    ],
    processes: [
      "New manufacturing or operational methods",
      "Process efficiency and automation improvements",
      "Quality control and testing methodologies",
      "Supply chain or logistics optimization",
      "Environmental sustainability enhancements",
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
              Industries We Serve
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            R&D Happens Everywhere.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            You don't need a lab coat to qualify for the R&D tax credit. If you're developing new or improved products, processes, or software, you likely qualify.
          </p>
        </div>
      </section>

      {/* Industry Cards Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Industry indicator dot */}
                <div className="w-3 h-3 rounded-full bg-emerald-600 mb-4" />

                <h3 className="text-xl font-bold text-gray-900 mb-6">{industry.name}</h3>

                <ul className="space-y-3 mb-8">
                  {industry.activities.map((activity) => (
                    <li key={activity} className="flex items-start gap-3">
                      <span className="text-emerald-600 font-semibold flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="text-gray-700 text-sm">{activity}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Learn more
                  <span className="ml-2">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Products Column */}
            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-l-emerald-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                New or Improved Products
              </h3>
              <ul className="space-y-4">
                {qualifications.products.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Processes Column */}
            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-l-emerald-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                New or Improved Processes
              </h3>
              <ul className="space-y-4">
                {qualifications.processes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Not Sure If You Qualify?
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            Get a free assessment — we'll tell you in 30 minutes
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-emerald-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Get Free Assessment
          </a>
        </div>
      </section>
    </>
  );
}
