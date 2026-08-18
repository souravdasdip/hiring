import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next"

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const jobs = await prisma.job.findMany({ select: { id: true } })
    return jobs.map((job) => ({ id: job.id }))
  } catch (e) {
    return []
  }
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const job = await prisma.job.findUnique({ where: { id: params.id } })

  if (!job) {
    return { title: "Job Not Found" }
  }

  // Remove HTML tags for clean description
  const cleanSummary = job.jobSummary.replace(/<[^>]*>?/gm, '');

  return {
    title: job.title,
    description: `${job.title} at our company. ${cleanSummary.substring(0, 150)}...`,
  }
}

export default async function JobPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const job = await prisma.job.findUnique({ where: { id: params.id } })

  if (!job || !job.isActive) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              {job.department && <Badge variant="secondary" className="bg-slate-100">{job.department}</Badge>}
              {job.salaryRange && <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-800">{job.salaryRange}</Badge>}
            </div>
            
            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Core Skills</h3>
                <div className="flex gap-2 flex-wrap items-center">
                   {job.requiredSkills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 hover:shadow-sm hover:-translate-y-0.5 transition-all dark:from-blue-950/50 dark:to-indigo-950/50 dark:border-blue-900/50 dark:text-blue-300 rounded-full"
                      >
                        {skill}
                      </Badge>
                   ))}
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Details */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {job.aboutCompany && (
              <>
                <h3>About Company</h3>
                <div dangerouslySetInnerHTML={{ __html: job.aboutCompany }} />
              </>
            )}
            
            <div className="my-8">
               <p className="mb-2"><strong>Job Type:</strong> {job.type}</p>
               <p><strong>Location:</strong> {job.location}</p>
            </div>

            <h3 className="mt-8">Job Summary</h3>
            <div dangerouslySetInnerHTML={{ __html: job.jobSummary }} />

            {job.responsibilities && job.responsibilities.length > 0 && (
              <>
                <h3 className="mt-8">Key Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <>
                <h3 className="mt-8">Required Skills and Qualifications</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {job.qualifications.map((qual, i) => (
                    <li key={i}>{qual}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Sidebar / Application Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-12 bg-slate-50 dark:bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold mb-6">Interested in this role?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Take the next step in your career. Apply now to join the team.
            </p>
            {job.applyUrl ? (
              <a 
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-6 rounded-md transition-colors text-lg"
              >
                Apply Now &rarr;
              </a>
            ) : (
              <div className="w-full text-center bg-slate-200 dark:bg-slate-800 text-slate-500 py-4 px-6 rounded-md">
                Application closed
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
