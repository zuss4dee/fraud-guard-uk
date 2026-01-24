import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-slate-500">
          Here&apos;s an overview of your document scanning activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <StatsCard
          title="Documents Scanned"
          value={0}
          subtitle="Total scans this month"
          icon={FileText}
        />
        <StatsCard
          title="Risks Detected"
          value={0}
          subtitle="Flagged documents"
          icon={AlertTriangle}
        />
        <StatsCard
          title="Verified Documents"
          value={0}
          subtitle="Passed verification"
          icon={CheckCircle}
        />
        <StatsCard
          title="Pending Review"
          value={0}
          subtitle="Awaiting review"
          icon={Clock}
        />
      </div>

      {/* Placeholder for future content */}
      <div className="overflow-x-auto rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center md:p-12">
        <p className="text-slate-500">
          Recent activity and additional dashboard widgets will appear here.
        </p>
      </div>
    </div>
  );
}
