import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Industries & Qualifying Activities | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "The R&D tax credit applies across industries — manufacturing, software, engineering, biotech, food & beverage, agriculture, and more. Alexander & Blake helps South Carolina businesses identify qualifying activities and prepare well-supported credit studies.",
};

export default function IndustriesPage() {
  const qualifyingActivities = [
    {
      category: "Product Development",
      examples: [
        "Designing new products or significantly improving existing ones",
        "Developing prototypes and testing performance",
        "Formulating new materials, compounds, or ingredients",
        "Integrating existing technologies in novel ways",
      ],
    },
    {
      category: "Process Innovation",
      examples: [
        "Developing new manufacturing or operational methods",
        "Automating production lines or internal workflows",
        "Improving quality control and testing methodologies",
        "Optimizing supply chain or logistics processes",
      ],
    },
    {
      category: "Software Development",
      examples: [
        "Building new software platforms or architectures",
        "Developing algorithms, AI/ML models, or data systems",
        "Creating custom integrations between systems",
        "Designing and implementing security protocols",
      ],
    },
    {
      category: "Engineering & Design",
      examples: [
        "Novel structural or mechanical solutions",
        "Simulation, modeling, and computational analysis",
        "Custom fabrication and tooling design",
        "Environmental system design and sustainability work",
      ],
    },
  ];

  const industries = [
    {
      name: "Manufacturing",
      desc: "Process development, tooling design, materials testing, product design iterations, and quality improvements.",
      img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80",
    },
    {
      name: "Software & Technology",
      desc: "New architectures, algorithm development, AI/ML training, platform integrations, and security protocols.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    },
    {
      name: "Life Sciences & Biotech",
      desc: "Drug discovery, clinical research support, formulation development, medical device design, and regulatory testing.",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
    },
    {
      name: "Engineering & Architecture",
      desc: "Novel structural solutions, prototype development, environmental system design, simulation, and custom fabrication.",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    },
    {
      name: "Food & Beverage",
      desc: "New product formulation, process efficiency, preservation techniques, packaging innovation, and ingredient substitution.",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    },
    {
      name: "Agriculture & Construction",
      desc: "Crop yield improvement, equipment automation, irrigation systems, new building methods, and environmental solutions.",
      img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
    },
  ];

  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Qualifying Activities & Industries</span>
          <h1 className="text-4xl md:text-5xl font-normal text-navy mt-4 mb-8 leading-tight">
            The R&amp;D tax credit applies more broadly than most businesses realize.
          </h1>
          <div className="space-y-5 text-body-text text-lg leading-relaxed">
            <p>
              The credit is not limited to laboratories and pharmaceuticals. Any business developing new or improved products, processes, or software may qualify — across manufacturing, technology, engineering, food production, and many other industries.
            </p>
            <p>
              What matters is not what industry you are in, but whether your team is engaged in activities that involve technical uncertainty, experimentation, and a process of evaluation. Below are the types of work that typically qualify.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUALIFYING ACTIVITIES — Lead with this
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">What Counts as R&amp;D</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">Qualifying Activities</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {qualifyingActivities.map((cat) => (
              <div key={cat.category} className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-navy mb-5">{cat.category}</h3>
                <ul className="space-y-3">
                  {cat.examples.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-body-text text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE FOUR-PART TEST
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">The IRS Standard</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-6 leading-tight">
            The Four-Part Test
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            The IRS evaluates qualifying activities using a four-part test. An activity must meet all four criteria to qualify for the R&amp;D tax credit:
          </p>
          <div className="space-y-6">
            {[
              { num: "1", title: "Permitted Purpose", desc: "The activity must be intended to develop a new or improved product, process, software, technique, formula, or invention." },
              { num: "2", title: "Technological in Nature", desc: "The activity must rely on principles of engineering, computer science, biological science, or physical science." },
              { num: "3", title: "Elimination of Uncertainty", desc: "There must be uncertainty regarding the capability, method, or design of the product or process at the outset of the activity." },
              { num: "4", title: "Process of Experimentation", desc: "The activity must involve evaluating alternatives through modeling, simulation, systematic trial and error, or other methods." },
            ].map((test) => (
              <div key={test.num} className="flex gap-4">
                <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black text-sm">{test.num}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-1">{test.title}</h3>
                  <p className="text-body-text text-sm leading-relaxed">{test.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INDUSTRIES — Show as examples, not lead
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Industries We Serve</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">Representative Industries</h2>
            <p className="text-secondary max-w-2xl mx-auto mt-3">
              We work with South Carolina businesses across these industries and others. If your company is engaged in technical development or process improvement, qualifying activities may exist.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group"
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
                  <h3 className="text-lg font-bold text-navy mb-2">{industry.name}</h3>
                  <p className="text-body-text text-sm leading-relaxed mb-4">{industry.desc}</p>
                  <Link href="/contact" className="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-dark transition-colors">
                    Discuss your activities →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">Not Sure If Your Activities Qualify?</h2>
          <p className="text-lg text-secondary mb-8">
            A brief consultation to evaluate your qualifying activities and outline what a well-supported engagement would look like.
          </p>
          <Link href="/contact" className="inline-block bg-primary text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-primary-dark transition-colors shadow-md">
            Schedule a Consultation →
          </Link>
        </div>
      </section>
    </div>
  );
}
