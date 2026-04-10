import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MfaSetup from "./MfaSetup";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string }).id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true, mfaEnabled: true, role: true },
  });

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Account Settings</h1>

      {/* Profile */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Profile</h2>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Name</span>
            <span className="text-sm font-medium text-slate-800">{user?.name ?? "—"}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Email</span>
            <span className="text-sm font-medium text-slate-800">{user?.email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-slate-500">Role</span>
            <span className="text-sm font-medium text-slate-800">{user?.role}</span>
          </div>
        </div>
        <div className="mt-4">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Change password →</a>
        </div>
      </div>

      {/* MFA */}
      <MfaSetup mfaEnabled={user?.mfaEnabled ?? false} />
    </div>
  );
}
