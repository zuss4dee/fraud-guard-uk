import { FileBarChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Reports</h1>
        <p className="mt-1 text-slate-500">
          View detailed reports and analytics on document verification
        </p>
      </div>

      {/* Reports Placeholder */}
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white p-16">
        <div className="rounded-full bg-slate-100 p-4">
          <FileBarChart className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-slate-900">
          Reports & Analytics
        </h3>
        <p className="mt-2 text-center text-slate-500">
          Detailed reporting features will be implemented in a future phase.
          <br />
          Track verification history, fraud patterns, and more.
        </p>
      </div>
    </div>
  );
}
