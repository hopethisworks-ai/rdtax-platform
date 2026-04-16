import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Industries We Serve | CreditPath R&D Tax Credit",
  description:
    "R&D tax credits for manufacturing, software, engineering, biotech, food & beverage, and agriculture. CreditPath helps SC businesses in every industry claim their credits.",
};

export default function IndustriesPage() {
  const industries = [
    {
      name: "Software & Technology",
      activities: ["New software architecture", "Algorithm development", "AI/ML model training", "Security protocols", "Platform integrations"],
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    },
    {
      name: "Manufacturing",
      activities: ["New process development", "Product design iterations", "Materials testing", "Tooling and fixture design", "Quality improvements"],
      img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80",
    },
    {
      name: "Life Sciences & Biotech",
      activities: ["Drug discovery", "Clinical research support", "Formulation development", "Medical device design", "Regulatory testing"],
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
    },
    {
      name: "Engineering & Architecture",
      activities: ["Novel structural solutions", "Prototype development", "Environmental system design", "Custom fabrication", "Simulation & modeling"],
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    },
    {
      name: "Food & Beverage",
      activities: ["New product formulation", "Process efficiency", "Preservation techniques", "Packaging innovation", "Ingredient substitution"],
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    },
    {
      name: "Agriculture",
      activities: ["Crop yield improvement", "Pest management", "Equipment automation", "Irrigation optimization", "Genetic research"],
      img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
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
    <div className="bg-white">
      {/* Hero Section with background image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80"
            alt="Modern workspace"
            width={1400}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Industries We Serve
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            R&amp;D Happens Everywhere.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            You don&apos;t need a lab coat to qualify for the R&amp;D tax credit. If you&apos;re developing new or improved products, processes, or software, you likely qualify.
          </p>
        </div>
      </section>

      {/* Industry Cards Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={industry.img}
                    alt={industry.name}
                    width={600}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">{industry.name}</h3>
                  <ul className="space-y-2 mb-5">
                    {industry.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-600 text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center text-emerald-600 font-semibold text-sm hover:text-emerald-700 transition-colors">
                    Get assessed →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Qualifying Activities</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">What Counts as R&amp;D?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-slate-900 mb-5">New or Improved Products</h3>
              <ul className="space-y-3">
                {qualifications.products.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-slate-900 mb-5">New or Improved Processes</h3>
              <ul className="space-y-3">
                {qualifications.processes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Not Sure If You Qualify?</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Get a free assessment — we&apos;ll tell you in 30 minutes.
          </p>
          <Link href="/contact" className="inline-block bg-white text-emerald-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-slate-50 transition-colors shadow-lg">
            Get Free Assessment →
          </Link>
        </div>
      </section>
    </div>
  );
}
