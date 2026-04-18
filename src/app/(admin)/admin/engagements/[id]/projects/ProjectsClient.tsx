"use client";
import { useState } from "react";

const BC = ["Product","Process","Software","Formula","Technique","Invention"];

interface Emp { id:string; name:string; title?:string|null; compensation:number; qualifiedActivityPct:number; projectId?:string|null; qreAmount?:number|null; methodologyBasis?:string|null; supportSource?:string|null; }
interface Supply { id:string; description:string; amount:number; qualified:boolean; projectId?:string|null; }
interface Contractor { id:string; vendorName:string; amount:number; qualifiedAmount?:number|null; projectId?:string|null; fundedResearchFlag:boolean; substantialRightsRetained?:boolean|null; successContingentPayment?:boolean|null; economicRiskBorne?:boolean|null; arrangedBeforeWork?:boolean|null; performedOnBehalf?:boolean|null; contractReviewNotes?:string|null; qualifiedFlag?:boolean; }
interface Project {
  id:string; name:string; businessComponent?:string|null; qualified:boolean;
  permittedPurpose?:boolean|null; technologicalInformation?:boolean|null;
  processOfExperimentation?:boolean|null; qualifiedResearch?:boolean|null;
  uncertaintyNarrative?:string|null; alternativesConsidered?:string|null;
  experimentationNarrative?:string|null; internalUseSoftware:boolean; fundedResearch:boolean;
  iusInnovative?:boolean|null; iusSignificantEconomicRisk?:boolean|null; iusNotCommerciallyAvailable?:boolean|null;
  employees:Emp[]; supplies:Supply[]; contractors:Contractor[];
  parentProjectId?:string|null; shrinkBackApplied:boolean; shrinkBackNarrative?:string|null;
}

export default function ProjectsClient({ engagementId, initialProjects }:{ engagementId:string; initialProjects:Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects ?? []);
  const [selected, setSelected] = useState<Project|null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBC, setNewBC] = useState("");
  const [saving, setSaving] = useState(false);
  const [allEmps, setAllEmps] = useState<Emp[]>([]);
  const [allContractors, setAllContractors] = useState<Contractor[]>([]);
  const [allSupplies, setAllSupplies] = useState<Supply[]>([]);
  const [loadingEmps, setLoadingEmps] = useState(false);
  const [fairchildCon, setFairchildCon] = useState<Contractor|null>(null);
  const [cohanEmp, setCohanEmp] = useState<string|null>(null);
  const [showShrinkBack, setShowShrinkBack] = useState(false);
  const [shrinkBackName, setShrinkBackName] = useState("");
  const [shrinkBackNarrative, setShrinkBackNarrative] = useState("");

  async function loadResources() {
    if (allEmps.length > 0) return;
    setLoadingEmps(true);
    const res = await fetch("/api/engagements/" + engagementId + "/resources");
    if (res.ok) {
      const data = await res.json();
      setAllEmps(data.employees ?? []);
      setAllContractors(data.contractors ?? []);
      setAllSupplies(data.supplies ?? []);
    }
    setLoadingEmps(false);
  }

  async function assignEmployee(empId:string, projectId:string|null, pct:number) {
    const res = await fetch("/api/employees/" + empId, {
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ projectId, qualifiedActivityPct: pct }),
    });
    if (res.ok) {
      const updated = await res.json();
      setAllEmps(prev => prev.map(e => e.id===empId ? {...e,...updated} : e));
      const updEmp: Emp = { id:updated.id, name:updated.name, compensation: Number(updated.compensation ?? 0), qreAmount:Number(updated.qreAmount ?? 0), qualifiedActivityPct:Number(updated.qualifiedActivityPct ?? 0) };
      if (selected) {
        if (projectId === selected.id) {
          setSelected(prev => prev ? {...prev, employees:[...prev.employees.filter(e=>e.id!==empId), updEmp]} : prev);
        } else {
          setSelected(prev => prev ? {...prev, employees:prev.employees.filter(e=>e.id!==empId)} : prev);
        }
      }
    }
  }

  async function updateContractor(id:string, data:Record<string,unknown>) {
    const res = await fetch("/api/contractors/" + id, {
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setAllContractors(prev => prev.map(c => c.id===id ? {...c,...updated} : c));
      setFairchildCon(prev => prev && prev.id===id ? {...prev,...updated} : prev);
    }
  }

  async function addProject() {
    if (!newName.trim()) return;
    setSaving(true);
    const res = await fetch("/api/projects", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ engagementId, name:newName, businessComponent:newBC }),
    });
    if (res.ok) {
      const p = await res.json();
      setProjects(prev => [...prev, {...p, employees:[], supplies:[], contractors:[], shrinkBackApplied:false}]);
      setNewName(""); setNewBC(""); setShowAdd(false);
    }
    setSaving(false);
  }

  async function applyShrinkBack() {
    if (!selected || !shrinkBackName.trim()) return;
    await updateProject(selected.id, { shrinkBackApplied: true, shrinkBackNarrative });
    const res = await fetch("/api/projects", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ engagementId, name: shrinkBackName, businessComponent: selected.businessComponent, parentProjectId: selected.id }),
    });
    if (res.ok) {
      const p = await res.json();
      setProjects(prev => [...prev, {...p, employees:[], supplies:[], contractors:[], shrinkBackApplied:false}]);
      setShrinkBackName(""); setShrinkBackNarrative(""); setShowShrinkBack(false);
    }
  }

  async function updateProject(id:string, data:Partial<Project>) {
    const res = await fetch("/api/projects/" + id, {
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setProjects(prev => prev.map(p => p.id===id ? {...p,...updated} : p));
      setSelected(prev => prev && prev.id===id ? {...prev,...updated} : prev);
    }
  }

  async function deleteProject(id:string) {
    if (!confirm("Delete this business component?")) return;
    await fetch("/api/projects/" + id, { method:"DELETE" });
    setProjects(prev => prev.filter(p => p.id!==id));
    if (selected && selected.id===id) setSelected(null);
  }

  const wageQre = selected ? selected.employees.reduce((s,e)=>s+Number(e.qreAmount??0),0) : 0;
  const supplyQre = selected ? selected.supplies.filter(s=>s.qualified).reduce((s,i)=>s+Number(i.amount??0),0) : 0;
  const contractorQre = selected ? selected.contractors.reduce((s,c)=>s+Number(c.qualifiedAmount??0),0) : 0;
  const totalQre = wageQre + supplyQre + contractorQre;
  const passCount = selected ? [selected.permittedPurpose,selected.technologicalInformation,selected.processOfExperimentation,selected.qualifiedResearch].filter(Boolean).length : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-navy text-sm">Components ({projects.length})</h2>
              <button onClick={()=>setShowAdd(true)} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg">+ Add</button>
            </div>
            {showAdd && (
              <div className="p-4 bg-blue-50 border-b border-gray-200">
                <input value={newName} onChange={e=>{setNewName(e.target.value)}} placeholder="Component name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2" />
                <select value={newBC} onChange={e=>{setNewBC(e.target.value)}} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 text-secondary">
                  <option value="">Select type</option>
                  {BC.map(bc=><option key={bc}>{bc}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={addProject} disabled={saving} className="flex-1 bg-blue-600 text-white text-xs py-2 rounded-lg disabled:opacity-50">Save</button>
                  <button onClick={()=>setShowAdd(false)} className="flex-1 bg-white border border-gray-200 text-body-text text-xs py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            )}
            <div className="divide-y divide-gray-100">
              {projects.length===0 && <div className="p-6 text-center text-gray-400 text-sm">No components yet.</div>}
              {projects.map(p=>(
                <div key={p.id} onClick={()=>setSelected(p)} className={"px-4 py-3 cursor-pointer hover:bg-surface "+(selected && selected.id===p.id?"bg-blue-50 border-l-4 border-blue-600":"")}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-navy text-sm">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.businessComponent??"No type"}</p>
                    </div>
                    <span className={"text-xs px-2 py-0.5 rounded-full font-medium "+(p.qualified?"bg-green-100 text-green-700":p.fundedResearch?"bg-red-100 text-red-700":"bg-gray-100 text-secondary")}>
                      {p.fundedResearch?"Excluded":p.qualified?"Qualified":"Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          {!selected ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-400">Select a component to view details</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-navy text-lg">{selected.name}</h2>
                    <p className="text-gray-400 text-sm">{selected.businessComponent??"Type not set"}</p>
                  </div>
                  <button onClick={()=>deleteProject(selected.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-surface rounded-lg p-3"><div className="text-xs text-secondary mb-1">Total QRE</div><div className="font-black text-navy">${totalQre.toLocaleString()}</div></div>
                  <div className="bg-surface rounded-lg p-3"><div className="text-xs text-secondary mb-1">Four-Part Test</div><div className="font-black text-navy">{passCount}/4 passed</div></div>
                  <div className="bg-surface rounded-lg p-3"><div className="text-xs text-secondary mb-1">Wage QRE</div><div className="font-bold text-navy">${wageQre.toLocaleString()}</div></div>
                  <div className="bg-surface rounded-lg p-3"><div className="text-xs text-secondary mb-1">Contractor QRE</div><div className="font-bold text-navy">${contractorQre.toLocaleString()}</div></div>
                </div>
                <div className="space-y-2">
                  <div className="py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-body-text">Internal Use Software</span>
                      <button onClick={()=>updateProject(selected.id,{internalUseSoftware:!selected.internalUseSoftware})} className={"text-xs px-3 py-1 rounded-full font-medium "+(selected.internalUseSoftware?"bg-surface text-primary":"bg-gray-100 text-secondary")}>
                        {selected.internalUseSoftware?"Yes -- HToI applies":"No"}
                      </button>
                    </div>
                    {selected.internalUseSoftware && (
                      <div className="bg-surface border border-primary/20 rounded-lg p-3 mt-2">
                        <p className="text-xs font-semibold text-primary mb-1">Higher Threshold of Innovation Test (Tax and Accounting Software Corp, 2002)</p>
                        <p className="text-xs text-primary mb-3">All three prongs must be satisfied for IUS to qualify under IRC 41(d)(4)(E).</p>
                        {([
                          {key:"iusInnovative", label:"1. Innovative", desc:"Software would result in meaningful reduction in cost or improvement in speed that is substantial and economically significant"},
                          {key:"iusSignificantEconomicRisk", label:"2. Significant Economic Risk", desc:"Development involves substantial uncertainty as to whether adequate return on investment will be realized"},
                          {key:"iusNotCommerciallyAvailable", label:"3. Not Commercially Available", desc:"Software is not commercially available for use by the taxpayer without significant modification"},
                        ] as {key:string;label:string;desc:string}[]).map(({key,label,desc})=>{
                          const val = selected[key as keyof Project] as boolean|null;
                          return (
                            <div key={key} className="flex items-start justify-between gap-3 py-2 border-b border-primary/20 last:border-0">
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-primary">{label}</p>
                                <p className="text-xs text-primary mt-0.5">{desc}</p>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <button onClick={()=>updateProject(selected.id,{[key]:true})} className={"text-xs px-2 py-1 rounded font-medium "+(val===true?"bg-green-600 text-white":"bg-white text-secondary border border-gray-200")}>Yes</button>
                                <button onClick={()=>updateProject(selected.id,{[key]:false})} className={"text-xs px-2 py-1 rounded font-medium "+(val===false?"bg-red-600 text-white":"bg-white text-secondary border border-gray-200")}>No</button>
                              </div>
                            </div>
                          );
                        })}
                        <div className={"mt-2 text-xs font-semibold px-2 py-1 rounded text-center "+(selected.iusInnovative&&selected.iusSignificantEconomicRisk&&selected.iusNotCommerciallyAvailable?"bg-green-100 text-green-700":"bg-red-50 text-red-600")}>
                          {selected.iusInnovative&&selected.iusSignificantEconomicRisk&&selected.iusNotCommerciallyAvailable?"HToI Satisfied -- IUS Qualifies":"HToI Not Satisfied -- IUS Excluded"}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-body-text">Funded Research</span>
                      <button onClick={()=>updateProject(selected.id,{fundedResearch:!selected.fundedResearch})} className={"text-xs px-3 py-1 rounded-full font-medium "+(selected.fundedResearch?"bg-red-100 text-red-700":"bg-gray-100 text-secondary")}>
                        {selected.fundedResearch?"Yes -- Excluded":"No"}
                      </button>
                    </div>
                    {selected.fundedResearch && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-1">
                        <p className="text-xs font-semibold text-red-800 mb-1">Funded Research Exclusion -- IRC 41(d)(4)(H)</p>
                        <p className="text-xs text-red-700 mb-2">Research funded by another person is excluded from QREs. All associated wages, supplies, and contractor costs will be excluded from the credit calculation.</p>
                        <p className="text-xs text-red-600 font-semibold">Relevant authority:</p>
                        <ul className="text-xs text-red-600 mt-1 space-y-0.5 list-disc list-inside">
                          <li>Fairchild Industries v. US (Fed. Cl. 1994, Appeals 1996)</li>
                          <li>Lockheed Martin v. US (Appeals 2000)</li>
                          <li>GeoSyntec v. US (2013, 2015)</li>
                          <li>Dynetics v. US (2015)</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-navy mb-4">Four-Part Test</h3>
                <div className="space-y-3">
                  {([
                    {key:"permittedPurpose", label:"Permitted Purpose", desc:"Intended to develop new or improve existing functionality, performance, reliability, or quality"},
                    {key:"technologicalInformation", label:"Technological in Nature", desc:"Fundamentally relies on hard science, engineering, or computer science (Research Inc., 1995)"},
                    {key:"processOfExperimentation", label:"Process of Experimentation", desc:"Systematic process evaluating alternatives -- trial and error qualifies (Eustace v. Comm., 2001)"},
                    {key:"qualifiedResearch", label:"Elimination of Uncertainty", desc:"Intended to discover information to eliminate uncertainty. No discovery test required post-1986 (US v. McFerrin, 2009)"},
                  ] as {key:string;label:string;desc:string}[]).map(({key,label,desc})=>{
                    const val = selected[key as keyof Project] as boolean|null;
                    return (
                      <div key={key} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-navy text-sm">{label}</p>
                          <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={()=>updateProject(selected.id,{[key]:true})} className={"text-xs px-3 py-1.5 rounded-lg font-medium "+(val===true?"bg-green-600 text-white":"bg-gray-100 text-secondary")}>Pass</button>
                          <button onClick={()=>updateProject(selected.id,{[key]:false})} className={"text-xs px-3 py-1.5 rounded-lg font-medium "+(val===false?"bg-red-600 text-white":"bg-gray-100 text-secondary")}>Fail</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={()=>updateProject(selected.id,{qualified:passCount===4&&!selected.fundedResearch})} className="w-full mt-4 bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-blue-700">
                  Update Qualification Status
                </button>
                {passCount < 4 && !selected.fundedResearch && (
                  <div className="mt-4 bg-surface border border-primary/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-primary mb-1">Shrink-Back Rule (United Stationers, 1999 / Trinity Industries, 2010)</p>
                    <p className="text-xs text-primary mb-3">This component failed the four-part test. Consider whether a more specific sub-component qualifies. The shrink-back rule requires narrowing to the most specific level that passes the four-part test.</p>
                    {!showShrinkBack ? (
                      <button onClick={()=>setShowShrinkBack(true)} className="w-full bg-primary text-white font-semibold py-2 rounded-lg text-xs">Apply Shrink-Back -- Create Sub-Component</button>
                    ) : (
                      <div className="space-y-2">
                        <input value={shrinkBackName} onChange={e=>{setShrinkBackName(e.target.value)}} placeholder="Sub-component name" className="w-full border border-primary/30 rounded-lg px-3 py-2 text-xs" />
                        <textarea value={shrinkBackNarrative} onChange={e=>{setShrinkBackNarrative(e.target.value)}} placeholder="Why does shrink-back apply?" rows={2} className="w-full border border-primary/30 rounded-lg px-3 py-2 text-xs resize-none" />
                        <div className="flex gap-2">
                          <button onClick={applyShrinkBack} className="flex-1 bg-primary text-white font-semibold py-2 rounded-lg text-xs">Create Sub-Component</button>
                          <button onClick={()=>setShowShrinkBack(false)} className="flex-1 bg-white border border-primary/30 text-primary font-semibold py-2 rounded-lg text-xs">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {selected.shrinkBackApplied && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-blue-800">Shrink-Back Applied</p>
                    {selected.shrinkBackNarrative && <p className="text-xs text-blue-700 mt-1">{selected.shrinkBackNarrative}</p>}
                  </div>
                )}
                {selected.parentProjectId && (
                  <div className="mt-3 bg-surface border border-gray-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-body-text">Sub-Component (Shrink-Back)</p>
                    <p className="text-xs text-secondary mt-1">This is a narrowed sub-component created after applying the shrink-back rule.</p>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-navy">Assign Resources</h3>
                  <button onClick={loadResources} className="text-xs bg-gray-100 text-body-text px-3 py-1.5 rounded-lg hover:bg-gray-200">
                    {loadingEmps?"Loading...":"Load Resources"}
                  </button>
                </div>
                {allEmps.length>0 && (
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-navy text-xs uppercase tracking-wide">Employees</h4>
                    {allEmps.map(emp=>{
                      const isAssigned = emp.projectId===selected.id;
                      return (
                        <div key={emp.id}>
                          <div className={"flex items-center justify-between p-3 rounded-lg border "+(isAssigned?"border-blue-200 bg-blue-50":"border-gray-200")}>
                            <div>
                              <p className="text-sm font-medium text-navy">{emp.name}</p>
                              <p className="text-xs text-gray-400">{emp.title??"No title"} - ${Number(emp.compensation).toLocaleString()}</p>
                              {isAssigned && <p className="text-xs text-blue-600 font-medium">QRE: ${Number(emp.qreAmount??0).toLocaleString()}</p>}
                              {isAssigned && emp.methodologyBasis && <p className="text-xs text-green-600">Method: {emp.methodologyBasis}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                              {isAssigned && (
                                <div className="flex items-center gap-1">
                                  <input type="number" min="0" max="100" defaultValue={Math.round(Number(emp.qualifiedActivityPct??0)*100)} onBlur={e=>assignEmployee(emp.id,selected.id,Number(e.target.value)/100)} className="w-16 border border-gray-200 rounded px-2 py-1 text-xs text-center" />
                                  <span className="text-xs text-gray-400">%</span>
                                </div>
                              )}
                              {isAssigned && (
                                <button onClick={()=>setCohanEmp(cohanEmp===emp.id?null:emp.id)} className="text-xs px-2 py-1.5 rounded-lg font-medium bg-surface text-primary">Cohan</button>
                              )}
                              <button onClick={()=>assignEmployee(emp.id,isAssigned?null:selected.id,isAssigned?0:0.5)} className={"text-xs px-3 py-1.5 rounded-lg font-medium "+(isAssigned?"bg-red-100 text-red-700":"bg-blue-600 text-white")}>
                                {isAssigned?"Remove":"Assign"}
                              </button>
                            </div>
                          </div>
                          {isAssigned && cohanEmp===emp.id && (
                            <div className="border border-primary/20 rounded-lg p-3 bg-surface mt-1">
                              <p className="text-xs font-semibold text-primary mb-1">Cohan Documentation (Cohan v. Comm. 1930, Suder v. Comm. 2014)</p>
                              <p className="text-xs text-primary mb-2">Document the credible basis for this time allocation. Courts accept reasonable estimates when a credible basis exists and is documented. (Ekman v. Comm. 1999)</p>
                              <div className="space-y-2">
                                <div>
                                  <label className="block text-xs font-semibold text-primary mb-1">Methodology Basis</label>
                                  <select defaultValue={emp.methodologyBasis??""} onChange={e=>{fetch("/api/employees/"+emp.id,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({methodologyBasis:e.target.value})}).then(r=>r.json()).then(u=>setAllEmps(prev=>prev.map(em=>em.id===emp.id?{...em,...u}:em)));}} className="w-full border border-primary/30 rounded-lg px-3 py-1.5 text-xs bg-white">
                                    <option value="">Select methodology</option>
                                    <option value="time-tracking">Time Tracking -- Employee tracked actual hours</option>
                                    <option value="project-estimate">Project Estimate -- Manager estimated R&D time</option>
                                    <option value="survey">Employee Survey -- Employee self-reported R&D time</option>
                                    <option value="interview">Interview -- Analyst interviewed employee</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-primary mb-1">Credible Basis Narrative</label>
                                  <textarea defaultValue={emp.supportSource??""} onBlur={e=>{fetch("/api/employees/"+emp.id,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({supportSource:e.target.value})}).then(r=>r.json()).then(u=>setAllEmps(prev=>prev.map(em=>em.id===emp.id?{...em,...u}:em)));}} placeholder="Describe the credible basis. Example: Employee maintained weekly time logs showing 85% of time on Project X development." rows={3} className="w-full border border-primary/30 rounded-lg px-3 py-2 text-xs bg-white resize-none" />
                                </div>
                                {!emp.methodologyBasis && <div className="bg-red-50 border border-red-200 rounded p-2"><p className="text-xs text-red-700 font-semibold">No methodology -- audit risk</p></div>}
                                {emp.methodologyBasis && emp.supportSource && <div className="bg-green-50 border border-green-200 rounded p-2"><p className="text-xs text-green-700 font-semibold">Cohan documentation complete</p></div>}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {allContractors.length>0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-2">Contractors</h4>
                    <div className="space-y-2">
                      {allContractors.map(con=>{
                        const isAssigned = con.projectId===selected.id;
                        return (
                          <div key={con.id} className={"flex items-center justify-between p-3 rounded-lg border "+(isAssigned?"border-blue-200 bg-blue-50":"border-gray-200")}>
                            <div>
                              <p className="text-sm font-medium text-navy">{con.vendorName}</p>
                              <p className="text-xs text-gray-400">Amount: ${Number(con.amount).toLocaleString()} - QRE: ${Number(con.qualifiedAmount??0).toLocaleString()}</p>
                              {con.fundedResearchFlag && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Funded Research</span>}
                              {con.qualifiedFlag && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Qualified</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={async()=>{const res=await fetch("/api/contractors/"+con.id,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectId:isAssigned?null:selected.id})});if(res.ok){const u=await res.json();setAllContractors(prev=>prev.map(c=>c.id===con.id?{...c,...u}:c));}}} className={"text-xs px-3 py-1.5 rounded-lg font-medium "+(isAssigned?"bg-red-100 text-red-700":"bg-blue-600 text-white")}>
                                {isAssigned?"Remove":"Assign"}
                              </button>
                              <button onClick={()=>setFairchildCon(con)} className="text-xs px-2 py-1.5 rounded-lg font-medium bg-gray-100 text-body-text hover:bg-blue-50 hover:text-blue-600">Fairchild</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {allSupplies.length>0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-2">Supplies</h4>
                    <div className="space-y-2">
                      {allSupplies.map(sup=>{
                        const isAssigned = sup.projectId===selected.id;
                        return (
                          <div key={sup.id} className={"flex items-center justify-between p-3 rounded-lg border "+(isAssigned?"border-blue-200 bg-blue-50":"border-gray-200")}>
                            <div>
                              <p className="text-sm font-medium text-navy">{sup.description}</p>
                              <p className="text-xs text-gray-400">Amount: ${Number(sup.amount).toLocaleString()} - {sup.qualified?"Qualified":"Pending"}</p>
                            </div>
                            <button onClick={async()=>{const res=await fetch("/api/supplies/"+sup.id,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectId:isAssigned?null:selected.id})});if(res.ok){const u=await res.json();setAllSupplies(prev=>prev.map(s=>s.id===sup.id?{...s,...u}:s));}}} className={"text-xs px-3 py-1.5 rounded-lg font-medium "+(isAssigned?"bg-red-100 text-red-700":"bg-blue-600 text-white")}>
                              {isAssigned?"Remove":"Assign"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-100 space-y-2 mt-4">
                  <div className="flex justify-between py-1"><span className="text-sm text-body-text">Wage QRE ({selected.employees.length} emp)</span><span className="font-semibold text-navy text-sm">${wageQre.toLocaleString()}</span></div>
                  <div className="flex justify-between py-1"><span className="text-sm text-body-text">Supply QRE</span><span className="font-semibold text-navy text-sm">${supplyQre.toLocaleString()}</span></div>
                  <div className="flex justify-between py-1"><span className="text-sm text-body-text">Contractor QRE</span><span className="font-semibold text-navy text-sm">${contractorQre.toLocaleString()}</span></div>
                  <div className="flex justify-between py-2 border-t border-gray-200"><span className="font-bold text-navy text-sm">Total QRE</span><span className="font-black text-blue-600">${totalQre.toLocaleString()}</span></div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-navy mb-4">Documentation Narratives</h3>
                <div className="space-y-4">
                  {([
                    {key:"uncertaintyNarrative", label:"Uncertainty Narrative", placeholder:"Describe the technical uncertainty that existed at the start of this project. (Cohan v. Comm., 1930)"},
                    {key:"alternativesConsidered", label:"Alternatives Considered", placeholder:"List the technical alternatives that were evaluated. (Eustace v. Comm., 2001)"},
                    {key:"experimentationNarrative", label:"Experimentation Narrative", placeholder:"Describe the systematic process used to evaluate alternatives. (Suder v. Comm., 2014)"},
                  ] as {key:string;label:string;placeholder:string}[]).map(({key,label,placeholder})=>(
                    <div key={key}>
                      <label className="block text-sm font-semibold text-navy mb-1">{label}</label>
                      <textarea defaultValue={(selected[key as keyof Project] as string)??""} onBlur={e=>updateProject(selected.id,{[key]:e.target.value})} placeholder={placeholder} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {fairchildCon && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start p-6 border-b border-gray-200">
              <div>
                <h2 className="font-black text-navy text-lg">Fairchild Funded Research Analysis</h2>
                <p className="text-secondary text-sm mt-1">{fairchildCon.vendorName} -- ${Number(fairchildCon.amount).toLocaleString()}</p>
              </div>
              <button onClick={()=>setFairchildCon(null)} className="text-gray-400 hover:text-body-text text-2xl font-bold leading-none">x</button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-blue-800 text-xs font-semibold mb-1">Legal Standard (Fairchild Industries, 1994 and 1996)</p>
                <p className="text-blue-700 text-xs">Work is funded research if the taxpayer pays regardless of success. If the taxpayer retains substantial rights and bears economic risk, the work qualifies under IRC 41(b)(3).</p>
              </div>
              <div className="space-y-4">
                {([
                  {key:"substantialRightsRetained", label:"1. Substantial Rights Retained", desc:"Did the taxpayer retain substantial rights to the research results?", positive:"Yes -- Taxpayer retained rights", negative:"No -- Rights transferred"},
                  {key:"economicRiskBorne", label:"2. Economic Risk Borne by Taxpayer", desc:"Did the taxpayer bear the economic risk? Fixed-fee = funded research (Lockheed Martin, 2000)", positive:"Yes -- Taxpayer bore risk", negative:"No -- Funded research"},
                  {key:"successContingentPayment", label:"3. Payment Contingent on Success", desc:"Was payment contingent on success? Contingent payment supports qualification (McFerrin, 2009)", positive:"Yes -- Contingent payment", negative:"No -- Fixed fee"},
                  {key:"performedOnBehalf", label:"4. Performed on Behalf of Taxpayer", desc:"Was the research performed for the benefit of the taxpayer?", positive:"Yes -- For taxpayer", negative:"No -- For contractor"},
                  {key:"arrangedBeforeWork", label:"5. Contract Pre-Existed Research", desc:"Did the contract exist before the research began? (GeoSyntec, 2015)", positive:"Yes -- Contract preceded work", negative:"No -- Contract after"},
                ] as {key:string;label:string;desc:string;positive:string;negative:string}[]).map(({key,label,desc,positive,negative})=>{
                  const val = fairchildCon[key as keyof Contractor] as boolean|null;
                  return (
                    <div key={key} className="border border-gray-200 rounded-xl p-4">
                      <p className="font-semibold text-navy text-sm mb-1">{label}</p>
                      <p className="text-secondary text-xs mb-3">{desc}</p>
                      <div className="flex gap-2">
                        <button onClick={()=>updateContractor(fairchildCon.id,{[key]:true})} className={"flex-1 text-xs py-2 px-3 rounded-lg font-medium border "+(val===true?"bg-green-600 text-white border-green-600":"bg-white text-body-text border-gray-200")}>{positive}</button>
                        <button onClick={()=>updateContractor(fairchildCon.id,{[key]:false})} className={"flex-1 text-xs py-2 px-3 rounded-lg font-medium border "+(val===false?"bg-red-600 text-white border-red-600":"bg-white text-body-text border-gray-200")}>{negative}</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-navy mb-1">Contract Review Notes</label>
                <textarea defaultValue={fairchildCon.contractReviewNotes??""} onBlur={e=>updateContractor(fairchildCon.id,{contractReviewNotes:e.target.value,contractReviewComplete:true})} placeholder="Document your funded research analysis here..." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="mt-4 p-4 rounded-xl border-2 border-dashed">
                {(()=>{
                  const isQualified = fairchildCon.substantialRightsRetained===true && fairchildCon.economicRiskBorne===true;
                  const isFunded = fairchildCon.economicRiskBorne===false || fairchildCon.substantialRightsRetained===false;
                  if (isFunded) return (
                    <div className="text-center">
                      <p className="font-black text-red-600 text-lg">Funded Research -- Excluded</p>
                      <p className="text-red-500 text-xs mt-1">This contractor work does not qualify under IRC 41(b)(3).</p>
                      <button onClick={()=>{updateContractor(fairchildCon.id,{fundedResearchFlag:true,qualifiedFlag:false});setFairchildCon(null);}} className="mt-3 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm">Mark as Funded Research</button>
                    </div>
                  );
                  if (isQualified) return (
                    <div className="text-center">
                      <p className="font-black text-green-600 text-lg">Qualifies -- Not Funded Research</p>
                      <p className="text-green-600 text-xs mt-1">Taxpayer retained rights and bore economic risk. 65% qualifies as QRE.</p>
                      <button onClick={()=>{updateContractor(fairchildCon.id,{fundedResearchFlag:false,qualifiedFlag:true});setFairchildCon(null);}} className="mt-3 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm">Mark as Qualified</button>
                    </div>
                  );
                  return <p className="text-center text-secondary text-sm">Answer the questions above to determine qualification.</p>;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}