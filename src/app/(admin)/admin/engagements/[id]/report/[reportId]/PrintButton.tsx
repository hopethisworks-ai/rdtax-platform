"use client";
export default function PrintButton() {
  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0.75in; size: letter; }
          body { font-size: 11px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          nav, aside, header { display: none; }
          section { page-break-inside: avoid; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
          thead { display: table-header-group; }
          h2 { page-break-after: avoid; }
        }
      `}</style>
      <button onClick={()=>window.print()} className="print:hidden bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-700">
        Print / Save PDF
      </button>
    </>
  );
}
