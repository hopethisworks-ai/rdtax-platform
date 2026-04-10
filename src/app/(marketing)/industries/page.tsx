export default function IndustriesPage() {
  const industries = [
    { name: "Software & Technology", activities: ["New software architecture", "Algorithm development", "AI/ML model training infrastructure", "Security protocols", "Platform integration development"] },
    { name: "Manufacturing", activities: ["New process development", "Product design iterations", "Materials testing", "Tooling and fixture design", "Quality improvement processes"] },
    { name: "Life Sciences & Biotech", activities: ["Drug discovery", "Clinical research support", "Formulation development", "Medical device design", "Regulatory testing protocols"] },
    { name: "Engineering & Architecture", activities: ["Novel structural solutions", "Prototype development", "Environmental system design", "Custom fabrication methods", "Simulation and modeling"] },
    { name: "Food & Beverage", activities: ["New product formulation", "Process efficiency improvements", "Preservation techniques", "Packaging innovation", "Ingredient substitution testing"] },
    { name: "Agriculture", activities: ["Crop yield improvement", "Pest management formulation", "Equipment automation", "Irrigation system optimization", "Genetic research activities"] },
  ];

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h1>
          <p className="text-xl text-gray-600">R&D credits are available across many industries—not just biotech and software.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind) => (
            <div key={ind.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{ind.name}</h3>
              <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Qualifying Activities</p>
              <ul className="space-y-2">
                {ind.activities.map((act) => (
                  <li key={act} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    {act}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
