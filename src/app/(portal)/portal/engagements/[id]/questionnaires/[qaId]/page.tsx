import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function QuestionnairePage({ params }: { params: Promise<{ id: string; qaId: string }> }) {
  const { id, qaId } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string }).id;
  const client = await prisma.client.findFirst({ where: { userId } });
  if (!client) redirect("/portal");

  const assignment = await prisma.questionnaireAssignment.findFirst({
    where: { id: qaId, engagement: { id, clientId: client.id } },
    include: { questionnaire: true },
  });

  if (!assignment) redirect(`/portal/engagements/${id}`);

  const questions = (assignment.questionnaire.questions as Array<{ id: string; text: string; type: string; required?: boolean; helpText?: string; options?: string[] }>) ?? [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href={`/portal/engagements/${id}`} className="text-gray-500 hover:text-gray-700 text-sm">&larr; Back to Engagement</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-bold text-gray-900">{assignment.questionnaire.title}</h1>
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{assignment.questionnaire.section.replace(/_/g, " ")}</span>
        {assignment.completedAt && (
          <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Completed</span>
        )}
      </div>

      {assignment.completedAt ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-green-600 text-xl">&#10003;</span>
          </div>
          <h2 className="text-lg font-semibold text-green-800 mb-2">Questionnaire Complete</h2>
          <p className="text-green-700 text-sm">Thank you for completing this questionnaire. Your analyst will review your responses.</p>
          <Link href={`/portal/engagements/${id}`} className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
            Back to Engagement
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-6">
            Please complete all required fields below. Your responses help us identify and document your qualifying R&D activities.
          </p>
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">This questionnaire is being prepared by your analyst. Please check back soon.</p>
            </div>
          ) : (
            <form method="POST" action={`/api/portal/questionnaires/${qaId}`} className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="pb-4 border-b border-gray-100 last:border-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {idx + 1}. {q.text} {q.required && <span className="text-red-500">*</span>}
                  </label>
                  {q.helpText && <p className="text-xs text-gray-400 mb-2">{q.helpText}</p>}

                  {q.type === "textarea" ? (
                    <textarea name={q.id} required={q.required} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  ) : q.type === "boolean" ? (
                    <select name={q.id} required={q.required} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  ) : q.type === "select" && q.options ? (
                    <select name={q.id} required={q.required} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="">Select...</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input type="text" name={q.id} required={q.required} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <Link href={`/portal/engagements/${id}`} className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800">
                  Save for Later
                </Link>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Submit Questionnaire
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
