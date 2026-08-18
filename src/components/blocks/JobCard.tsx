import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Job } from "@prisma/client"

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block h-full group">
      <div className="h-full flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden">
        {/* Subtle background glow effect on hover */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-16 -mt-16" />
        
        <div className="flex justify-between items-start gap-4 mb-6 z-10">
          <div>
            <h3 className="text-2xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-slate-900 dark:text-white">
              {job.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
              {job.department && <span>{job.department}</span>}
              {job.department && <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />}
              <span>{job.location}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>{job.type}</span>
            </p>
          </div>
          {job.salaryRange && (
            <Badge variant="secondary" className="whitespace-nowrap font-semibold px-3 py-1 rounded-full text-indigo-700 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-300 border-none">
              {job.salaryRange}
            </Badge>
          )}
        </div>
        
        <div className="flex-grow z-10">
          <p className="line-clamp-3 text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {stripHtml(job.jobSummary)}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 z-10">
          <div className="flex flex-wrap gap-2 items-center">
            {job.requiredSkills.slice(0, 3).map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs font-medium bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg py-1 px-3">
                {skill}
              </Badge>
            ))}
            {job.requiredSkills.length > 3 && (
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">
                +{job.requiredSkills.length - 3} more
              </span>
            )}
            
            <div className="ml-auto">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 text-slate-400">
                &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
