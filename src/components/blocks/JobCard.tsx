import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Job } from "@prisma/client"
import { MapPin, Clock, ArrowUpRight } from "lucide-react"

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
}

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 ring-emerald-200/60 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-800/50",
  "Part-time": "bg-blue-50 text-blue-700 ring-blue-200/60 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-800/50",
  "Remote": "bg-violet-50 text-violet-700 ring-violet-200/60 dark:bg-violet-900/20 dark:text-violet-400 dark:ring-violet-800/50",
  "Contract": "bg-amber-50 text-amber-700 ring-amber-200/60 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-800/50",
};

export function JobCard({ job }: { job: Job }) {
  const typeClass = TYPE_COLORS[job.type] ?? "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700";

  return (
    <Link href={`/jobs/${job.id}`} className="block h-full group">
      <div className="h-full flex flex-col p-7 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:-translate-y-1 hover:border-indigo-200/60 dark:hover:border-indigo-800/60 transition-all duration-300 relative overflow-hidden">

        {/* Glow on hover */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5 z-10">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 leading-snug truncate">
              {job.title}
            </h3>
            {job.department && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{job.department}</p>
            )}
          </div>
          {/* Arrow icon */}
          <div className="shrink-0 w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:border-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5 z-10">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${typeClass}`}>
            <Clock className="w-3 h-3" />
            {job.type}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3 h-3 text-slate-400" />
            {job.location}
          </span>
          {job.salaryRange && (
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              {job.salaryRange}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex-grow z-10 mb-5">
          <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {stripHtml(job.jobSummary)}
          </p>
        </div>

        {/* Skills */}
        {job.requiredSkills.length > 0 && (
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800 z-10">
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.slice(0, 3).map((skill: string) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {skill}
                </span>
              ))}
              {job.requiredSkills.length > 3 && (
                <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                  +{job.requiredSkills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
