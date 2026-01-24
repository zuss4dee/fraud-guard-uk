import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-500">
          Manage your account and application preferences
        </p>
      </div>

      {/* Settings Placeholder */}
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white p-16">
        <div className="rounded-full bg-slate-100 p-4">
          <Settings className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-slate-900">
          Application Settings
        </h3>
        <p className="mt-2 text-center text-slate-500">
          Account settings and preferences will be implemented in a future
          phase.
          <br />
          Configure notifications, API keys, and team members.
        </p>
      </div>
    </div>
  );
}
