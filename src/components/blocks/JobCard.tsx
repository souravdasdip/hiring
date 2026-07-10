import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Job } from "@prisma/client"

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 bg-white dark:bg-slate-900 cursor-pointer h-full flex flex-col group">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-xl font-bold group-hover:text-indigo-600 transition-colors">{job.title}</CardTitle>
              <CardDescription className="mt-2 text-slate-600 dark:text-slate-400">
                {job.department && <span>{job.department} • </span>}{job.location} • {job.type}
              </CardDescription>
            </div>
            {job.salaryRange && (
              <Badge variant="secondary" className="whitespace-nowrap font-medium text-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300">
                {job.salaryRange}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400 mb-4">
            {job.jobSummary}
          </p>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.slice(0, 4).map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                {skill}
              </Badge>
            ))}
            {job.requiredSkills.length > 4 && (
              <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                +{job.requiredSkills.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
